'use client';

export type AnalyticsEventName =
  | 'whatsapp_cta_click'
  | 'phone_call_click'
  | 'demo_interaction'
  | 'pricing_message_copy'
  | 'feature_screen_preview';

export interface AnalyticsEventParams {
  location: string;
  label?: string;
  value?: number;
}

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      params?: Record<string, string | number | undefined>
    ) => void;
    clarity?: (command: 'event', eventName: string) => void;
  }
}

export function trackEvent(
  eventName: AnalyticsEventName,
  params: AnalyticsEventParams
): void {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: params.label || params.location,
      cta_location: params.location,
      value: params.value,
    });
  }

  if (typeof window.clarity === 'function') {
    window.clarity('event', `${eventName}_${params.location}`);
  }
}
