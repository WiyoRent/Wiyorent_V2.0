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

        const result = await res.json()

        if (!res.ok) {
            throw new Error(result.message)
        }
    } catch (error) {
        console.error(error.message)
        throw new Error(error.message || 'An internal server error occured while deleting package')
    }
}
