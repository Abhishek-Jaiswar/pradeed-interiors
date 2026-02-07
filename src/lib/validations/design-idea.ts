import { z } from "zod";

export const createDesignIdeaSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  content: z.string(),
  image: z.string().url('Invalid image URL'),
  category: z.string(),
  tags: z.array(z.string()),
});

export const updateDesignIdeaSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  content: z.string().optional(),
  image: z.string().url('Invalid image URL').optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type CreateDesignIdeaInput = z.infer<typeof createDesignIdeaSchema>;
export type UpdateDesignIdeaInput = z.infer<typeof updateDesignIdeaSchema>;
