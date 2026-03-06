"use server"

import { auth } from "@/auth"
import { getBaseURL } from "@/lib/getBaseURL"


export const updateUserStatus = async (data) => {
    try {
        const session = await auth()

        if(!session){
            throw new Error('Unauthorized')
        }

        const endpoint = getBaseURL() + 'api/v1/admin/update/user'

        const res = await fetch(endpoint, {
            method : 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY,
                'X-User-Role' : session.user.role
            },
            body: JSON.stringify(
                data
            )
        })
        const result = await res.json()

        if(!res.ok){
            throw new Error(result.message || 'An internal server error occured')
        }

        if(!result.success){
            throw new Error(result.message || "An internal server error occured")
        }

        return result.message
    } catch (error) {
        console.error(error)
        throw new Error(error.message || 'An internal server error occured')
    }
    
}

export const deleteUser = async(userId) => {
    const session = await auth()

    try {
        if(!session){
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

        const result = await res.json()

        if(!res.ok){
            throw new Error(result.message || 'An error occured while tring to delete user')
        }
    } catch (error) {
        console.error(error.message)
        throw new Error(error.message || "An internal server error occured")
    }
}
