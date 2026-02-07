import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "../../../../lib/prisma";
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  serverErrorResponse,
} from "../../../../lib/api-utils";
import { requireAuth, requireRole } from "../../../../lib/auth";

// Schema for updating a portfolio project
import { updatePortfolioProjectSchema } from "@/lib/validations/portfolio";

// GET - Get a portfolio project by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;

    const project = await prisma.portfolioProject.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return notFoundResponse("Portfolio project not found");
    }

    return successResponse(project);
  } catch (error) {
    console.error("Error fetching portfolio project:", error);
    return serverErrorResponse();
  }
}

// PATCH - Update a portfolio project
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is admin or designer
    const authCheck = await requireRole(req, ["ADMIN", "DESIGNER"]);
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const projectId = params.id;
    const body = await req.json();

    // Validate request body
    const validationResult = updatePortfolioProjectSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.message);
    }

    // Check if project exists
    const existingProject = await prisma.portfolioProject.findUnique({
      where: { id: projectId },
    });

    if (!existingProject) {
      return notFoundResponse("Portfolio project not found");
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
      clientName,
    } = validationResult.data;

    // Update portfolio project
    const updatedProject = await prisma.portfolioProject.update({
      where: { id: projectId },
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

    return successResponse(updatedProject);
  } catch (error) {
    console.error("Error updating portfolio project:", error);
    return serverErrorResponse();
  }
}

// DELETE - Delete a portfolio project
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Only admins can delete portfolio projects
    const authCheck = await requireRole(req, "ADMIN");
    if (!authCheck.authorized) {
      return authCheck.response;
    }

    const projectId = params.id;

    // Check if project exists
    const existingProject = await prisma.portfolioProject.findUnique({
      where: { id: projectId },
    });

    if (!existingProject) {
      return notFoundResponse("Portfolio project not found");
    }

    // Delete portfolio project
    await prisma.portfolioProject.delete({
      where: { id: projectId },
    });

    return successResponse({
      message: "Portfolio project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting portfolio project:", error);
    return serverErrorResponse();
  }
}
