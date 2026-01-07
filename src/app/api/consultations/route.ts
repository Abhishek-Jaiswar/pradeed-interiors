import { NextRequest } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse, serverErrorResponse } from '@/lib/api-utils';
import { requireAuth, requireRole, getSession } from '@/lib/auth';

// Schema for creating a new consultation
const createConsultationSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  type: z.enum(['VIRTUAL', 'IN_PERSON']),
  requirements: z.string().optional(),
  notes: z.string().optional(),
});

// GET - Get all consultations (admin/designer) or user's consultations
export async function GET(req: NextRequest) {
  try {
    // Check if user is authenticated
    const authCheck = await requireAuth(req);
    if (!authCheck.authorized) {
      return authCheck.response;
    }
    
    const session = await getSession();
    const userId = session?.user.id;
    const userRole = session?.user.role;
    const isAdminOrDesigner = userRole === 'ADMIN' || userRole === 'DESIGNER';
    
    const url = new URL(req.url);
    
    // Parse query parameters
    const status = url.searchParams.get('status') as string | undefined;
    const type = url.searchParams.get('type') as string | undefined;
    const limit = url.searchParams.get('limit') ? Number(url.searchParams.get('limit')) : 10;
    const page = url.searchParams.get('page') ? Number(url.searchParams.get('page')) : 1;
    const skip = (page - 1) * limit;
    
    // Build where clause
    const where: any = {};
    
    // Filter by status if provided
    if (status) {
      where.status = status;
    }
    
    // Filter by type if provided
    if (type) {
      where.type = type;
    }
    
    // If not admin/designer, only show user's consultations
    if (!isAdminOrDesigner) {
      where.userId = userId;
    }
    
    // Get consultations
    const consultations = await prisma.consultation.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        date: 'asc',
      },
    });
    
    // Get total count for pagination
    const totalCount = await prisma.consultation.count({ where });
    
    return successResponse({
      consultations,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return serverErrorResponse();
  }
}

// POST - Create a new consultation
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
    const validationResult = createConsultationSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.message);
    }
    
    const { date, time, type, requirements, notes } = validationResult.data;
    
    // Convert date string to Date object
    const consultationDate = new Date(date);
    
    // Check if date is in the future
    if (consultationDate < new Date()) {
      return errorResponse('Consultation date must be in the future');
    }
    
    // Check for availability (simplified - in a real app, would check against existing bookings)
    // For example, check if there are already too many consultations on that day
    const existingConsultations = await prisma.consultation.count({
      where: {
        date: {
          gte: new Date(consultationDate.setHours(0, 0, 0, 0)),
          lt: new Date(consultationDate.setHours(23, 59, 59, 999)),
        },
        time,
        type,
      },
    });
    
    if (existingConsultations >= 3) { // Assuming max 3 consultations at the same time
      return errorResponse('No availability for the selected date and time. Please choose another slot.');
    }
    
    // Create new consultation
    const newConsultation = await prisma.consultation.create({
      data: {
        userId,
        date: consultationDate,
        time,
        type,
        requirements,
        notes,
      },
    });
    
    return successResponse(newConsultation, 201);
  } catch (error) {
    console.error('Error creating consultation:', error);
    return serverErrorResponse();
  }
}
