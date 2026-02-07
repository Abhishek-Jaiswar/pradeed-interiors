import { NextRequest } from 'next/server';
import prisma from '@/src/lib/prisma';
import { successResponse, errorResponse, serverErrorResponse } from '@/src/lib/api-utils';
import { requireAuth, requireRole } from '@/src/lib/auth';

// Schema for creating a new portfolio project
import { createPortfolioProjectSchema } from "@/src/lib/validations/portfolio";

// GET - Get all portfolio projects with optional filtering
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
    
    // Get portfolio projects
    const projects = await prisma.portfolioProject.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    // Get total count for pagination
    const totalCount = await prisma.portfolioProject.count({ where });
    
    return successResponse({
      projects,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching portfolio projects:', error);
    return serverErrorResponse();
  }
}

// POST - Create a new portfolio project (admin/designer only)
export async function POST(req: NextRequest) {
  try {
    // Check if user is admin or designer
    const authCheck = await requireRole(req, ['ADMIN', 'DESIGNER']);
    if (!authCheck.authorized) {
      return authCheck.response;
    }
    
    const body = await req.json();
    
    // Validate request body
    const validationResult = createPortfolioProjectSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.message);
    }
    
    const { 
      title, 
      description, 
      content, 
      images, 
      beforeImages, 
      afterImages, 
      category, 
      tags, 
      testimonial, 
      clientName 
    } = validationResult.data;
    
    // Create new portfolio project
    const newProject = await prisma.portfolioProject.create({
      data: {
        title,
        description,
        content,
        images,
        beforeImages,
        afterImages,
        category,
        tags,
        testimonial,
        clientName,
      },
    });
    
    return successResponse(newProject, 201);
  } catch (error) {
    console.error('Error creating portfolio project:', error);
    return serverErrorResponse();
  }
}
