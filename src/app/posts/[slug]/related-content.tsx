'use client';

import { useState } from 'react';
import { getRelatedContentSuggestions } from '@/ai/flows/related-content-suggestions';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RelatedContentProps {
  currentPostContent: string;
  allPosts: string[];
}

export default function RelatedContent({ currentPostContent, allPosts }: RelatedContentProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      const result = await getRelatedContentSuggestions({
        currentPostContent,
        allPosts,
        numSuggestions: 3,
      });
      setSuggestions(result.suggestions);
    } catch (err) {
      setError('Could not fetch suggestions. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-16 text-center">
      <Button onClick={handleGetSuggestions} disabled={isLoading} size="lg">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-4 w-4" />
        )}
        Suggest Related Posts
      </Button>

      {error && <p className="mt-4 text-destructive">{error}</p>}
      
      {suggestions.length > 0 && (
        <Card className="mt-8 text-left bg-card/50">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">You Might Also Like</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-lg text-accent hover:underline">
                  {suggestion}
                </li>
              ))}
            </ul>
             <p className="text-xs text-muted-foreground mt-4">* Note: AI suggestions may not always correspond to existing post titles. These are thematic recommendations.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
