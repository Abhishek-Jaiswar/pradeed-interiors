import { NextRequest } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse, serverErrorResponse } from '@/lib/api-utils';
import { requireAuth, requireRole } from '@/lib/auth';

// Schema for creating a new category
import { createCategorySchema } from "@/lib/validations/category";

// GET - Get all categories
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    
    // Parse query parameters
    const parentId = url.searchParams.get('parentId') || null;
    const includeProducts = url.searchParams.get('includeProducts') === 'true';
    
    // Build query
    const query: any = {
      where: {},
      include: {
        children: true,
        products: includeProducts,
      },
      orderBy: {
        name: 'asc',
      },
    };
    
    // Filter by parent if specified
    if (parentId) {
      query.where.parentId = parentId;
    } else {
      // Get top-level categories (no parent)
      query.where.parentId = null;
    }
    
    const categories = await prisma.category.findMany(query);
    
    return successResponse(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return serverErrorResponse();
  }
}

// POST - Create a new category (admin only)
export async function POST(req: NextRequest) {
  try {
    // Check if user is admin
    const authCheck = await requireRole(req, ['ADMIN', 'DESIGNER']);
    if (!authCheck.authorized) {
      return authCheck.response;
    }
    
    const body = await req.json();
    
    // Validate request body
    const validationResult = createCategorySchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.message);
    }
    
    const { name, description, image, parentId } = validationResult.data;
    
    // Check if category with same name already exists
    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });
    
    if (existingCategory) {
      return errorResponse('Category with this name already exists');
    }
    
    // Check if parent category exists if parentId is provided
    if (parentId) {
      const parentCategory = await prisma.category.findUnique({
        where: { id: parentId },
      });
      
      if (!parentCategory) {
        return errorResponse('Parent category not found');
      }
    }
    
    // Create new category
    const newCategory = await prisma.category.create({
      data: {
        name,
        description,
        image,
        parentId,
      },
    });
    
    return successResponse(newCategory, 201);
  } catch (error) {
    console.error('Error creating category:', error);
    return serverErrorResponse();
  }
}
