'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';
import { User, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function FeaturedPost({ post }: { post: Post }) {
    const [imageError, setImageError] = useState(false);
    const [authorImageError, setAuthorImageError] = useState(false);

    return (
        <Link href={`/posts/${post.slug}`} className="group block">
            <div className="grid grid-cols-1 gap-8 rounded-xl bg-card p-6 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02] md:grid-cols-2">
                <div className="relative h-64 w-full md:h-auto">
                    {!imageError && post.image ? (
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="rounded-lg object-cover"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted rounded-lg">
                            <div className="text-center">
                                <ImageIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">Image not available</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-center">
                    <span className="mb-2 text-sm font-medium text-primary">{post.category}</span>
                    <h3 className="font-headline text-2xl font-semibold md:text-3xl">{post.title}</h3>
                    <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                    <div className="mt-4 flex items-center gap-4">
                        {!authorImageError && post.authorImage ? (
                            <Image
                                src={post.authorImage}
                                alt={post.author}
                                width={40}
                                height={40}
                                className="rounded-full"
                                onError={() => setAuthorImageError(true)}
                            />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                <User className="h-5 w-5 text-muted-foreground" />
                            </div>
                        )}
                        <div>
                            <p className="font-semibold">{post.author}</p>
                            <p className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
