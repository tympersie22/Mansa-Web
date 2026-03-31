const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+255 712 345 678';
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'journeys@mansa.travel';
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '255712345678';

const normalizeWhatsAppNumber = (value: string) => value.replace(/[^\d]/g, '');

export const siteConfig = {
  contact: {
    phone: contactPhone,
    email: contactEmail,
    whatsappNumber: normalizeWhatsAppNumber(whatsappNumber),
    address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'Zanzibar, Tanzania',
  },
  links: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/mansa.travel',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com/mansa.travel',
    website: process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://mansa.travel',
  },
};

export const contactHref = {
  phone: `tel:${siteConfig.contact.phone}`,
  email: `mailto:${siteConfig.contact.email}`,
  whatsapp: `https://wa.me/${siteConfig.contact.whatsappNumber}`,
};
