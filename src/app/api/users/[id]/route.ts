import { NextRequest } from 'next/server';
import { z } from 'zod';
import { hash } from 'bcryptjs';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse, notFoundResponse, serverErrorResponse } from '@/lib/api-utils';
import { requireAuth, requireRole, getSession } from '@/lib/auth';

// Schema for updating a user
const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  role: z.enum(['ADMIN', 'DESIGNER', 'CUSTOMER']).optional(),
  image: z.string().url().optional().nullable(),
});

// GET - Get a user by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    
    // Check if user is authorized
    const authCheck = await requireAuth(req);
    if (!authCheck.authorized) {
      return authCheck.response;
    }
    
    // Get current session
    const session = await getSession();
    const isAdmin = session?.user.role === 'ADMIN';
    const isSelf = session?.user.id === userId;
    
    // Only allow users to access their own data unless they're an admin
    if (!isAdmin && !isSelf) {
      return errorResponse('You do not have permission to access this resource', 403);
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password
      },
    });
    
    if (!user) {
      return notFoundResponse('User not found');
    }
    
    return successResponse(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return serverErrorResponse();
  }
}

// PATCH - Update a user
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const body = await req.json();
    
    // Validate request body
    const validationResult = updateUserSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.message);
    }
    
    // Get current session
    const session = await getSession();
    const isAdmin = session?.user.role === 'ADMIN';
    const isSelf = session?.user.id === userId;
    
    // Only allow users to update their own data unless they're an admin
    if (!isAdmin && !isSelf) {
      return errorResponse('You do not have permission to update this resource', 403);
    }
    
    // Only admins can change roles
    if (validationResult.data.role && !isAdmin) {
      return errorResponse('Only administrators can change user roles', 403);
    }
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!existingUser) {
      return notFoundResponse('User not found');
    }
    
    // Prepare update data
    const updateData: any = { ...validationResult.data };
    
    // Hash password if provided
    if (updateData.password) {
      updateData.password = await hash(updateData.password, 12);
    }
    
    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password
      },
    });
    
    return successResponse(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return serverErrorResponse();
  }
}

// DELETE - Delete a user
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    
    // Only admins can delete users
    const authCheck = await requireRole(req, 'ADMIN');
    if (!authCheck.authorized) {
      return authCheck.response;
    }
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!existingUser) {
      return notFoundResponse('User not found');
    }
    
    // Delete user
    await prisma.user.delete({
      where: { id: userId },
    });
    
    return successResponse({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return serverErrorResponse();
  }
}
