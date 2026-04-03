"use server"

import { auth } from "../../auth"
import { getBaseURL } from "../../lib/getBaseURL"

const toggleSave = async (endpoint, payload) => {
    try {
        const session = await auth()
        if (!session?.user?.id) throw new Error("Unauthorized")

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY,
                'X-User-Id' : session.user.id
            },
            body: JSON.stringify({
                userId : session.user.id,
                ...payload
            })
        })

        if (!response.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await response.json()
                message = err.message || message
            } catch (parseErr) {
                console.error('[toggleSave] failed to parse error response as JSON:', parseErr)
            }
            throw new Error(message)
        }

        return true
    } catch (error) {
        console.error('[toggleSave] caught error:', error)
        throw error
    }

}

export async function toggleSaveListing (listingId, isLiked){
    const url = getBaseURL() + 'api/v1/public/saveListing'
    return await toggleSave(url, { listingId, isLiked })
}

export async function toggleSaveHousemate(housemateId, isSaved){
    const url = getBaseURL() + 'api/v1/public/saveHousemate'
    return toggleSave(url, { housemateId, isSaved })
}

export async function toggleWaitlistListing(listingId, isOnWaitlist){
    const url = getBaseURL() + 'api/v1/public/toggleWaitlist'
    return await toggleSave(url, { listingId, isOnWaitlist })
}
