import { successResponse, notFoundResponse, serverErrorResponse } from "@/lib/api-utils";
import prisma from "@/src/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        categories: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      return notFoundResponse("Product not found");
    }

    // Get related products from same categories
    const categoryIds = product.categories.map((c) => c.id);
    const relatedProducts = await prisma.product.findMany({
      where: {
        categories: {
          some: {
            id: { in: categoryIds },
          },
        },
        id: { not: id },
      },
      take: 4,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return successResponse({
      product,
      relatedProducts,
    });
  } catch (error) {
    console.error("Error fetching shop product details:", error);
    return serverErrorResponse();
  }
}
