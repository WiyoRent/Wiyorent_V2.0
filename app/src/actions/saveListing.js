"use server"

import { auth } from "../auth"
import { getBaseURL } from "../lib/getBaseURL"

export async function toggleSaveAction (listingId, isLiked){
    const session = await auth()

    if(!session?.user?.id) throw new Error ("Unauthorized")
    
    const url = getBaseURL() + 'api/v1/public/saveListing'


    console.log(session.user.id, listingId, isLiked, '---receiiived')

    const response = await fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'X-Internal-API-Key' : process.env.INTERNAL_BACKEND_KEY
        },
        body : JSON.stringify({
            userId : session.user.id,
            listingId,
            isLiked
        })
    })

    return response.ok
}