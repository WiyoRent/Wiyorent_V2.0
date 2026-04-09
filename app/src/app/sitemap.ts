import type { MetadataRoute } from 'next'
import { getBaseURL } from '@/lib/getBaseURL'

const SITE_URL = 'https://wiyorent.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const static_routes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,                   changeFrequency: 'daily',  priority: 1.0 },
    { url: `${SITE_URL}/listings`,           changeFrequency: 'daily',  priority: 0.9 },
    { url: `${SITE_URL}/housemate-matching`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/privacy`,            changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms`,              changeFrequency: 'yearly', priority: 0.3 },
  ]

  try {
    const res = await fetch(getBaseURL() + 'api/v1/public/getListings', {
      headers: {
        'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY ?? '',
        'X-User-Id': '',
      },
      next: { revalidate: 3600 },
    })

    if (!res.ok) throw new Error('non-ok response')

    const { data } = await res.json()

    const listing_routes: MetadataRoute.Sitemap = (data.listings ?? []).map(
      (l: { listing_id: string }) => ({
        url: `${SITE_URL}/listings/${l.listing_id}`,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })
    )

    return [...static_routes, ...listing_routes]
  } catch (error) {
    console.error('[sitemap] failed to fetch listings:', error)
    return static_routes
  }
}
