import { NextRequest } from 'next/server';
import prisma from '@/src/lib/prisma';
import { successResponse, errorResponse, serverErrorResponse } from '@/src/lib/api-utils';
import { requireAuth, getSession } from '@/src/lib/auth';

// Schema for creating a new order
import { createOrderSchema } from "@/src/lib/validations/order";

// GET - Get all orders (admin) or user's orders
export async function GET(req: NextRequest) {
  try {
    // Check if user is authenticated
    const authCheck = await requireAuth(req);
    if (!authCheck.authorized) {
      return authCheck.response;
    }
    
    const session = await getSession();
    const userId = session?.user.id;
    const isAdmin = session?.user.role === 'ADMIN';
    
    const url = new URL(req.url);
    
    // Parse query parameters
    const status = url.searchParams.get('status') as string | undefined;
    const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : 10;
    const page = url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1;
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where: any = {};
    
    // Filter by status if provided
    if (status) {
      where.status = status;
    }
    
    // If not admin, only show user's orders
    if (!isAdmin) {
      where.userId = userId;
    }
    
    // Get orders
    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
              },
            },
          },
        },
        shippingAddress: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    // Get total count for pagination
    const totalCount = await prisma.order.count({ where });
    
    return successResponse({
      orders,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return serverErrorResponse();
  }
}

// POST - Create a new order
export async function POST(req: NextRequest) {
  try {
    // Check if user is authenticated
    const authCheck = await requireAuth(req);
    if (!authCheck.authorized) {
      return authCheck.response;
    }
    
    const session = await getSession();
    const userId = session?.user.id;
    
    const body = await req.json();
    
    // Validate request body
    const validationResult = createOrderSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.message);
    }
    
    const { items, addressId } = validationResult.data;
    
    // Check if address exists and belongs to user
    const address = await prisma.address.findUnique({
      where: {
        id: addressId,
        userId,
      },
    });
    
    if (!address) {
      return errorResponse('Invalid shipping address');
    }
    
    // Fetch product details and validate
    const productIds = items.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
    });
    
    if (products.length !== productIds.length) {
      return errorResponse('One or more products not found');
    }
    
    // Check if products are in stock
    const outOfStockProducts = products.filter(product => !product.inStock);
    if (outOfStockProducts.length > 0) {
      return errorResponse(`The following products are out of stock: ${outOfStockProducts.map(p => p.name).join(', ')}`);
    }
    
    // Calculate order total
    let total = 0;
    const orderItems = items.map(item => {
      const product = products.find(p => p.id === item.productId);
      const price = product.salePrice || product.price;
      const itemTotal = parseFloat(price.toString()) * item.quantity;
      total += itemTotal;
      
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: price,
      };
    });
    
    // Create order
    const newOrder = await prisma.order.create({
      data: {
        userId,
        addressId,
        total,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
              },
            },
          },
        },
        shippingAddress: true,
      },
    });
    
    return successResponse(newOrder, 201);
  } catch (error) {
    console.error('Error creating order:', error);
    return serverErrorResponse();
  }
}
