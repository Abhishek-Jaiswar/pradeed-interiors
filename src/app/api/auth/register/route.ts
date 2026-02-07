import { errorResponse, successResponse } from "@/src/lib/api-utils";
import { signToken } from "@/src/lib/jwt";
import { hashPassword } from "@/src/lib/password";
import prisma from "@/src/lib/prisma";
import { registerSchema } from "@/src/lib/validations/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return errorResponse(result.error.issues[0].message, 400);
    }

    const { name, email, password } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse("User already exists", 400);
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "CUSTOMER", // Default role
      },
    });

    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    const response = successResponse({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }, 201);

    // Set the token in cookies
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return errorResponse("An error occurred during registration", 500);
  }
}
