"use server"

import { auth } from "@/auth";
import { getBaseURL } from "@/lib/getBaseURL";


export const reviewAction = async (endpoint, method, review) => {
   
    try {
        const session = await auth()

        if(!session){
            throw new Error('Unauthentificated, log in to write a review')
        }

        const res = await fetch(endpoint, {
            ...method,
            headers: { 
                'Content-Type': 'application/json' ,
                'X-Internal-API-Key' : process.env.INTERNAL_BACKEND_KEY,
                'X-User-Id' : session?.user?.id
            },
            body: JSON.stringify(review),
        });
        const result = await res.json();
    
        if (!res.ok) {
            throw new Error(result.message || "Failed to perform review action");
        }

        console.log('RESULT ON revuew ACTION:', result)

        return await result.data
    } catch (error) {
        console.error(error.message, 'error occured on review')
        throw new Error(error.message || 'Internal Server Error occured')
    }
}

export const createReview = async (review) => {
    const endpoint = getBaseURL() + 'api/v1/public/create/review'
    return await reviewAction(endpoint,{method: 'POST'}, review)
} 


export const editReview = async (review) => {
    const endpoint = getBaseURL() + 'api/v1/public/edit/review'
    return await reviewAction(endpoint, {method:'PATCH'}, review)
}

export const deleteReview = async (reviewId) => {

    const session = await auth()

    if(!session){
        throw new Error('Unathorized Action')
    }

    try {
        const endPoint = getBaseURL() + `api/v1/public/delete/review/${reviewId}`

        const res = await fetch(endPoint, {
            method : 'DELETE',
            headers : {
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY,
                'X-USER-Id' : session.user.id
            },

        })
        
        const result = await res.json()

        if(!res.ok){
            throw new Error(result.message || 'An error occured on delete')
        }

    } catch (error) {
        console.error('Error occured on delete review', error.message)
        throw new Error(error.message || "A server error occured")
    }
}