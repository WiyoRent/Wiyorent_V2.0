"use server"
import { auth } from "@/auth"
import { getBaseURL } from "@/lib/getBaseURL"

export const getReviews = async (queryString = '') => {
    try {
        const session = await auth()

        if (!session) {
            throw new Error('Unauthenticated access')
        }

        const endPoint = getBaseURL() + `api/v1/admin/get/user/reviews?${queryString}`

        const res = await fetch(endPoint, {
            cache: 'no-store',
            headers : {
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE' : session?.user?.role
            }
        })

        if (!res.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await res.json()
                message = err.message || message
            } catch (parseErr) {
                console.error('[getReviews] failed to parse error response as JSON:', parseErr)
            }
            throw new Error(message)
        }

        const result = await res.json()

        if (!result.success) {
            throw new Error(result.message)
        }

        return result.data
    } catch (error) {
        console.error('[getReviews] caught error:', error)
        throw error
    }
}
