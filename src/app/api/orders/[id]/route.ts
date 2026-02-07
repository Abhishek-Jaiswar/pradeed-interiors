import { NextRequest } from 'next/server';
import { z } from 'zod';
import prisma from '@/src/lib/prisma';
import { successResponse, errorResponse, notFoundResponse, serverErrorResponse } from '@/src/lib/api-utils';
import { requireAuth, requireRole, getSession } from '@/src/lib/auth';

// Schema for updating an order
import { updateOrderSchema } from "@/src/lib/validations/order";

// GET - Get an order by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated
    const authCheck = await requireAuth(req);
    if (!authCheck.authorized) {
      return authCheck.response;
    }
    
    const orderId = params.id;
    const session = await getSession();
    const userId = session?.user.id;
    const isAdmin = session?.user.role === 'ADMIN';
    
    // Build query
    const query: any = {
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
                description: true,
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
    };
    
    // If not admin, only allow access to user's own orders
    if (!isAdmin) {
      query.where.userId = userId;
    }
    
    const order = await prisma.order.findFirst(query);
    
    if (!order) {
      return notFoundResponse('Order not found');
    }
    
    return successResponse(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return serverErrorResponse();
  }
}

// PATCH - Update an order
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    const body = await req.json();
    
    // Validate request body
    const validationResult = updateOrderSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.message);
    }
    
    // Get session
    const session = await getSession();
    const userId = session?.user.id;
    const isAdmin = session?.user.role === 'ADMIN';
    
    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });
    
    if (!existingOrder) {
      return notFoundResponse('Order not found');
    }
    
    // Only admin can update order status, payment status, and payment ID
    // Regular users can only update their own orders' shipping address
    if (!isAdmin) {
      // Check if order belongs to user
      if (existingOrder.userId !== userId) {
        return errorResponse('You do not have permission to update this order', 403);
      }
      
      // Regular users can only update shipping address
      const { addressId } = validationResult.data;
      if (!addressId) {
        return errorResponse('No valid update parameters provided');
      }
      
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
      
      // Update order with new address
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: { addressId },
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
      
      return successResponse(updatedOrder);
    }
    
    // Admin updates
    const { status, paymentStatus, paymentId, addressId } = validationResult.data;
    
    // Update order
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        paymentStatus,
        paymentId,
        addressId,
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
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    return successResponse(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    return serverErrorResponse();
  }
}

// DELETE - Cancel an order (soft delete by changing status)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated
    const authCheck = await requireAuth(req);
    if (!authCheck.authorized) {
      return authCheck.response;
    }
    
    const orderId = params.id;
    const session = await getSession();
    const userId = session?.user.id;
    const isAdmin = session?.user.role === 'ADMIN';
    
    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });
    
    if (!existingOrder) {
      return notFoundResponse('Order not found');
    }
    
    // Only allow cancellation of user's own orders or admin can cancel any order
    if (!isAdmin && existingOrder.userId !== userId) {
      return errorResponse('You do not have permission to cancel this order', 403);
    }
    
    // Only allow cancellation if order is not already delivered or cancelled
    if (['DELIVERED', 'CANCELLED'].includes(existingOrder.status)) {
      return errorResponse(`Cannot cancel an order that is already ${existingOrder.status.toLowerCase()}`);
    }
    
    // Update order status to CANCELLED
    const cancelledOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'CANCELLED',
      },
    });
    
    return successResponse({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling order:', error);
    return serverErrorResponse();
  }
}
