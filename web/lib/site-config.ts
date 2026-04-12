const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+255 779 451 655';
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@mansa.travel';
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '255779451655';

const normalizeWhatsAppNumber = (value: string) => value.replace(/[^\d]/g, '');

export const siteConfig = {
  contact: {
    phone: contactPhone,
    email: contactEmail,
    whatsappNumber: normalizeWhatsAppNumber(whatsappNumber),
    address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'Zanzibar, Tanzania',
  },
  links: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/mansa.tours',
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://www.tiktok.com/@mansa.tours',
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ||
      'https://www.linkedin.com/company/mansa-tours-travel',
    website: process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://mansa.travel',
  },
};

export const contactHref = {
  phone: `tel:${siteConfig.contact.phone}`,
  email: `mailto:${siteConfig.contact.email}`,
  whatsapp: `https://wa.me/${siteConfig.contact.whatsappNumber}`,
};
