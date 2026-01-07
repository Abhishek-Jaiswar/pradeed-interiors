import { NextRequest } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { successResponse, errorResponse, serverErrorResponse } from '@/lib/api-utils';

// Schema for budget calculation request
const dimensionsSchema = z.object({
  length: z.number().positive('Length must be positive'),
  width: z.number().positive('Width must be positive'),
  height: z.number().optional(),
});

const materialSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  pricePerUnit: z.number().positive(),
  quantity: z.number().positive(),
});

const furnitureItemSchema = z.object({
  id: z.string().optional(),
  productId: z.string().optional(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

const calculatorRequestSchema = z.object({
  dimensions: dimensionsSchema,
  roomType: z.string(),
  materials: z.array(materialSchema),
  furniture: z.array(furnitureItemSchema).optional(),
  additionalRequirements: z.string().optional(),
});

// POST - Calculate budget based on inputs
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request body
    const validationResult = calculatorRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return errorResponse(validationResult.error.message);
    }
    
    const { dimensions, roomType, materials, furniture = [], additionalRequirements } = validationResult.data;
    
    // Calculate area
    const area = dimensions.length * dimensions.width;
    
    // Calculate materials cost
    const materialsCost = materials.reduce((total, material) => {
      return total + (material.pricePerUnit * material.quantity);
    }, 0);
    
    // Calculate furniture cost
    const furnitureCost = furniture.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    
    // Calculate labor cost (simplified estimation)
    // Labor cost varies by room type and area
    let laborCostPerSqFt = 0;
    switch (roomType.toLowerCase()) {
      case 'kitchen':
        laborCostPerSqFt = 250;
        break;
      case 'bathroom':
        laborCostPerSqFt = 300;
        break;
      case 'bedroom':
        laborCostPerSqFt = 150;
        break;
      case 'living room':
        laborCostPerSqFt = 200;
        break;
      default:
        laborCostPerSqFt = 180;
    }
    
    const laborCost = area * laborCostPerSqFt;
    
    // Add additional costs based on requirements (simplified)
    let additionalCost = 0;
    if (additionalRequirements) {
      // Add 5% for special requirements
      additionalCost = (materialsCost + furnitureCost + laborCost) * 0.05;
    }
    
    // Calculate total cost
    const totalCost = materialsCost + furnitureCost + laborCost + additionalCost;
    
    // Calculate time estimate (in days)
    let timeEstimate = 0;
    if (area < 100) {
      timeEstimate = 7; // 1 week for small areas
    } else if (area < 200) {
      timeEstimate = 14; // 2 weeks for medium areas
    } else if (area < 500) {
      timeEstimate = 30; // 1 month for large areas
    } else {
      timeEstimate = 45; // 1.5 months for very large areas
    }
    
    // Adjust time based on room type
    if (roomType.toLowerCase() === 'kitchen' || roomType.toLowerCase() === 'bathroom') {
      timeEstimate *= 1.5; // These rooms take longer due to plumbing, electrical, etc.
    }
    
    // Create detailed breakdown
    const breakdown = {
      area: {
        value: area,
        unit: 'sq ft',
      },
      materials: {
        items: materials,
        subtotal: materialsCost,
      },
      furniture: {
        items: furniture,
        subtotal: furnitureCost,
      },
      labor: {
        rate: laborCostPerSqFt,
        subtotal: laborCost,
      },
      additional: additionalCost,
      total: totalCost,
      timeEstimate: {
        days: timeEstimate,
        weeks: Math.ceil(timeEstimate / 7),
      },
    };
    
    return successResponse({
      estimate: {
        totalCost,
        timeEstimate,
        breakdown,
      },
    });
  } catch (error) {
    console.error('Error calculating budget:', error);
    return serverErrorResponse();
  }
}
