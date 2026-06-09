'use server';

import { chatComplete } from '@/ai/deepseek';
import type { GenerateContentHelpersInput, GenerateContentHelpersOutput } from '@/ai/schemas/content-helpers';

export async function generateContentHelpers(
  input: GenerateContentHelpersInput,
): Promise<GenerateContentHelpersOutput> {
  const words = input.content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 225);
  const listeningTime = Math.ceil(words / 150);
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const slug = input.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const system = 'You are a blog assistant. Return ONLY valid JSON — no markdown, no explanation.';
  const user = `Given this blog title and content, return JSON with keys: excerpt (2 sentences max), category (one word), formattedContent (clean HTML with <h2> and <p> tags).

Title: ${input.title}

Content:
${input.content.slice(0, 3000)}`;

  try {
    const raw = await chatComplete(system, user);
    const match = raw.match(/\{[\s\S]*\}/);
    const parsed = match ? JSON.parse(match[0]) : {};
    return {
      slug,
      excerpt: parsed.excerpt ?? '',
      readingTime,
      listeningTime,
      date,
      category: parsed.category ?? 'General',
      formattedContent: parsed.formattedContent ?? `<p>${input.content}</p>`,
    };
  } catch {
    return {
      slug,
      excerpt: '',
      readingTime,
      listeningTime,
      date,
      category: 'General',
      formattedContent: `<p>${input.content}</p>`,
    };
  }
}
