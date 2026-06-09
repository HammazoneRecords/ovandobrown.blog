import { db } from '@/db';
import { posts } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export type Post = {
  id: number;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string | null;
  excerpt: string;
  content: string;
  readingTime: number;
  listeningTime: number;
};

function mapPost(row: typeof posts.$inferSelect): Post {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    author: row.author,
    date: row.publishedAt?.toISOString() ?? row.createdAt.toISOString(),
    image: row.coverImage ?? null,
    excerpt: row.excerpt ?? '',
    content: row.content ?? '',
    readingTime: row.readingTime ?? 5,
    listeningTime: row.listeningTime ?? 5,
  };
}

export async function getPosts(): Promise<Post[]> {
  try {
    const rows = await db
      .select()
      .from(posts)
      .orderBy(desc(posts.publishedAt));
    return rows.map(mapPost);
  } catch (err) {
    console.error('getPosts failed:', err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const rows = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
    return rows[0] ? mapPost(rows[0]) : null;
  } catch (err) {
    console.error('getPostBySlug failed:', err);
    return null;
  }
}
