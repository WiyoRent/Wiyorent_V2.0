"use server"

import { auth } from "@/auth";
import { getBaseURL } from "@/lib/getBaseURL";



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
            }
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
