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

        const result = await res.json()

        if (!res.ok) {
            throw new Error(result.message || 'Failed to fetch profile. Try again later.')
        }

        return result // { user, listing }

    } catch (error) {
        console.error(error, 'Error on getProfile service')
        throw new Error(error.message || 'An internal server error occurred on getProfile')
    }
}


export const editProfile = async (formData) => {
    try {
        const session = await auth()

        if(!session){
            throw new Error('Unauthentificated Action. Login and retry')
        }


        const endPoint = getBaseURL() + `api/v1/public/update/profile`

        const res = await fetch(endPoint, {
            method : 'PATCH',
            body : formData,
            headers : {
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY,
                'X-User-Id' : session?.user?.id
            }
        })
        if (!res.ok) {
            let message = 'An error occurred. Try again later.'
            try { const err = await res.json(); message = err.message || message } catch {}
            throw new Error(message)
        }

        const result = await res.json()

        console.log(result, '--result from edit profile')

        return result
    } catch (error) {
        console.error(error || 'An ineternal server error occured on editProfile')

        throw new Error(error.message || 'An internal server error occured on editProfile')
    }
}