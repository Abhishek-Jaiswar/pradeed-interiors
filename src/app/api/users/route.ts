import { NextRequest } from 'next/server';
import { z } from 'zod';
import { hash } from 'bcryptjs';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse, serverErrorResponse } from '@/lib/api-utils';
import { requireAuth, requireRole } from '@/lib/auth';

// Schema for creating a new user
const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['ADMIN', 'DESIGNER', 'CUSTOMER']).optional(),
});

// GET - Get all users (admin only)
export async function GET(req: NextRequest) {
  try {
    // Check if user is admin
    const authCheck = await requireRole(req, 'ADMIN');
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const users = await prisma.user.findMany({
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

    return successResponse(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return serverErrorResponse();
  }
}

// POST - Create a new user
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request body
    const validationResult = createUserSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.message);
    }
    
    const { name, email, password, role = 'CUSTOMER' } = validationResult.data;
    
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return errorResponse('Email already in use');
    }
    
    // Hash password
    const hashedPassword = await hash(password, 12);
    
    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        // Exclude password
      },
    });
    
    return successResponse(newUser, 201);
  } catch (error) {
    console.error('Error creating user:', error);
    return serverErrorResponse();
  }
}
