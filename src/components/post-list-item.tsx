import Link from 'next/link';
import { Post } from '@/lib/data';
import { Card, CardContent } from './ui/card';
import { BookOpen, ChevronsRight } from 'lucide-react';

interface PostListItemProps {
  post: Post;
}

export default function PostListItem({ post }: PostListItemProps) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
        <div className="post-card transition-all duration-300 group-hover:bg-primary/10 p-2 border border-transparent group-hover:border-primary/20">
            <div className="flex items-center">
                <ChevronsRight className="h-5 w-5 text-primary mr-3" />
                <div className="flex-1">
                    <h3 className="font-headline text-xl font-semibold text-primary group-hover:underline">{post.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span>{post.date}</span>
                        <span>&bull;</span>
                        <span>{post.readingTime} min read</span>
                    </div>
                </div>
            </div>
        </div>
    </Link>
  );
}
