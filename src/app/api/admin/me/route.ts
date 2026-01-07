import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export async function GET() {
  try {
    // Get token from cookies
    const token = cookies().get("auth_token")?.value;

    // If no token is found, return unauthorized
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify token
    const secret =
      process.env.JWT_SECRET || "fallback-secret-key-for-development-only";

    try {
      // Try to verify the token
      const decoded = verify(token, secret) as {
        id: string;
        email: string;
        name: string;
        role: string;
      };

      // Token is valid, return user info
      return NextResponse.json({
        success: true,
        user: {
          id: decoded.id,
          email: decoded.email,
          name: decoded.name,
          role: decoded.role,
        },
      });
    } catch (error) {
      // Token is invalid
      console.error("JWT verification failed:", error);
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Auth verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during authentication verification",
      },
      { status: 500 }
    );
  }
}
