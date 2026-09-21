import { z } from "zod";

export const searchProductsValidator = z.object({
  provider: z.enum(["amazon", "aliexpress", "mercado-livre"]),
  query: z.string().trim().min(2).max(200),
  categoryId: z.string().trim().min(1).max(100).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(10),
});

export type SearchProductsDto = z.infer<typeof searchProductsValidator>;
