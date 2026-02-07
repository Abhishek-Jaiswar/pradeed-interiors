import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be positive"),
  salePrice: z.number().positive("Sale price must be positive").optional(),
  inStock: z.boolean().default(true),
  images: z.array(z.string().url("Invalid image URL")),
  dimensions: z
    .object({
      length: z.number().positive(),
      width: z.number().positive(),
      height: z.number().positive(),
    })
    .optional(),
  materials: z.array(z.string()),
  colors: z.array(z.string()),
  categories: z.array(z.string()),
});

export const updateProductSchema = z.object({
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

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
