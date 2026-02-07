import { successResponse } from "@/src/lib/api-utils";

export async function POST() {
  const response = successResponse({ message: "Logged out successfully" });

  // Clear the auth_token cookie
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
