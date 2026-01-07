import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { z } from "zod";
import { cookies } from "next/headers";

// Validation schema for login
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Mock admin user
const ADMIN_USER = {
  id: "admin-1",
  email: "admin@pradeepinteriors.com",
  password: "admin123", // In a real app, this would be hashed
  name: "Admin User",
  role: "admin",
};

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate the request body
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
          errors: result.error.format(),
        },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Check if user exists and password is correct (mock authentication)
    // In a real app, you would query your database and use bcrypt to compare passwords
    if (email !== ADMIN_USER.email || password !== ADMIN_USER.password) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create a JWT token with user info (excluding password)
    const token = sign(
      {
        id: ADMIN_USER.id,
        email: ADMIN_USER.email,
        name: ADMIN_USER.name,
        role: ADMIN_USER.role,
      },
      process.env.JWT_SECRET || "fallback-secret-key-for-development-only",
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // Set the token in cookies
    cookies().set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day in seconds
      sameSite: "lax",
    });

    // Return success response with user info (excluding password)
    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: ADMIN_USER.id,
        email: ADMIN_USER.email,
        name: ADMIN_USER.name,
        role: ADMIN_USER.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
