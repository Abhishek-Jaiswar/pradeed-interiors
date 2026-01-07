import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import {
  successResponse,
  errorResponse,
  serverErrorResponse,
} from "@/lib/api-utils";
import { requireAuth, requireRole } from "@/lib/auth";
import { NextResponse } from "next/server";

// Schema for creating a new product
const createProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be positive"),
  salePrice: z.number().positive("Sale price must be positive").optional(),
  inStock: z.boolean().default(true),
  images: z.array(z.string().url("Invalid image URL")),
  dimensions: z
    .object({
      length: z.number().positive(),
      width: z.number().positive(),
      height: z.number().positive(),
    })
    .optional(),
  materials: z.array(z.string()),
  colors: z.array(z.string()),
  categories: z.array(z.string()),
});

// Mock product data - in a real app, this would come from a database
const products = [
  {
    id: 1,
    name: "Modern Minimalist Sofa",
    price: 1299.99,
    category: "furniture",
    description:
      "A sleek, minimalist sofa with clean lines and premium upholstery. Perfect for contemporary living spaces.",
    features: [
      "Stain-resistant fabric",
      "Solid wood frame",
      "High-density foam cushions",
      "Available in multiple colors",
    ],
    imageUrl: "/images/products/sofa-1.jpg",
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    discount: 15,
  },
  {
    id: 2,
    name: "Artisan Wooden Coffee Table",
    price: 649.99,
    category: "furniture",
    description:
      "Handcrafted coffee table made from reclaimed wood with a beautiful natural finish.",
    features: [
      "Reclaimed hardwood",
      "Natural finish",
      "Unique grain patterns",
      "Environmentally sustainable",
    ],
    imageUrl: "/images/products/table-1.jpg",
    rating: 4.6,
    reviewCount: 87,
    inStock: true,
    discount: 0,
  },
  {
    id: 3,
    name: "Scandinavian Dining Set",
    price: 1899.99,
    category: "furniture",
    description:
      "Complete dining set inspired by Scandinavian design principles of simplicity and functionality.",
    features: [
      "Table and 6 chairs",
      "Solid oak construction",
      "Comfortable upholstered seats",
      "Easy assembly",
    ],
    imageUrl: "/images/products/dining-1.jpg",
    rating: 4.9,
    reviewCount: 56,
    inStock: true,
    discount: 10,
  },
  {
    id: 4,
    name: "Geometric Pattern Area Rug",
    price: 349.99,
    category: "decor",
    description:
      "Contemporary area rug featuring an eye-catching geometric pattern in neutral tones.",
    features: [
      "High-quality wool blend",
      "Stain-resistant",
      "Non-slip backing",
      "Various sizes available",
    ],
    imageUrl: "/images/products/rug-1.jpg",
    rating: 4.5,
    reviewCount: 92,
    inStock: true,
    discount: 0,
  },
  {
    id: 5,
    name: "Modern Pendant Light Fixture",
    price: 189.99,
    category: "lighting",
    description:
      "Elegant pendant light with adjustable height and warm ambient lighting for dining areas and entryways.",
    features: [
      "Dimmable LED bulb compatible",
      "Brushed brass finish",
      "Adjustable hanging height",
      "Simple installation",
    ],
    imageUrl: "/images/products/light-1.jpg",
    rating: 4.7,
    reviewCount: 63,
    inStock: true,
    discount: 5,
  },
  {
    id: 6,
    name: "Mid-Century Accent Chair",
    price: 599.99,
    category: "furniture",
    description:
      "Stylish accent chair inspired by mid-century design with tapered legs and button-tufted upholstery.",
    features: [
      "Sustainable wood frame",
      "Premium fabric upholstery",
      "Foam cushioning",
      "Easy assembly",
    ],
    imageUrl: "/images/products/chair-1.jpg",
    rating: 4.7,
    reviewCount: 71,
    inStock: false,
    discount: 0,
  },
  {
    id: 7,
    name: "Abstract Wall Art Canvas",
    price: 129.99,
    category: "decor",
    description:
      "Original abstract artwork on canvas, perfect for adding a splash of color to any room.",
    features: [
      "Hand-painted original",
      "Gallery-wrapped canvas",
      "Ready to hang",
      "Signed by the artist",
    ],
    imageUrl: "/images/products/art-1.jpg",
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    discount: 0,
  },
  {
    id: 8,
    name: "Marble and Brass Side Table",
    price: 299.99,
    category: "furniture",
    description:
      "Elegant side table featuring a genuine marble top with brass-finished metal legs.",
    features: [
      "Real marble top",
      "Brass-finished steel frame",
      "Protective floor pads",
      "No assembly required",
    ],
    imageUrl: "/images/products/table-2.jpg",
    rating: 4.6,
    reviewCount: 38,
    inStock: true,
    discount: 0,
  },
];

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

export async function GET(request: Request) {
  try {
    // Get URL parameters
    const { searchParams } = new URL(request.url);

    // Optional filtering by category
    const category = searchParams.get("category");

    // Optional pagination parameters
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Calculate pagination values
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Filter products if category is provided
    let filteredProducts = products;
    if (category) {
      filteredProducts = products.filter(
        (product) => product.category === category
      );
    }

    // Paginate the results
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Create pagination metadata
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / limit);

    // Return the response
    return NextResponse.json({
      products: paginatedProducts,
      pagination: {
        total: totalProducts,
        page,
        limit,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
