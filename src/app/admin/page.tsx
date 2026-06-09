import Link from 'next/link';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { adminLogout, deletePost } from './actions';

export default async function AdminDashboard() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-xs text-muted-foreground">ovandobrown.blog</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            + New Post
          </Link>
          <form action={adminLogout}>
            <button type="submit" className="text-sm text-muted-foreground hover:text-foreground">
              Logout
            </button>
          </form>
        </div>
      </header>

      <main className="px-6 py-8 max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Posts ({allPosts.length})</h2>

        {allPosts.length === 0 ? (
          <div className="rounded-xl border border-border p-10 text-center text-muted-foreground">
            No posts yet.{' '}
            <Link href="/admin/posts/new" className="text-primary underline">
              Create your first post.
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {allPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="font-medium truncate">{post.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    /{post.slug} · {post.category} ·{' '}
                    {post.publishedAt
                      ? `Published ${post.publishedAt.toLocaleDateString()}`
                      : 'Draft'}
                  </p>
                </div>
                <div className="flex items-center gap-3 ml-4 shrink-0">
                  <Link
                    href={`/posts/${post.slug}`}
                    target="_blank"
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="text-xs text-primary hover:underline"
                  >
                    Edit
                  </Link>
                  <form
                    action={async () => {
                      'use server';
                      await deletePost(post.id);
                    }}
                  >
                    <button type="submit" className="text-xs text-red-500 hover:text-red-400">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
