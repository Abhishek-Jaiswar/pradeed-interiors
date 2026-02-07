import { NextRequest } from 'next/server';
import prisma from '@/src/lib/prisma';
import { successResponse, errorResponse, notFoundResponse, serverErrorResponse } from '@/src/lib/api-utils';
import { requireAuth, getSession } from '@/src/lib/auth';

// Schema for creating a new review
import { createReviewSchema } from "@/src/lib/validations/review";

// GET - Get all reviews for a product
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    
    if (!product) {
      return notFoundResponse('Product not found');
    }
    
    // Get reviews
    const reviews = await prisma.review.findMany({
      where: { productId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    // Calculate average rating
    const totalRatings = reviews.length;
    const avgRating = totalRatings > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalRatings
      : 0;
    
    return successResponse({
      reviews,
      stats: {
        count: totalRatings,
        avgRating,
        distribution: {
          1: reviews.filter(r => r.rating === 1).length,
          2: reviews.filter(r => r.rating === 2).length,
          3: reviews.filter(r => r.rating === 3).length,
          4: reviews.filter(r => r.rating === 4).length,
          5: reviews.filter(r => r.rating === 5).length,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return serverErrorResponse();
  }
}

// POST - Create a new review for a product
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated
    const authCheck = await requireAuth(req);
    if (!authCheck.authorized) {
      return authCheck.response;
    }
    
    const productId = params.id;
    const session = await getSession();
    const userId = session?.user.id;
    
    const body = await req.json();
    
    // Validate request body
    const validationResult = createReviewSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.message);
    }
    
    const { rating, comment } = validationResult.data;
    
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    
    if (!product) {
      return notFoundResponse('Product not found');
    }
    
    // Check if user has already reviewed this product
    const existingReview = await prisma.review.findFirst({
      where: {
        productId,
        userId,
      },
    });
    
    if (existingReview) {
      return errorResponse('You have already reviewed this product');
    }
    
    // Create new review
    const newReview = await prisma.review.create({
      data: {
        productId,
        userId,
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
    
    return successResponse(newReview, 201);
  } catch (error) {
    console.error('Error creating review:', error);
    return serverErrorResponse();
  }
}
