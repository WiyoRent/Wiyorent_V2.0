"use server"

import { getBaseURL } from "@/lib/getBaseURL"
import { auth } from "@/auth"


export const getSaved = async (endpoint) => {
    try {
        const session = await auth()
        const userId = session?.user?.id || null

        const response = await fetch(endpoint, {
            headers : {
                'X-User-Id' : userId,
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY
            },
            cache : 'no-store'
        })

        if (!response.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await response.json()
                message = err.message || message
            } catch (parseErr) {
                console.error('[getSaved] failed to parse error response as JSON:', parseErr)
            }
            throw new Error(message)
        }

        const result = await response.json() || []

        return result.data
    } catch (error) {
        console.error('[getSaved] caught error:', error)
        throw error
    }

}

export const getSavedListings = async () => {
    try {
        const url = getBaseURL() + 'api/v1/public/fetchSavedListings'
        return await getSaved(url)
    } catch (error) {
        console.error('[getSavedListings] caught error:', error)
        throw error
    }

}


export const getWaitlistedListings = async () => {
    try {
        const url = getBaseURL() + 'api/v1/public/fetchWaitlistedListings'
        return await getSaved(url)
    } catch (error) {
        console.error('[getWaitlistedListings] caught error:', error)
        throw error
    }
}

export const getSavedHousemates = async () => {
    try {
        const url = getBaseURL() + 'api/v1/public/fetchSavedHousemates'
        return await getSaved(url)
    } catch (error) {
        console.error('[getSavedHousemates] caught error:', error)
        throw error
    }

}
