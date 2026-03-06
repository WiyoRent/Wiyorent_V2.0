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

        if (!response.ok) {
            console.error("Backend Error:", response.statusText);
            return [];
        }

        const result = await response.json() || []
        return result.data
    } catch (error) {
        console.error("Proxy Fetch Error:", error);
        return []; // Return empty array so .map() doesn't crash
    }
} 







