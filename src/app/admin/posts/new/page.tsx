import Link from 'next/link';
import { createPost } from '../../actions';
import PostForm from '../../_components/PostForm';

export default function NewPostPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
          ← Dashboard
        </Link>
        <h1 className="text-xl font-bold">New Post</h1>
      </header>
      <main className="px-6 py-8 max-w-3xl mx-auto">
        <PostForm action={createPost} />
      </main>
    </div>
  );
}
