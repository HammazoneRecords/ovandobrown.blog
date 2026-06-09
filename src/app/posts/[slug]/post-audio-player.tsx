'use client';

import { useState } from 'react';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { Button } from '@/components/ui/button';
import { Loader2, PlayCircle, StopCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

interface PostAudioPlayerProps {
  postContent: string;
}

function HelpfulSection() {
    const [wasHelpful, setWasHelpful] = useState<boolean | null>(null);

    return (
        <div className="flex items-center gap-4">
            <p className="font-semibold text-sm hidden sm:block">Was this article helpful?</p>
            <div className="flex gap-2">
                <Button variant={wasHelpful === true ? "default" : "outline"} size="icon" onClick={() => setWasHelpful(true)}>
                    <ThumbsUp/>
                </Button>
                <Button variant={wasHelpful === false ? "destructive" : "outline"} size="icon" onClick={() => setWasHelpful(false)}>
                    <ThumbsDown/>
                </Button>
            </div>
        </div>
    )
}

export default function PostAudioPlayer({ postContent }: PostAudioPlayerProps) {
  const [audioData, setAudioData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateAudio = async () => {
    setIsLoading(true);
    setAudioData(null);

    try {
      const plainText = postContent.replace(/<[^>]*>?/gm, '');
      const result = await textToSpeech(plainText);
      setAudioData(result.media);
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error generating audio',
        description: 'Could not generate audio for this post. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStop = () => {
    setAudioData(null);
  }

  return (
    <Card className="mb-8 bg-card/50">
      <CardContent className="flex flex-col items-center justify-between gap-4 p-4 text-center md:flex-row">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
            <p className="font-semibold text-sm md:text-left">Listen to this post</p>
            {!audioData ? (
                <Button onClick={handleGenerateAudio} disabled={isLoading} size="sm">
                {isLoading ? (
                    <>
                    <Loader2 className="mr-2 animate-spin" />
                    Generating...
                    </>
                ) : (
                    <>
                    <PlayCircle className="mr-2" />
                    Generate Audio
                    </>
                )}
                </Button>
            ) : (
                <div className="flex w-full flex-col items-center gap-2 sm:flex-row">
                    <audio controls autoPlay src={audioData} className="w-full max-w-xs" />
                    <Button onClick={handleStop} variant="outline" size="sm">
                        <StopCircle className="mr-2" />
                        Stop
                    </Button>
                </div>
            )}
        </div>
        <HelpfulSection />
      </CardContent>
    </Card>
  );
}
