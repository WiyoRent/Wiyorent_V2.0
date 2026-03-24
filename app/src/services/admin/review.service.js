"use server"
import { auth } from "@/auth"
import { getBaseURL } from "@/lib/getBaseURL"

export const getReviews = async (queryString = '') => {
    try {
        const session = await auth()

        if(!session){
            throw new Error ("Unauthentificated acccess")
        }

        const endPoint = getBaseURL() + `api/v1/admin/get/user/reviews?${queryString}`

        const res = await fetch(endPoint, {
            cache: 'no-store',
            headers : {
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE' : session?.user?.role
            }
        })
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const result = await res.json()

        if(!result.success){
            throw new Error(result.message)
        }

        return result.data
    } catch (error) {
        console.error(error.message)
        return { reviews: [] }
    }
}