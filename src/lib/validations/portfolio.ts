import { z } from "zod";

export const createPortfolioProjectSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  content: z.string(),
  images: z.array(z.string().url('Invalid image URL')),
  beforeImages: z.array(z.string().url('Invalid image URL')),
  afterImages: z.array(z.string().url('Invalid image URL')),
  category: z.string(),
  tags: z.array(z.string()),
  testimonial: z.string().optional(),
  clientName: z.string().optional(),
});

export const updatePortfolioProjectSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .optional(),
  content: z.string().optional(),
  images: z.array(z.string().url("Invalid image URL")).optional(),
  beforeImages: z.array(z.string().url("Invalid image URL")).optional(),
  afterImages: z.array(z.string().url("Invalid image URL")).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  testimonial: z.string().optional().nullable(),
  clientName: z.string().optional().nullable(),
});

export type CreatePortfolioProjectInput = z.infer<typeof createPortfolioProjectSchema>;
export type UpdatePortfolioProjectInput = z.infer<typeof updatePortfolioProjectSchema>;
