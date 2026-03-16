"use server"

import { auth } from "@/auth";
import { getBaseURL } from "@/lib/getBaseURL";



export const getListingsProxy = async (query) => {

    console.log(query, '---query')

    try {
        const session = await auth()
        const user = session?.user?.id || null

        const url = getBaseURL() + `api/v1/public/getListings${query ? `?${query}` : ''}`

        const response = await fetch(url, {
            headers : {
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY,
                'X-User-Id' : user
            } 
        })

        if (!response.ok) {
            console.error("Backend Error:", response.statusText);
            return { listings: [], filter_meta: null };
        }

        const result = await response.json()
        return { listings: result.data.listings ?? [], filter_meta: result.data.filter_meta ?? null }
    } catch (error) {
        console.error("Proxy Fetch Error:", error);
        return { listings: [], filter_meta: null };
    }
} 







