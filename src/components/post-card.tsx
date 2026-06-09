'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import type { AnchorHTMLAttributes } from 'react';
import { useState } from 'react';
import { User, Image as ImageIcon } from 'lucide-react';

interface PostCardProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  post: Post;
}

export default function PostCard({ post, className, ...props }: PostCardProps) {
  const [imageError, setImageError] = useState(false);
  const [authorImageError, setAuthorImageError] = useState(false);

  return (
    <Link href={`/posts/${post.slug}`} className="group block" {...props}>
      <Card className={cn("overflow-hidden h-full transition-all duration-300 group-hover:shadow-primary/20 group-hover:shadow-2xl group-hover:-translate-y-2", className)}>
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            {!imageError && post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground">Image not available</p>
                </div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Badge variant="outline" className="mb-2 border-primary text-primary">{post.category}</Badge>
          <CardTitle className="font-headline text-xl leading-tight mb-2">
            {post.title}
          </CardTitle>
          <p className="text-muted-foreground text-sm line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            {!authorImageError && post.authorImage ? (
              <Image
                src={post.authorImage}
                alt={post.author}
                width={24}
                height={24}
                className="rounded-full"
                onError={() => setAuthorImageError(true)}
              />
            ) : (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                <User className="h-3 w-3 text-muted-foreground" />
              </div>
            )}
            <span>{post.author}</span>
            <span>&bull;</span>
            <span>{post.date}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
