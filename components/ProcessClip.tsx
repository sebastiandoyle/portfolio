'use client';

import { useRef } from 'react';

interface ProcessClipProps {
  src: string;
  caption: string;
}

export default function ProcessClip({ src, caption }: ProcessClipProps) {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <div className="w-20 shrink-0">
      <div
        className="rounded-md overflow-hidden border border-[#27272a] hover:border-[#3f3f46] transition-colors duration-200 cursor-pointer"
        onMouseEnter={() => {
          if (ref.current) ref.current.muted = false;
        }}
        onMouseLeave={() => {
          if (ref.current) ref.current.muted = true;
        }}
      >
        <video
          ref={ref}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto"
        />
      </div>
      <p className="text-[10px] leading-tight text-[#52525b] mt-1.5">{caption}</p>
    </div>
  );
}
