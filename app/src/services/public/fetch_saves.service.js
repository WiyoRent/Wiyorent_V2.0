"use server"

import { getBaseURL } from "@/lib/getBaseURL"
import { auth } from "@/auth"


export const getSaved = async (endpoint) => {
    try {
        const session = await auth()
        const userId = session?.user?.id || null
        
        const response = await fetch(endpoint, {
            headers : {
                'X-User-Id' : userId,
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY
            },
            cache : 'no-store'
        })

        const result = await response.json() || []

        return result.data
    } catch (error) {
        console.error(error)
    }
    
}

export const getSavedListings = async () => {
    try {
        const url = getBaseURL() + 'api/v1/public/fetchSavedListings'
        return await getSaved(url)    
    } catch (error) {
        console.error(error.message || 'An error occured on get saved listings')
    }

}


export const getWaitlistedListings = async () => {
    try {
        const url = getBaseURL() + 'api/v1/public/fetchWaitlistedListings'
        return await getSaved(url)
    } catch (error) {
        console.error(error.message || 'An error occurred on get waitlisted listings')
    }
}

export const getSavedHousemates = async () => {
    try {
        const url = getBaseURL() + 'api/v1/public/fetchSavedHousemates'
        return await getSaved(url)
    } catch (error) {
        console.error(error.message || 'An error occured on get saved housemates')
    }
    
}