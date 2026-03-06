"use server"

import { headers } from "next/headers"
import { auth } from "../../auth"
import { getBaseURL } from "../../lib/getBaseURL"

const toggleSave = async (endpoint, payload) => {
    try {
        const session = await auth()
        if(!session?.user?.id) throw new Error("Unauthorized")

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Internal-API-Key': process.env.INTERNAL_BACKEND_KEY,
                'X-User-Id' : session.user.id
            },
            body: JSON.stringify({
                userId : session.user.id,
                ...payload
            })
        })

        return response.ok
    } catch (error) {
        console.error(error)
    }
    
}

export async function toggleSaveListing (listingId, isLiked){
    const url = getBaseURL() + 'api/v1/public/saveListing'
    return await toggleSave(url,{listingId, isLiked})
}

export async function toggleSaveHousemate(housemateId, isSaved){
    const url = getBaseURL() + 'api/v1/public/saveHousemate'
    return toggleSave(url, {housemateId,isSaved})
}