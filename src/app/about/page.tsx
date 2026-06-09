'use client';

import Image from 'next/image';
import { useState } from 'react';
import { User, Image as ImageIcon } from 'lucide-react';

export default function AboutPage() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-5">
        <div className="relative col-span-1 h-96 w-full md:col-span-2">
          {!imageError ? (
            <Image
              src="https://placehold.co/800x1200"
              alt="Ovando Brown"
              data-ai-hint="man portrait"
              fill
              className="rounded-3xl object-cover shadow-2xl"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted rounded-3xl shadow-2xl">
              <div className="text-center">
                <User className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Portrait not available</p>
              </div>
            </div>
          )}
           <div className="absolute -bottom-4 -right-4 h-24 w-24 animate-float rounded-full bg-primary/20 backdrop-blur-sm [animation-delay:-2s]"></div>
           <div className="absolute -top-8 -left-8 h-32 w-32 animate-float rounded-full bg-accent/10 backdrop-blur-md"></div>
        </div>
        <div className="col-span-1 md:col-span-3">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
            Ovando Brown
          </h1>
          <p className="mt-2 text-xl font-medium text-primary">
            Navigator of Digital Worlds
          </p>
          <div className="mt-8 space-y-4 text-lg text-foreground/80">
            <p>
              Hailing from the vibrant shores of Jamaica, I am a software engineer, a lifelong learner, and a storyteller at heart. My journey into the world of technology was fueled by a deep-seated curiosity about how things work and a desire to build solutions that make a difference.
            </p>
            <p>
              'ovandoBrown.blog' is the digital extension of my thoughts—a place where I explore the constant orbit of technology, culture, and personal development. I believe that from our unique vantage point in the Caribbean, we have a distinct and valuable perspective to offer the global tech conversation.
            </p>
            <p>
              My professional work is centered around building robust, scalable, and user-centric web applications. I'm passionate about clean code, elegant design, and the power of software to solve real-world problems. When I'm not at my keyboard, you can find me exploring the natural beauty of my island, lost in a good book, or contemplating the next big idea.
            </p>
            <p>
              Thank you for joining me on this journey. Let's explore the future, together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
