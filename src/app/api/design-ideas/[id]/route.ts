import { NextRequest } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse, notFoundResponse, serverErrorResponse } from '@/lib/api-utils';
import { requireAuth, requireRole } from '@/lib/auth';

// Schema for updating a design idea
import { updateDesignIdeaSchema } from "@/lib/validations/design-idea";

// GET - Get a design idea by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ideaId = params.id;
    
    const idea = await prisma.designIdea.findUnique({
      where: { id: ideaId },
    });
    
    if (!idea) {
      return notFoundResponse('Design idea not found');
    }
    
    // Get related ideas based on category and tags
    const relatedIdeas = await prisma.designIdea.findMany({
      where: {
        OR: [
          { category: idea.category },
          { tags: { hasSome: idea.tags } },
        ],
        id: { not: ideaId }, // Exclude current idea
      },
      take: 4,
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return successResponse({
      idea,
      relatedIdeas,
    });
  } catch (error) {
    console.error('Error fetching design idea:', error);
    return serverErrorResponse();
  }
}

// PATCH - Update a design idea
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
    
    const ideaId = params.id;
    const body = await req.json();
    
    // Validate request body
    const validationResult = updateDesignIdeaSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.message);
    }
    
    // Check if idea exists
    const existingIdea = await prisma.designIdea.findUnique({
      where: { id: ideaId },
    });
    
    if (!existingIdea) {
      return notFoundResponse('Design idea not found');
    }
    
    const { 
      title, 
      description, 
      content, 
      image, 
      category, 
      tags 
    } = validationResult.data;
    
    // Update design idea
    const updatedIdea = await prisma.designIdea.update({
      where: { id: ideaId },
      data: {
        title,
        description,
        content,
        image,
        category,
        tags,
      },
    });
    
    return successResponse(updatedIdea);
  } catch (error) {
    console.error('Error updating design idea:', error);
    return serverErrorResponse();
  }
}

// DELETE - Delete a design idea
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Only admins can delete design ideas
    const authCheck = await requireRole(req, 'ADMIN');
    if (!authCheck.authorized) {
      return authCheck.response;
    }
    
    const ideaId = params.id;
    
    // Check if idea exists
    const existingIdea = await prisma.designIdea.findUnique({
      where: { id: ideaId },
    });
    
    if (!existingIdea) {
      return notFoundResponse('Design idea not found');
    }
    
    // Delete design idea
    await prisma.designIdea.delete({
      where: { id: ideaId },
    });
    
    return successResponse({ message: 'Design idea deleted successfully' });
  } catch (error) {
    console.error('Error deleting design idea:', error);
    return serverErrorResponse();
  }
}
