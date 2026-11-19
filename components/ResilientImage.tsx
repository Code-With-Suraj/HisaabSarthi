'use client';

import { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { Building2 } from 'lucide-react';

interface ResilientImageProps {
  src: StaticImageData;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
}

export default function ResilientImage({
  src,
  alt,
  caption,
  className = '',
  priority = false,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-br from-[#F4F2EC] to-[#E9E5DA] p-8 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Building2 className="mb-3 h-10 w-10 text-slate-600" strokeWidth={1.5} />
        <p className="text-sm font-medium text-slate-800">{alt}</p>
        {caption && <p className="mt-1 text-xs text-slate-500">{caption}</p>}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl border border-slate-200 bg-white ${className}`}>
      <Image
        src={src}
        alt={alt}
        priority={priority}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
