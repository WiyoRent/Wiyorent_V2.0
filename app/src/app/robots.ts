import type { MetadataRoute } from 'next'

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
