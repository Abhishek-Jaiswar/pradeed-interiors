import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, TokenPayload } from "./jwt";
import { unauthorizedResponse } from "./api-utils";

export interface Session {
  user: TokenPayload;
}

/**
 * Get the current session from cookies (server-side).
 * Works in Server Components, Server Actions, and Route Handlers.
 */
export async function getServerAuthSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return null;
    }

    const payload = verifyToken(token);

    if (!payload) {
      return null;
    }

    return {
      user: payload,
    };
  } catch (error) {
    console.error("Session retrieval error:", error);
    return null;
  }
}

/**
 * Alias for getServerAuthSession for consistency with existing code.
 */
export async function getSession() {
  return await getServerAuthSession();
}

/**
 * Check if the user is authenticated.
 */
export async function isAuthenticated(req?: NextRequest) {
  const session = await getSession();
  return !!session?.user;
}

/**
 * Check if the user has the required role.
 */
export async function hasRole(role: string | string[]) {
  const session = await getSession();
  if (!session?.user) return false;

  const userRole = session.user.role;
  if (Array.isArray(role)) {
    return role.includes(userRole);
  }
  return userRole === role;
}

/**
 * Middleware helper to check authentication in API routes.
 */
export async function requireAuth(req: NextRequest) {
  const isAuthed = await isAuthenticated(req);
  if (!isAuthed) {
    return { authorized: false, response: unauthorizedResponse() };
  }
  return { authorized: true };
}

/**
 * Middleware helper to check role in API routes.
 */
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
