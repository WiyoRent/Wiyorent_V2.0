"use server"

import { auth } from "@/auth";
import { getBaseURL } from "@/lib/getBaseURL";

export const getProfile = async () => {
    try {
        const session = await auth()

        if (!session) {
            throw new Error('Unauthenticated action. Login and retry.')
        }

        const userId = session.user.id

        const endPoint = getBaseURL() + `api/v1/public/profile/${userId}`

        const res = await fetch(endPoint, {
            method: 'GET',
            cache: 'no-cache', // always fresh — never serve stale profile data
            headers: {
                'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY,
                'X-User-Id': userId
            }
        })

        if (!res.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await res.json()
                message = err.message || message
            } catch (parseErr) {
                console.error('[getProfile] failed to parse error response as JSON:', parseErr)
            }
            throw new Error(message)
        }

        const result = await res.json()

        return result // { user, listing }

    } catch (error) {
        console.error('[getProfile] caught error:', error)
        throw error
    }
}


export const editProfile = async (formData) => {
    try {
        const session = await auth()

        if (!session) {
            throw new Error('Unauthenticated Action. Login and retry')
        }


        const endPoint = getBaseURL() + `api/v1/public/update/profile`

        console.log('[editProfile] fetching', endPoint, 'userId:', session?.user?.id)

        const res = await fetch(endPoint, {
            method : 'PATCH',
            body : formData,
            headers : {
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY,
                'X-User-Id' : session?.user?.id
            }
        })

        console.log('[editProfile] response status:', res.status, res.statusText)

        if (!res.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await res.json()
                console.log('[editProfile] error body:', err)
                message = err.message || message
            } catch (parseErr) {
                console.error('[editProfile] failed to parse error response as JSON:', parseErr)
            }
            throw new Error(message)
        }

        const result = await res.json()

        console.log(result, '--result from edit profile')

        return result
    } catch (error) {
        console.error('[editProfile] caught error:', error)
        throw error
    }
}
