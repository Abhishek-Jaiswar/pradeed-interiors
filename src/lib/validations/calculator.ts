import { z } from "zod";

export const dimensionsSchema = z.object({
  length: z.number().positive('Length must be positive'),
  width: z.number().positive('Width must be positive'),
  height: z.number().optional(),
});

export const materialSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  pricePerUnit: z.number().positive(),
  quantity: z.number().positive(),
});

export const furnitureItemSchema = z.object({
  id: z.string().optional(),
  productId: z.string().optional(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export const calculatorRequestSchema = z.object({
  dimensions: dimensionsSchema,
  roomType: z.string(),
  materials: z.array(materialSchema),
  furniture: z.array(furnitureItemSchema).optional(),
  additionalRequirements: z.string().optional(),
});

export type DimensionsInput = z.infer<typeof dimensionsSchema>;
export type MaterialInput = z.infer<typeof materialSchema>;
export type FurnitureItemInput = z.infer<typeof furnitureItemSchema>;
export type CalculatorRequestInput = z.infer<typeof calculatorRequestSchema>;
