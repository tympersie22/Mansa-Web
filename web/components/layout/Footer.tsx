import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Linkedin, Globe } from 'lucide-react';
import { destinations } from '@/lib/mansa-content';
import { contactHref, siteConfig } from '@/lib/site-config';

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.44h-3.2v12.39a2.89 2.89 0 1 1-2-2.75V8.63a6.08 6.08 0 1 0 5.2 6v-6.3a8 8 0 0 0 4.77 1.57V6.69z" />
    </svg>
  );
}

const footerLinks = {
  destinations: destinations.map((destination) => ({
    label: destination,
    href: '/destinations',
  })),
  company: [
    { label: 'About', href: '/about' },
    { label: 'Corporate & DMC', href: '/corporate-dmc' },
    { label: 'Plan Your Trip', href: '/plan-your-trip' },
  ],
  support: [
    { label: 'FAQs', href: '/faqs' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Journeys', href: '/journeys' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-surface-dark text-text-inverse">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-6 flex items-center gap-3">
              <div>
                <span className="font-heading text-xl tracking-[0.18em] text-white md:text-2xl">
                  MANSA
                </span>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/50">
                  Tours and Travel
                </p>
              </div>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-white/58">
              Private experiences, curated journeys, and seamless travel across Zanzibar and
              mainland Tanzania.
            </p>
            <div className="flex gap-4">
              {[
                { href: siteConfig.links.instagram, icon: Instagram, label: 'Instagram' },
                { href: siteConfig.links.tiktok, icon: TikTokIcon, label: 'TikTok' },
                { href: siteConfig.links.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: siteConfig.links.website, icon: Globe, label: 'Website' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/60 transition-all hover:border-accent hover:text-accent"
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="section-kicker mb-6 text-accent">Destinations</h4>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/66 transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="section-kicker mb-6 text-accent">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/66 transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="section-kicker mb-6 mt-10 text-accent">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/66 transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="section-kicker mb-6 text-accent">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href={contactHref.email} className="flex items-center gap-3 text-sm text-white/66 transition-colors hover:text-accent">
                  <Mail className="h-4 w-4 text-accent" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a href={contactHref.phone} className="flex items-center gap-3 text-sm text-white/66 transition-colors hover:text-accent">
                  <Phone className="h-4 w-4 text-accent" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-white/66">
                  <MapPin className="mt-0.5 h-4 w-4 text-accent" />
                  {siteConfig.contact.address}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/42">
            &copy; {new Date().getFullYear()} MANSA TOURS AND TRAVEL. All rights reserved.
          </p>
          <p className="text-xs text-white/42">Curated Travel &middot; Zanzibar, Tanzania</p>
        </div>
      </div>
    </footer>
  );
}
