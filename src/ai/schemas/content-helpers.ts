import { z } from 'zod';

export const GenerateContentHelpersInputSchema = z.object({
  title: z.string(),
  content: z.string(),
});
export type GenerateContentHelpersInput = z.infer<typeof GenerateContentHelpersInputSchema>;

export const GenerateContentHelpersOutputSchema = z.object({
  slug: z.string(),
  excerpt: z.string(),
  readingTime: z.number(),
  listeningTime: z.number(),
  date: z.string(),
  category: z.string(),
  formattedContent: z.string(),
});
export type GenerateContentHelpersOutput = z.infer<typeof GenerateContentHelpersOutputSchema>;
