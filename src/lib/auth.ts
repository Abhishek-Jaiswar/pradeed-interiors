import { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "./prisma";
import { unauthorizedResponse } from "./api-utils";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Get the current session (server-side)
export async function getServerAuthSession() {
  return await getServerSession(authOptions);
}

// Get the current session from request (for API routes)
export async function getSession() {
  return await getServerAuthSession();
}

// Check if the user is authenticated
export async function isAuthenticated(req: NextRequest) {
  const session = await getSession();
  return !!session?.user;
}

// Check if the user has the required role
export async function hasRole(role: string | string[]) {
  const session = await getSession();
  if (!session?.user) return false;

  const userRole = session.user.role;
  if (Array.isArray(role)) {
    return role.includes(userRole);
  }
  return userRole === role;
}

// Middleware to check authentication
export async function requireAuth(req: NextRequest) {
  const isAuthed = await isAuthenticated(req);
  if (!isAuthed) {
    return { authorized: false, response: unauthorizedResponse() };
  }
  return { authorized: true };
}

// Middleware to check role
export async function requireRole(req: NextRequest, role: string | string[]) {
  const authCheck = await requireAuth(req);
  if (!authCheck.authorized) {
    return authCheck;
  }

  const hasRequiredRole = await hasRole(role);
  if (!hasRequiredRole) {
    return {
      authorized: false,
      response: unauthorizedResponse(
        "You do not have permission to access this resource"
      ),
    };
  }

  return { authorized: true };
}

// Extended session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    };
  }

  interface User {
    id: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
