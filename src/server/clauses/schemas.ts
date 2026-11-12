import { z } from 'zod';

export const saveClauseSchema = z.object({
  id: z.string().trim().optional(),
  title: z.string().trim().min(2, 'عنوان البند التعاقدي مطلوب (حرفين على الأقل)'),
  body: z.string().trim().min(5, 'نص البند التعاقدي مطلوب'),
  mandatory: z.boolean().default(false),
  order: z.coerce.number().int().nonnegative().default(0),
  active: z.boolean().default(true),
});

export const deleteClauseSchema = z.object({
  clauseId: z.string().trim().min(1, 'معرف البند مطلوب'),
});

export const reorderClausesSchema = z.object({
  orderedIds: z.array(z.string().trim().min(1)).min(1, 'قائمة المعرفات مطلوبة'),
});

export type SaveClauseInput = z.infer<typeof saveClauseSchema>;
export type DeleteClauseInput = z.infer<typeof deleteClauseSchema>;

export interface ClauseActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

