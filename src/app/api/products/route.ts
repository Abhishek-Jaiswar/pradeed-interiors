import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/src/lib/prisma";
import {
  successResponse,
  errorResponse,
  serverErrorResponse,
} from "@/src/lib/api-utils";
import { requireRole } from "@/src/lib/auth";

// Schema for creating a new product
import { createProductSchema } from "@/src/lib/validations/product";



// GET - Get all products with optional filtering
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    // Parse query parameters
    const category = url.searchParams.get("category");
    const search = url.searchParams.get("search");

    // Safely parse numeric values
    let minPrice: number | undefined = undefined;
    let maxPrice: number | undefined = undefined;
    let limit = 10;
    let page = 1;

    try {
      if (url.searchParams.get("minPrice")) {
        minPrice = Number(url.searchParams.get("minPrice"));
        if (isNaN(minPrice)) throw new Error("Invalid minPrice value");
      }

      if (url.searchParams.get("maxPrice")) {
        maxPrice = Number(url.searchParams.get("maxPrice"));
        if (isNaN(maxPrice)) throw new Error("Invalid maxPrice value");
      }

      if (
        minPrice !== undefined &&
        maxPrice !== undefined &&
        minPrice > maxPrice
      ) {
        return errorResponse(
          "Minimum price cannot be greater than maximum price"
        );
      }

      if (url.searchParams.get("limit")) {
        limit = Number(url.searchParams.get("limit"));
        if (isNaN(limit) || limit < 1) throw new Error("Invalid limit value");
      }

      if (url.searchParams.get("page")) {
        page = Number(url.searchParams.get("page"));
        if (isNaN(page) || page < 1) throw new Error("Invalid page value");
      }
    } catch (error) {
      return errorResponse(
        (error as Error).message || "Invalid query parameters"
      );
    }

    const inStock =
      url.searchParams.get("inStock") === "true"
        ? true
        : url.searchParams.get("inStock") === "false"
        ? false
        : undefined;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (category) {
      where.categories = {
        some: {
          name: category,
        },
      };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (minPrice !== undefined) {
      where.price = {
        ...where.price,
        gte: minPrice,
      };
    }

    if (maxPrice !== undefined) {
      where.price = {
        ...where.price,
        lte: maxPrice,
      };
    }

    if (inStock !== undefined) {
      where.inStock = inStock;
    }

    // Get products
    const products = await prisma.product.findMany({
      where,
      include: {
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate average rating for each product
    const productsWithRating = products.map((product) => {
      const totalRatings = product.reviews.length;
      const avgRating =
        totalRatings > 0
          ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
            totalRatings
          : 0;

      return {
        ...product,
        avgRating,
        reviewCount: totalRatings,
        reviews: undefined, // Remove raw reviews
      };
    });

    // Get total count for pagination
    const totalCount = await prisma.product.count({ where });

    return successResponse({
      products: productsWithRating,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return serverErrorResponse();
  }
}

// POST - Create a new product (admin only)
export async function POST(req: NextRequest) {
  try {
    // Check if user is admin
    const authCheck = await requireRole(req, ["ADMIN", "DESIGNER"]);
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const body = await req.json();

    // Validate request body
    const validationResult = createProductSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.message);
    }

    const {
      name,
      description,
      price,
      salePrice,
      inStock,
      images,
      dimensions,
      materials,
      colors,
      categories,
    } = validationResult.data;

    // Create new product with categories
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        salePrice,
        inStock,
        images,
        dimensions,
        materials,
        colors,
        categories: {
          connectOrCreate: categories.map((categoryName) => ({
            where: { name: categoryName },
            create: { name: categoryName },
          })),
        },
      },
      include: {
        categories: true,
      },
    });

    return successResponse(newProduct, 201);
  } catch (error) {
    console.error("Error creating product:", error);
    return serverErrorResponse();
  }
}


