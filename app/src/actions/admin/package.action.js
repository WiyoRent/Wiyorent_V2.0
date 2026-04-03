"use server"

import { auth } from "@/auth"
import { getBaseURL } from "@/lib/getBaseURL"

export const deletePackage = async (id) => {
    try {
        const session = await auth()

        if (!session) {
            throw new Error('Unauthenticated access')
        }

        const endPoint = getBaseURL() + `api/v1/admin/delete/package/${id}`

        const res = await fetch(endPoint, {
            method: 'DELETE',
            headers: {
                'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE': session?.user?.role,
            },
        })

        if (!res.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await res.json()
                message = err.message || message
            } catch (parseErr) {
                console.error('[deletePackage] failed to parse error response as JSON:', parseErr)
            }
            throw new Error(message)
        }
    } catch (error) {
        console.error('[deletePackage] caught error:', error)
        throw error
    }
}
