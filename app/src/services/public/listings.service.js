"use server"

import { auth } from "@/auth";
import { getBaseURL } from "@/lib/getBaseURL";



// Fetches the public listings browse page. X-User-Id (when logged in) lets the
// API mark which listings the current user has saved/waitlisted - that's
// per-user, request-specific data, so this fetch must NOT be cached here.
// Next's fetch cache keys entries by URL only, not by header, so caching this
// with `next.revalidate` would serve one user's is_saved/is_on_waitlist flags
// to whichever other user next hits the same filter combination within the
// cache window. The API's own Redis cache already handles the expensive
// shared query; the per-user flags are cheap indexed lookups computed fresh
// on every request by design (see fetchListings), so this stays uncached.
export const getListingsProxy = async (query) => {

    console.log(query, '---query')

    try {
        const session = await auth()
        const user = session?.user?.id || null

        const url = getBaseURL() + `api/v1/public/getListings${query ? `?${query}` : ''}`

        const response = await fetch(url, {
            headers : {
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY,
                'X-User-Id' : user
            },
            cache: 'no-store'
        })

        if (!response.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await response.json()
                message = err.message || message
            } catch (parseErr) {
                console.error('[getListingsProxy] failed to parse error response as JSON:', parseErr)
            }
            throw new Error(message)
        }

        const result = await response.json()
        return { listings: result.data.listings ?? [], filter_meta: result.data.filter_meta ?? null }
    } catch (error) {
        console.error('[getListingsProxy] caught error:', error)
        throw error
    }
}
