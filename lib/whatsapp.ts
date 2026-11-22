// Centralized WhatsApp, Call & Live Demo links for HisabSarthi by Suraj Automation Team.
export const LIVE_DEMO_URL =
  'https://script.google.com/macros/s/AKfycbzChXbL9oAIa4L6NZ8b_N0tYXCAypUjZIV_jTDbyM78s3qivp_ZGOoVj08aQyzU6dTr8Q/exec';

export const WHATSAPP_CONFIG = {
  number: '919355337839',
  rawPhone: '9355337839',
  displayPhone: '+91 93553 37839',
  telHref: 'tel:+919355337839',
  teamName: 'Suraj Automation Team',
  productName: 'HisabSarthi',
  priceLabel: '₹4,999 New Year Offer (Lifetime Access)',
};

export function buildCallUrl(): string {
  return WHATSAPP_CONFIG.telHref;
}

export type WhatsAppIntent = 'buy-setup' | 'header-get' | 'team-chat';

export interface WhatsAppCustomDetails {
  contactName?: string;
  businessName?: string;
  city?: string;
}

export function buildWhatsAppMessage(
  intent: WhatsAppIntent,
  custom?: WhatsAppCustomDetails
): string {
  const nameLine = custom?.contactName?.trim()
    ? `Name: ${custom.contactName.trim()}\n`
    : '';
  const businessLine = custom?.businessName?.trim()
    ? `Business Name: ${custom.businessName.trim()}\n`
    : '';
  const cityLine = custom?.city?.trim() ? `City: ${custom.city.trim()}\n` : '';
  const customBlock =
    nameLine || businessLine || cityLine
      ? `\n${nameLine}${businessLine}${cityLine}`
      : '';

  if (intent === 'team-chat') {
    return `Hello Suraj Automation Team, I would like more information about HisabSarthi (₹4,999 New Year Lifetime Offer) and how the setup works for my business.${customBlock}`;
  }

  return `Hello Suraj Automation Team, I want to claim the HisabSarthi New Year Offer (₹4,999 One-Time Lifetime Access instead of ₹9,999) and confirm my free professional software setup. Please share the payment and onboarding steps.${customBlock}`;
}

export function buildWhatsAppUrl(
  intent: WhatsAppIntent,
  custom?: WhatsAppCustomDetails
): string {
  const text = encodeURIComponent(buildWhatsAppMessage(intent, custom));
  return `https://wa.me/${WHATSAPP_CONFIG.number}?text=${text}`;
}
