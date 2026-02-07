import { NextRequest } from "next/server";
import { successResponse, unauthorizedResponse } from "@/src/lib/api-utils";
import { getSession } from "@/src/lib/auth";
import prisma from "@/src/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return unauthorizedResponse();
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
      },
    });

    if (!user) {
      return unauthorizedResponse();
    }

    return successResponse(user);
  } catch (error) {
    console.error("Fetch me error:", error);
    return unauthorizedResponse();
  }
}
