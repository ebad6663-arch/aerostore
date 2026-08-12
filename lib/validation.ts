import { z } from "zod";

export const ProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters.")
    .max(150),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters."),

  price: z.coerce
    .number()
    .positive("Price must be greater than 0."),

  stock: z.coerce
    .number()
    .int()
    .min(0, "Stock cannot be negative."),

  categoryId: z
    .string()
    .min(1, "Category is required."),
});

export type ProductInput = z.infer<typeof ProductSchema>;