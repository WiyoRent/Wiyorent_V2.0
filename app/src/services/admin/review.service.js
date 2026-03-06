"use server"
import { auth } from "@/auth"
import { getBaseURL } from "@/lib/getBaseURL"

export const getReviews = async () => {
    try {
        const session = await auth()

        if(!session){
            throw new Error ("Unauthentificated acccess")
        }

        const endPoint = getBaseURL() + 'api/v1/admin/get/user/reviews'

        const res = await fetch(endPoint, {
            headers : {
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE' : session?.user?.role
            }
        })
        const result = await res.json()

        if(!res.ok){
            throw new Error(result.message)
        }

        if(!result.success){
            throw new Error(result.message)
        }

        return result.data
    } catch (error) {
        console.error(error.message)
        throw new Error(error.message || "An internal server error occured while fetchin reviews")
    }
}