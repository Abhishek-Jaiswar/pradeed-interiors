import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/src/lib/api-utils";
import { comparePasswords } from "@/src/lib/password";
import { signToken } from "@/src/lib/jwt";
import prisma from "@/src/lib/prisma";
import { loginSchema } from "@/src/lib/validations/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("Invalid input data", 400);
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return errorResponse("Invalid email or password", 401);
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      return errorResponse("Invalid email or password", 401);
    }

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
    });

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
    console.error("Login error:", error);
    return errorResponse("An error occurred during login", 500);
  }
}
