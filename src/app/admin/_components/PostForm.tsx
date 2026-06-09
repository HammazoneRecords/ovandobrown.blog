'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

type Post = {
  title: string;
  slug: string;
  author: string;
  category: string;
  excerpt: string | null;
  content: string | null;
  coverImage: string | null;
  readingTime: number | null;
  listeningTime: number | null;
  publishedAt: Date | null;
};

export default function PostForm({
  action,
  post,
}: {
  action: (formData: FormData) => Promise<void>;
  post?: Post;
}) {
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? '');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.url) setCoverImage(data.url);
    setUploading(false);
  }

  return (
    <form action={action} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1.5">Title *</label>
        <input
          name="title"
          defaultValue={post?.title}
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Slug</label>
          <input
            name="slug"
            defaultValue={post?.slug}
            placeholder="auto-generated from title"
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Category</label>
          <input
            name="category"
            defaultValue={post?.category ?? 'Uncategorized'}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Author</label>
          <input
            name="author"
            defaultValue={post?.author ?? 'Ovando Brown'}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1.5">Read (min)</label>
            <input
              name="readingTime"
              type="number"
              min="1"
              defaultValue={post?.readingTime ?? 5}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Listen (min)</label>
            <input
              name="listeningTime"
              type="number"
              min="1"
              defaultValue={post?.listeningTime ?? 5}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Cover Image</label>
        <div className="flex gap-3 items-center">
          <input
            name="coverImage"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="/uploads/image.jpg or paste a URL"
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="rounded-lg border border-border px-4 py-2.5 text-sm hover:bg-accent disabled:opacity-50"
          >
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </div>
        {coverImage && (
          <div className="mt-3 relative h-40 w-full rounded-lg overflow-hidden border border-border">
            <Image src={coverImage} alt="Cover preview" fill className="object-cover" />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Excerpt</label>
        <textarea
          name="excerpt"
          defaultValue={post?.excerpt ?? ''}
          rows={2}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Content (Markdown)</label>
        <textarea
          name="content"
          defaultValue={post?.content ?? ''}
          rows={20}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary resize-y"
          placeholder="Write in Markdown..."
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="publishNow"
          id="publishNow"
          defaultChecked={!!post?.publishedAt}
          className="rounded"
        />
        <label htmlFor="publishNow" className="text-sm">
          Published (visible on blog)
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Save Post
        </button>
        <a href="/admin" className="rounded-lg border border-border px-6 py-2.5 text-sm hover:bg-accent">
          Cancel
        </a>
      </div>
    </form>
  );
}
