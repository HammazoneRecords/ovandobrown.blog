'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Stubbed Comment Section
export function CommentSection({ postId }: { postId: string }) {
  // Temporary stub state
  const [comments, setComments] = useState([]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-headline font-bold">Comments (Coming Soon)</h2>
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          Comments are temporarily disabled during our platform upgrade. Check back soon!
        </CardContent>
      </Card>
    </div>
  );
}
