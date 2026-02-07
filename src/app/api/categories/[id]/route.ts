import { NextRequest } from 'next/server';
import { z } from 'zod';
import prisma from '@/src/lib/prisma';
import { successResponse, errorResponse, notFoundResponse, serverErrorResponse } from '@/src/lib/api-utils';
import { requireAuth, requireRole } from '@/src/lib/auth';

// Schema for updating a category
import { updateCategorySchema } from "@/src/lib/validations/category";

// GET - Get a category by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = params.id;
    const url = new URL(req.url);
    
    // Parse query parameters
    const includeProducts = url.searchParams.get('includeProducts') === 'true';
    const includeChildren = url.searchParams.get('includeChildren') === 'true';
    
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        products: includeProducts,
        children: includeChildren,
        parent: true,
      },
    });
    
    if (!category) {
      return notFoundResponse('Category not found');
    }
    
    return successResponse(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    return serverErrorResponse();
  }
}

// PATCH - Update a category
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is admin or designer
    const authCheck = await requireRole(req, ['ADMIN', 'DESIGNER']);
    if (!authCheck.authorized) {
      return authCheck.response;
    }
    
    const categoryId = params.id;
    const body = await req.json();
    
    // Validate request body
    const validationResult = updateCategorySchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.message);
    }
    
    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    
    if (!existingCategory) {
      return notFoundResponse('Category not found');
    }
    
    const { name, description, image, parentId } = validationResult.data;
    
    // Check if name is unique if changing
    if (name && name !== existingCategory.name) {
      const categoryWithSameName = await prisma.category.findUnique({
        where: { name },
      });
      
      if (categoryWithSameName) {
        return errorResponse('Category with this name already exists');
      }
    }
    
    // Check if parent category exists if parentId is provided
    if (parentId) {
      // Prevent circular references
      if (parentId === categoryId) {
        return errorResponse('Category cannot be its own parent');
      }
      
      const parentCategory = await prisma.category.findUnique({
        where: { id: parentId },
      });
      
      if (!parentCategory) {
        return errorResponse('Parent category not found');
      }
      
      // Check for circular references in the hierarchy
      let currentParent = parentCategory;
      while (currentParent.parentId) {
        if (currentParent.parentId === categoryId) {
          return errorResponse('Circular reference detected in category hierarchy');
        }
        
        currentParent = await prisma.category.findUnique({
          where: { id: currentParent.parentId },
        });
      }
    }
    
    // Update category
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name,
        description,
        image,
        parentId,
      },
      include: {
        parent: true,
        children: true,
      },
    });
    
    return successResponse(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    return serverErrorResponse();
  }
}

// DELETE - Delete a category
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Only admins can delete categories
    const authCheck = await requireRole(req, 'ADMIN');
    if (!authCheck.authorized) {
      return authCheck.response;
    }
    
    const categoryId = params.id;
    
    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        children: true,
        products: true,
      },
    });
    
    if (!existingCategory) {
      return notFoundResponse('Category not found');
    }
    
    // Check if category has children
    if (existingCategory.children.length > 0) {
      return errorResponse('Cannot delete category with subcategories. Delete subcategories first or reassign them.');
    }
    
    // Disconnect products before deleting
    if (existingCategory.products.length > 0) {
      await prisma.category.update({
        where: { id: categoryId },
        data: {
          products: {
            disconnect: existingCategory.products.map(product => ({ id: product.id })),
          },
        },
      });
    }
    
    // Delete category
    await prisma.category.delete({
      where: { id: categoryId },
    });
    
    return successResponse({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return serverErrorResponse();
  }
}
