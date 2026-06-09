import { getPostBySlug, getPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, Clock, Headphones, BookOpen } from 'lucide-react';
import { CommentSection } from './comment-section';
import RelatedContent from './related-content';
import PostAudioPlayer from './post-audio-player';
import { marked } from 'marked';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = await getPosts();
  const allPostTitles = allPosts.map((p) => p.title);
  const htmlContent = marked.parse(post.content ?? '');

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <article>
        <header className="mb-8 text-center">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            {post.category}
          </Badge>
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-muted-foreground text-sm">
            <span>{post.author}</span>
            <span className="hidden sm:inline">&bull;</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
            </div>
            <span className="hidden sm:inline">&bull;</span>
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{post.readingTime} min read</span>
            </div>
            <span className="hidden sm:inline">&bull;</span>
            <div className="flex items-center gap-1.5">
              <Headphones className="h-3.5 w-3.5" />
              <span>{post.listeningTime} min listen</span>
            </div>
          </div>
        </header>

        {post.image && (
          <div className="relative w-full h-[400px] mb-10 rounded-2xl overflow-hidden shadow-lg">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>
        )}

        {post.excerpt && (
          <p className="text-lg text-muted-foreground italic border-l-4 border-primary pl-4 mb-8">
            {post.excerpt}
          </p>
        )}

        <PostAudioPlayer postContent={post.content ?? ''} />

        <div
          className="prose prose-invert max-w-none mt-8 prose-p:text-base prose-p:leading-relaxed prose-headings:font-headline prose-headings:text-primary prose-a:text-primary prose-strong:text-foreground prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <RelatedContent currentPostContent={post.content ?? ''} allPosts={allPostTitles} />

        <div className="mt-10">
          <CommentSection postId={params.slug} />
        </div>
      </article>
    </div>
  );
}
