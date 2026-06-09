
'use client';

import { useEffect, useRef } from 'react';

interface HomeVideoPlayerProps {
    src: string;
}

export default function HomeVideoPlayer({ src }: HomeVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.30;
        }
    }, []);

    return (
        <div className="absolute inset-0 z-0">
           <video
            ref={videoRef}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-150"
          />
        </div>
    );
}
