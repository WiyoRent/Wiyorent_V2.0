"use server"

import { auth } from "@/auth"
import { getBaseURL } from "@/lib/getBaseURL"


export const updateUserStatus = async (data) => {
    try {
        const session = await auth()

        if (!session) {
            throw new Error('Unauthorized')
        }

        const endpoint = getBaseURL() + 'api/v1/admin/update/user'

        const res = await fetch(endpoint, {
            method : 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE' : session.user.role
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await res.json()
                message = err.message || message
            } catch (parseErr) {
                console.error('[updateUserStatus] failed to parse error response as JSON:', parseErr)
            }
            throw new Error(message)
        }

        const result = await res.json()

        if (!result.success) {
            throw new Error(result.message || "Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.")
        }

        return result.message
    } catch (error) {
        console.error('[updateUserStatus] caught error:', error)
        throw error
    }

}

export const deleteUser = async (userId) => {
    try {
        const session = await auth()

        if (!session) {
            throw new Error('Unauthorized action')
        }

        const endpoint = getBaseURL() + `api/v1/admin/delete/user/${userId}`

        const res = await fetch(endpoint, {
            method : "DELETE",
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
                console.error('[deleteUser] failed to parse error response as JSON:', parseErr)
            }
            throw new Error(message)
        }
    } catch (error) {
        console.error('[deleteUser] caught error:', error)
        throw error
    }
}
