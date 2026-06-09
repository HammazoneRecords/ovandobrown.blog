'use server';

import { chatComplete } from '@/ai/deepseek';

export type RelatedContentSuggestionsInput = {
  currentPostContent: string;
  allPosts: string[];
  numSuggestions?: number;
};

export type RelatedContentSuggestionsOutput = {
  suggestions: string[];
};

export async function getRelatedContentSuggestions(
  input: RelatedContentSuggestionsInput,
): Promise<RelatedContentSuggestionsOutput> {
  const { currentPostContent, allPosts, numSuggestions = 3 } = input;

  const system = 'You are a blog content curator. Return ONLY a JSON array of post title strings — no explanation, no markdown.';
  const user = `Given the current post below and the list of all posts, return the ${numSuggestions} most relevant post titles as a JSON array.

Current post:
${currentPostContent.slice(0, 2000)}

All posts:
${allPosts.map((p, i) => `${i + 1}. ${p}`).join('\n')}`;

  try {
    const raw = await chatComplete(system, user);
    const match = raw.match(/\[[\s\S]*\]/);
    const suggestions: string[] = match ? JSON.parse(match[0]) : [];
    return { suggestions: suggestions.slice(0, numSuggestions) };
  } catch {
    return { suggestions: [] };
  }
}
