import { NextRequest } from "next/server";
import prisma from "@/src/lib/prisma";
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  serverErrorResponse,
} from "@/src/lib/api-utils";
import { requireAuth, requireRole, getSession } from "@/src/lib/auth";

// Schema for updating a review
import { updateReviewSchema } from "@/src/lib/validations/review";

// GET - Get a specific review
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; reviewId: string } }
) {
  try {
    const { id, reviewId } = params;

    const review = await prisma.review.findFirst({
      where: {
        id: reviewId,
        productId: id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    if (!review) {
      return notFoundResponse("Review not found");
    }

    return successResponse(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    return serverErrorResponse();
  }
}

// PATCH - Update a review
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; reviewId: string } }
) {
  try {
    // Check if user is authenticated
    const authCheck = await requireAuth(req);
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { id, reviewId } = params;
    const session = await getSession();
    const userId = session?.user.id;
    const isAdmin = session?.user.role === "ADMIN";

    const body = await req.json();

    // Validate request body
    const validationResult = updateReviewSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.message);
    }

    // Check if review exists
    const existingReview = await prisma.review.findFirst({
      where: {
        id: reviewId,
        productId: id,
      },
    });

    if (!existingReview) {
      return notFoundResponse("Review not found");
    }

    // Check if user is the owner of the review or an admin
    if (existingReview.userId !== userId && !isAdmin) {
      return errorResponse(
        "You do not have permission to update this review",
        403
      );
    }

    const { rating, comment } = validationResult.data;

    // Update review
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: {
        rating,
        comment,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return successResponse(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    return serverErrorResponse();
  }
}

// DELETE - Delete a review
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; reviewId: string } }
) {
  try {
    // Check if user is authenticated
    const authCheck = await requireAuth(req);
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const { id, reviewId } = params;
    const session = await getSession();
    const userId = session?.user.id;
    const isAdmin = session?.user.role === "ADMIN";

    // Check if review exists
    const existingReview = await prisma.review.findFirst({
      where: {
        id: reviewId,
        productId: id,
      },
    });

    if (!existingReview) {
      return notFoundResponse("Review not found");
    }

    // Check if user is the owner of the review or an admin
    if (existingReview.userId !== userId && !isAdmin) {
      return errorResponse(
        "You do not have permission to delete this review",
        403
      );
    }

    // Delete review
    await prisma.review.delete({
      where: { id: reviewId },
    });

    return successResponse({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return serverErrorResponse();
  }
}
