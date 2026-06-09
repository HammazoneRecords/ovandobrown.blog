'use server';

import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 96);
}

export async function adminLogin(formData: FormData) {
  const password = formData.get('password') as string;
  if (password !== process.env.ADMIN_PASSWORD) {
    redirect('/admin/login?error=1');
  }
  const jar = await cookies();
  jar.set('ob_session', process.env.ADMIN_SESSION_TOKEN ?? 'changeme', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect('/admin');
}

export async function adminLogout() {
  const jar = await cookies();
  jar.delete('ob_session');
  redirect('/admin/login');
}

export async function createPost(formData: FormData) {
  const title = (formData.get('title') as string).trim();
  const slug = (formData.get('slug') as string).trim() || slugify(title);
  const category = (formData.get('category') as string) || 'Uncategorized';
  const author = (formData.get('author') as string) || 'Ovando Brown';
  const excerpt = (formData.get('excerpt') as string) || '';
  const content = (formData.get('content') as string) || '';
  const coverImage = (formData.get('coverImage') as string) || null;
  const readingTime = parseInt(formData.get('readingTime') as string) || 5;
  const listeningTime = parseInt(formData.get('listeningTime') as string) || 5;
  const publishNow = formData.get('publishNow') === 'on';

  await db.insert(posts).values({
    title,
    slug,
    category,
    author,
    excerpt,
    content,
    coverImage,
    readingTime,
    listeningTime,
    publishedAt: publishNow ? new Date() : null,
    updatedAt: new Date(),
  });

  redirect('/admin');
}

export async function updatePost(id: number, formData: FormData) {
  const title = (formData.get('title') as string).trim();
  const slug = (formData.get('slug') as string).trim() || slugify(title);
  const category = (formData.get('category') as string) || 'Uncategorized';
  const author = (formData.get('author') as string) || 'Ovando Brown';
  const excerpt = (formData.get('excerpt') as string) || '';
  const content = (formData.get('content') as string) || '';
  const coverImage = (formData.get('coverImage') as string) || null;
  const readingTime = parseInt(formData.get('readingTime') as string) || 5;
  const listeningTime = parseInt(formData.get('listeningTime') as string) || 5;
  const publishNow = formData.get('publishNow') === 'on';

  await db
    .update(posts)
    .set({
      title,
      slug,
      category,
      author,
      excerpt,
      content,
      coverImage,
      readingTime,
      listeningTime,
      publishedAt: publishNow ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, id));

  redirect('/admin');
}

export async function deletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id));
  redirect('/admin');
}
