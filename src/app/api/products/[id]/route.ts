import { NextRequest } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse, notFoundResponse, serverErrorResponse } from '@/lib/api-utils';
import { requireAuth, requireRole } from '@/lib/auth';

// Schema for updating a product
const updateProductSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  price: z.number().positive('Price must be positive').optional(),
  salePrice: z.number().positive('Sale price must be positive').optional().nullable(),
  inStock: z.boolean().optional(),
  images: z.array(z.string().url('Invalid image URL')).optional(),
  dimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
  }).optional().nullable(),
  materials: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
});

// GET - Get a product by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        categories: true,
        reviews: {
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
        },
      },
    });
    
    if (!product) {
      return notFoundResponse('Product not found');
    }
    
    // Calculate average rating
    const totalRatings = product.reviews.length;
    const avgRating = totalRatings > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / totalRatings
      : 0;
    
    const productWithRating = {
      ...product,
      avgRating,
      reviewCount: totalRatings,
    };
    
    return successResponse(productWithRating);
  } catch (error) {
    console.error('Error fetching product:', error);
    return serverErrorResponse();
  }
}

// PATCH - Update a product
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
    
    const productId = params.id;
    const body = await req.json();
    
    // Validate request body
    const validationResult = updateProductSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.message);
    }
    
    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        categories: true,
      },
    });
    
    if (!existingProduct) {
      return notFoundResponse('Product not found');
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
      categories 
    } = validationResult.data;
    
    // Prepare update data
    const updateData: any = {};
    
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (salePrice !== undefined) updateData.salePrice = salePrice;
    if (inStock !== undefined) updateData.inStock = inStock;
    if (images !== undefined) updateData.images = images;
    if (dimensions !== undefined) updateData.dimensions = dimensions;
    if (materials !== undefined) updateData.materials = materials;
    if (colors !== undefined) updateData.colors = colors;
    
    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        ...updateData,
        ...(categories && {
          categories: {
            disconnect: existingProduct.categories.map(cat => ({ id: cat.id })),
            connectOrCreate: categories.map(categoryName => ({
              where: { name: categoryName },
              create: { name: categoryName },
            })),
          },
        }),
      },
      include: {
        categories: true,
      },
    });
    
    return successResponse(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return serverErrorResponse();
  }
}

// DELETE - Delete a product
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Only admins can delete products
    const authCheck = await requireRole(req, 'ADMIN');
    if (!authCheck.authorized) {
      return authCheck.response;
    }
    
    const productId = params.id;
    
    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });
    
    if (!existingProduct) {
      return notFoundResponse('Product not found');
    }
    
    // Delete product
    await prisma.product.delete({
      where: { id: productId },
    });
    
    return successResponse({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return serverErrorResponse();
  }
}
