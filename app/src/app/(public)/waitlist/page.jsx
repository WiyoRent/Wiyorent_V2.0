export const dynamic =  'force-dynamic'

import { auth } from '@/auth'
import { getWaitlistedListings } from '@/services/public/fetch_saves.service'
import { ClipboardList, LogIn } from 'lucide-react'
import Link from 'next/link'
import WaitlistGrid from '@/components/public/waitlist/WaitlistGrid'

export const metadata = {
  title: "My Waitlist",
  description:
    "Track student rooms and apartments you've joined the waitlist for in Kigali. Get notified when a spot opens up — no visiting fees, no hidden charges.",
  openGraph: {
    title: "My Waitlist | WiyoRent",
    description:
      "Track waitlisted student rooms and apartments in Kigali. Get notified when a spot opens up.",
    url: "https://wiyorent.com/waitlist",
    siteName: "WiyoRent",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: false,  // personal page, no value in indexing
    follow: false,
  },
};

export default async function WaitlistPage() {
  const session = await auth()

  const listings = session ? (await getWaitlistedListings() || []) : []

  return (
    <div className="min-h-screen bg-base-200">

      {/* Header */}
      <div className="bg-base-100 border-b border-base-300">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <ClipboardList size={22} className="text-accent" />
            </div>
            <div>
              <h1 className="font-primary text-3xl sm:text-4xl font-extrabold text-base-content uppercase tracking-tight">
                My Waitlist
              </h1>
              {session && (
                <p className="font-secondary text-base-content/50 mt-1 text-sm">
                  {listings.length} {listings.length === 1 ? 'listing' : 'listings'} on your waitlist
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!session ? (
          // ── Inline login prompt ──────────────────────────────────────
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-base-300 rounded-full flex items-center justify-center mb-5">
              <ClipboardList size={32} className="text-base-content/20" />
            </div>
            <h3 className="font-primary text-2xl font-bold text-base-content uppercase tracking-tight">
              Sign in to view your waitlist
            </h3>
            <p className="font-secondary text-base-content/45 mt-2 text-sm max-w-md leading-relaxed">
              Join the waitlist on booked listings to get notified when they become available.
            </p>
            <Link
              href="/login"
              className="btn btn-accent rounded-field font-primary font-bold text-sm uppercase tracking-wide mt-6 gap-2"
            >
              <LogIn size={16} />
              Log In
            </Link>
          </div>
        ) : (
          <WaitlistGrid listings={listings} />
        )}
      </div>
    </div>
  )
}
