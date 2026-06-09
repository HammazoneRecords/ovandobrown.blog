import Link from 'next/link';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { updatePost } from '../../actions';
import PostForm from '../../_components/PostForm';

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();

  const rows = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  if (!rows[0]) notFound();

  const post = rows[0];

  const action = async (formData: FormData) => {
    'use server';
    await updatePost(id, formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
          ← Dashboard
        </Link>
        <h1 className="text-xl font-bold">Edit Post</h1>
      </header>
      <main className="px-6 py-8 max-w-3xl mx-auto">
        <PostForm action={action} post={post} />
      </main>
    </div>
  );
}
