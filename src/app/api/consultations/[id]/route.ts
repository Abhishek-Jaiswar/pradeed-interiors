import { errorResponse, notFoundResponse, serverErrorResponse, successResponse } from '@/src/lib/api-utils';
import { getSession, requireAuth } from '@/src/lib/auth';
import prisma from '@/src/lib/prisma';
import { updateConsultationSchema } from '@/src/lib/validations/consultation';
import { NextRequest } from 'next/server';

// GET - Get a consultation by ID
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
    
    const consultationId = params.id;
    const session = await getSession();
    const userId = session?.user.id;
    const userRole = session?.user.role;
    const isAdminOrDesigner = userRole === 'ADMIN' || userRole === 'DESIGNER';
    
    // Build query
    const query: any = {
      where: { id: consultationId },
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
    };
    
    // If not admin/designer, only allow access to user's own consultations
    if (!isAdminOrDesigner) {
      query.where.userId = userId;
    }
    
    const consultation = await prisma.consultation.findFirst(query);
    
    if (!consultation) {
      return notFoundResponse('Consultation not found');
    }
    
    return successResponse(consultation);
  } catch (error) {
    console.error('Error fetching consultation:', error);
    return serverErrorResponse();
  }
}

// PATCH - Update a consultation
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated
    const authCheck = await requireAuth(req);
    if (!authCheck.authorized) {
      return authCheck.response;
    }
    
    const consultationId = params.id;
    const body = await req.json();
    
    // Validate request body
    const validationResult = updateConsultationSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.message);
    }
    
    // Get session
    const session = await getSession();
    const userId = session?.user.id;
    const userRole = session?.user.role;
    const isAdminOrDesigner = userRole === 'ADMIN' || userRole === 'DESIGNER';
    
    // Check if consultation exists
    const existingConsultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
    });
    
    if (!existingConsultation) {
      return notFoundResponse('Consultation not found');
    }
    
    // Check permissions
    if (!isAdminOrDesigner && existingConsultation.userId !== userId) {
      return errorResponse('You do not have permission to update this consultation', 403);
    }
    
    const { date, time, type, status, requirements, notes } = validationResult.data;
    
    // Prepare update data
    const updateData: any = {};
    
    // Only admin/designer can update status
    if (status && isAdminOrDesigner) {
      updateData.status = status;
    } else if (status && !isAdminOrDesigner) {
      // Regular users can only cancel their consultations
      if (status === 'CANCELLED') {
        updateData.status = status;
      } else {
        return errorResponse('You do not have permission to update the consultation status', 403);
      }
    }
    
    // Handle date update
    if (date) {
      const consultationDate = new Date(date);
      
      // Check if date is in the future
      if (consultationDate < new Date()) {
        return errorResponse('Consultation date must be in the future');
      }
      
      updateData.date = consultationDate;
    }
    
    // Handle other updates
    if (time) updateData.time = time;
    if (type) updateData.type = type;
    if (requirements !== undefined) updateData.requirements = requirements;
    if (notes !== undefined) updateData.notes = notes;
    
    // Check for availability if changing date or time
    if (date || time) {
      const checkDate = date ? new Date(date) : existingConsultation.date;
      const checkTime = time || existingConsultation.time;
      
      const existingConsultations = await prisma.consultation.count({
        where: {
          id: { not: consultationId }, // Exclude current consultation
          date: {
            gte: new Date(checkDate.setHours(0, 0, 0, 0)),
            lt: new Date(checkDate.setHours(23, 59, 59, 999)),
          },
          time: checkTime,
          type: type || existingConsultation.type,
        },
      });
      
      if (existingConsultations >= 3) { // Assuming max 3 consultations at the same time
        return errorResponse('No availability for the selected date and time. Please choose another slot.');
      }
    }
    
    // Update consultation
    const updatedConsultation = await prisma.consultation.update({
      where: { id: consultationId },
      data: updateData,
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
    });
    
    return successResponse(updatedConsultation);
  } catch (error) {
    console.error('Error updating consultation:', error);
    return serverErrorResponse();
  }
}

// DELETE - Cancel a consultation
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
    
    const consultationId = params.id;
    const session = await getSession();
    const userId = session?.user.id;
    const userRole = session?.user.role;
    const isAdminOrDesigner = userRole === 'ADMIN' || userRole === 'DESIGNER';
    
    // Check if consultation exists
    const existingConsultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
    });
    
    if (!existingConsultation) {
      return notFoundResponse('Consultation not found');
    }
    
    // Check permissions
    if (!isAdminOrDesigner && existingConsultation.userId !== userId) {
      return errorResponse('You do not have permission to cancel this consultation', 403);
    }
    
    // Only allow cancellation if consultation is not already completed or cancelled
    if (['COMPLETED', 'CANCELLED'].includes(existingConsultation.status)) {
      return errorResponse(`Cannot cancel a consultation that is already ${existingConsultation.status.toLowerCase()}`);
    }
    
    // Update consultation status to CANCELLED
    const cancelledConsultation = await prisma.consultation.update({
      where: { id: consultationId },
      data: {
        status: 'CANCELLED',
      },
    });
    
    return successResponse({ message: 'Consultation cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling consultation:', error);
    return serverErrorResponse();
  }
}
