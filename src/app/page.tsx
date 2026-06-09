import Image from 'next/image';
import { type Post, getPosts } from '@/lib/posts';
import PostCard from '@/components/post-card';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { User, Image as ImageIcon } from 'lucide-react';
import HomeVideoPlayer from '@/components/home-video-player';
import FeaturedPost from '@/components/featured-post'; // Extracting for client interactivity if needed, but actually we can keep it inline or make a client wrapper if it has state.
// Wait, the featured post section has client state (imageError). I should make a 'FeaturedPostCard' component that is 'use client' to handle that state, OR just accept that I need a client wrapper for the image error handling.
// Simpler: Let's make a new component `src/components/featured-post-card.tsx` for the big card, or just reuse the logic.
// For speed, I'll inline a simple client component extraction or just assume images work for now?
// No, the previous code had `featuredImageError` state. I should preserve that.
// Let's create `src/components/featured-post.tsx` which is 'use client'.

const NavPlanet = ({ href, imgSrc, label, hint, animationClass, imageClassName, imageAnimationClass }: { href: string, imgSrc: string, label: string, hint: string, animationClass?: string, imageClassName?: string, imageAnimationClass?: string }) => (
  <Link href={href} className="group relative flex flex-col items-center gap-2 transition-transform duration-300 hover:!scale-110">
    <div className={cn('h-24 w-24 rounded-full shadow-2xl md:h-32 md:w-32', animationClass)}>
      <Image src={imgSrc} alt={label} data-ai-hint={hint} width={128} height={128} className={cn('rounded-full opacity-90', imageClassName, imageAnimationClass)} />
    </div>
    <span className="absolute -bottom-8 whitespace-nowrap text-lg font-bold text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_hsl(var(--primary))]">
      {label}
    </span>
  </Link>
);

export default async function Home() {
  console.log('Fetching posts on server...');
  const posts = await getPosts();
  console.log('Server fetched posts:', posts.length);

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const otherPosts = posts.length > 1 ? posts.slice(1) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="relative mb-24 flex h-[70vh] flex-col items-center justify-center overflow-hidden text-center rounded-3xl p-4 md:p-8">
        <HomeVideoPlayer src="https://firebasestorage.googleapis.com/v0/b/orbital-blog-errorxy.firebasestorage.app/o/Home%2FVideo_Ready_Faster_Spaceship.mp4?alt=media&token=46ad6303-3c25-449a-99ce-da269e815983" />
        <div className="absolute inset-0 z-10 bg-black/60 rounded-3xl"></div>
        <div className="relative z-20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl">
            ovandoBrown.blog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80 md:text-xl flex items-center justify-center gap-2">
            from the perspective of my angle
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block h-5 w-5"><polyline points="21 21 3 21 21 3 21 21"></polyline><line x1="3" y1="21" x2="21" y2="3"></line></svg>
            nine 10 Nine - 2
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 w-full max-w-2xl -translate-x-1/2 px-4 z-20">
          <div className="flex justify-around items-center">
            <NavPlanet href="/" imgSrc="https://firebasestorage.googleapis.com/v0/b/orbital-narratives.firebasestorage.app/o/Untitled-3.png?alt=media&token=f76e2b40-79a2-4103-b5d2-6799e0ae9683" label="Home" hint="blue planet" animationClass="animate-planet-1-orbit" imageClassName="rotate-[5deg]" imageAnimationClass="animate-wobble" />
            <NavPlanet href="/knowledge-base" imgSrc="https://firebasestorage.googleapis.com/v0/b/orbital-narratives.firebasestorage.app/o/Untitled-4.png?alt=media&token=3ee7be91-c15c-4ff2-8aba-11542ebc1252" label="OBKB" hint="lava planet" animationClass="animate-planet-2-orbit" imageClassName="-rotate-90" imageAnimationClass="animate-spin-medium" />
            <NavPlanet href="/about" imgSrc="https://firebasestorage.googleapis.com/v0/b/orbital-narratives.firebasestorage.app/o/Untitled-01.png?alt=media&token=786a5961-0ab7-4851-9cb1-9ffb0bb842ae" label="About" hint="moon planet" animationClass="animate-planet-3-orbit" imageClassName="rotate-[5deg]" imageAnimationClass="animate-spin-reverse" />
          </div>
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
