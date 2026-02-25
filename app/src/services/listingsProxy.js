"use server"

import { auth } from "@/auth";
import { getBaseURL } from "@/lib/getBaseURL";



export const getListingsProxy = async () => {

    try {
        const session = await auth()
        const user = session?.user?.id || null

        const url = getBaseURL() + 'api/v1/public/getListings'

        const response = await fetch(url, {
            headers : {
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY,
                'X-User-Id' : user
            } 
        })

        const result = await response.json() || []

        return result.data
    } catch (error) {
        
    }
    

} 

export const getSavedListings = async () => {
    try {
        const session = await auth()
        const userId = session?.user?.id || null

        const url = getBaseURL() + 'api/v1/public/fetchSavedListings'
        const response = await fetch(url, {
            headers : {
                'X-User-Id' : userId,
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY
            }
        })

        const result = await response.json() || []

        return result.data
    } catch (error) {
        console.error(error)
    }
    
}