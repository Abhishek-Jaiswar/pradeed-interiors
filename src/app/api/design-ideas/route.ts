import { NextRequest } from 'next/server';
import { z } from 'zod';
import prisma from '@/src/lib/prisma';
import { successResponse, errorResponse, serverErrorResponse } from '@/src/lib/api-utils';
import { requireAuth, requireRole } from '@/src/lib/auth';

// Schema for creating a new design idea
import { createDesignIdeaSchema } from "@/src/lib/validations/design-idea";

// GET - Get all design ideas with optional filtering
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    
    // Parse query parameters
    const category = url.searchParams.get('category');
    const tag = url.searchParams.get('tag');
    const search = url.searchParams.get('search');
    const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : 10;
    const page = url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1;
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where: any = {};
    
    if (category) {
      where.category = category;
    }
    
    if (tag) {
      where.tags = {
        has: tag,
      };
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    // Get design ideas
    const ideas = await prisma.designIdea.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    // Get total count for pagination
    const totalCount = await prisma.designIdea.count({ where });
    
    // Get unique categories for filtering
    const categories = await prisma.designIdea.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
    });
    
    // Get popular tags
    const allIdeas = await prisma.designIdea.findMany({
      select: {
        tags: true,
      },
    });
    
    const tagCounts = allIdeas.flatMap(idea => idea.tags)
      .reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
    
    const popularTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
    
    return successResponse({
      ideas,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
      filters: {
        categories: categories.map(c => c.category),
        popularTags,
      },
    });
  } catch (error) {
    console.error('Error fetching design ideas:', error);
    return serverErrorResponse();
  }
}

// POST - Create a new design idea (admin/designer only)
export async function POST(req: NextRequest) {
  try {
    // Check if user is admin or designer
    const authCheck = await requireRole(req, ['ADMIN', 'DESIGNER']);
    if (!authCheck.authorized) {
      return authCheck.response;
    }
    
    const body = await req.json();
    
    // Validate request body
    const validationResult = createDesignIdeaSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.message);
    }
    
    const { 
      title, 
      description, 
      content, 
      image, 
      category, 
      tags 
    } = validationResult.data;
    
    // Create new design idea
    const newIdea = await prisma.designIdea.create({
      data: {
        title,
        description,
        content,
        image,
        category,
        tags,
      },
    });
    
    return successResponse(newIdea, 201);
  } catch (error) {
    console.error('Error creating design idea:', error);
    return serverErrorResponse();
  }
}
