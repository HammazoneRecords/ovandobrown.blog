import { type Post, getPosts } from '@/lib/posts';
import PostCard from '@/components/post-card';
import { User, Image as ImageIcon } from 'lucide-react';
import CircleAreaProof from '@/components/CircleAreaProof';
import FeaturedPost from '@/components/featured-post';

export default async function Home() {
  console.log('Fetching posts on server...');
  const posts = await getPosts();
  console.log('Server fetched posts:', posts.length);

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const otherPosts = posts.length > 1 ? posts.slice(1) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="relative mb-24 flex h-[70vh] flex-col items-center justify-center overflow-hidden text-center rounded-3xl bg-[#050a05]">
        <div className="relative z-10 flex flex-col items-center w-full max-w-3xl px-4">
          <div className="relative w-full" style={{ height: 'clamp(220px, 42vh, 340px)' }}>
            <CircleAreaProof />
          </div>
          <h1
            className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl animate-fade-in"
            style={{ animationDelay: '0.2s', marginTop: '-0.5rem' }}
          >
            ovandoBrown.blog
          </h1>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 font-headline text-3xl font-bold tracking-tight md:text-4xl">Latest Dispatch</h2>
        {featuredPost ? (
          <FeaturedPost post={featuredPost} />
        ) : (
          <div className="rounded-xl bg-card p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">No Posts Yet</h3>
            <p className="text-muted-foreground mb-4">Create your first blog post to get started!</p>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-8 font-headline text-3xl font-bold tracking-tight md:text-4xl">More from the Void</h2>
        {otherPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 0.15}s` }} />
            ))}
          </div>
        ) : !featuredPost && (
          <div className="text-center py-8">
            {/* If no feature, and no others, we already showed "No posts yet" above */}
            <p className="text-muted-foreground">No additional posts to display.</p>
          </div>
        )}
      </section>
    </div>
  );
}
