'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { trackEvent, type AnalyticsEventName } from '@/lib/analytics';

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  eventName: AnalyticsEventName;
  eventLocation: string;
  eventLabel?: string;
  children: ReactNode;
}

export default function TrackedLink({
  eventName,
  eventLocation,
  eventLabel,
  onClick,
  children,
  ...rest
}: TrackedLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackEvent(eventName, {
          location: eventLocation,
          label: eventLabel,
        });
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
