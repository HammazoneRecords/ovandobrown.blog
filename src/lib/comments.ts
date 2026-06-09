'use server';

import { db } from '@/db';
import { comments } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export type Comment = {
  id: string;
  author: string;
  text: string;
  timestamp: Date;
};

export type NewComment = {
  author: string;
  text: string;
};

export async function getComments(postSlug: string): Promise<Comment[]> {
  const rows = await db
    .select()
    .from(comments)
    .where(eq(comments.postSlug, postSlug))
    .orderBy(desc(comments.createdAt));

  return rows.map((r) => ({
    id: String(r.id),
    author: r.author,
    text: r.text,
    timestamp: r.createdAt,
  }));
}

export async function addComment(postSlug: string, comment: NewComment): Promise<string> {
  const [row] = await db
    .insert(comments)
    .values({ postSlug, author: comment.author, text: comment.text })
    .returning({ id: comments.id });

  return String(row.id);
}
