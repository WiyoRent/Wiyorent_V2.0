import type { MetadataRoute } from 'next'

// Generates /robots.txt automatically (Next.js convention). Blocks crawlers
// from auth-gated and admin areas while allowing public marketing/listing pages.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/listings/',
          '/housemates/',
          '/housemate-matching/',
          '/privacy/',
          '/terms/',
        ],
        disallow: [
          '/admin/',
          '/login/',
          '/post-login/',
          '/profile/',
          '/favourites/',
          '/waitlist/',
        ],
      },
    ],
    sitemap: 'https://wiyorent.com/sitemap.xml',
  }
}
