'use client';

import { type Post } from '@/lib/posts';
import PostListItem from '@/components/post-list-item';

interface Props {
  postsByCategory: Record<string, Post[]>;
  categories: string[];
}

export default function KnowledgeBaseClient({ postsByCategory, categories }: Props) {
  return (
    <div className="obkb-page theme-terminal min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
            OBKB:/<span className="blinking-cursor"></span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            &gt; A curated collection of insights and explorations, organized by Choice.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          <aside className="md:w-1/4">
            <div className="sticky top-24 p-4 border border-primary/20">
              <h2 className="font-headline text-xl mb-4 text-primary">Choices</h2>
              {categories.length === 0 ? (
                <p className="text-sm text-muted-foreground">No categories yet.</p>
              ) : (
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <a
                        href={`#${category.replace(/\s+/g, '-')}`}
                        className="text-lg hover:text-accent transition-colors"
                      >
                        - {category}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>

          <main className="md:w-3/4">
            {categories.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">No posts yet.</div>
            ) : (
              <div className="space-y-12">
                {categories.map((category) => (
                  <section key={category} id={category.replace(/\s+/g, '-')}>
                    <h2 className="font-headline text-3xl font-bold mb-6 border-b border-border pb-2 text-primary">
                      ./{category}
                    </h2>
                    <div className="space-y-4">
                      {postsByCategory[category].map((post) => (
                        <PostListItem key={post.slug} post={post} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
