"use server"

import { auth } from "@/auth";
import { getBaseURL } from "@/lib/getBaseURL";


export const reviewAction = async (endpoint, method, review) => {

    try {
        const session = await auth()

        if (!session) {
            throw new Error('Unauthenticated, log in to write a review')
        }

        const res = await fetch(endpoint, {
            ...method,
            headers: {
                'Content-Type': 'application/json',
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY,
                'X-User-Id' : session?.user?.id
            },
            body: JSON.stringify(review),
        });

        if (!res.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await res.json()
                message = err.message || message
            } catch (parseErr) {
                console.error('[reviewAction] failed to parse error response as JSON:', parseErr)
            }
            throw new Error(message)
        }

        const result = await res.json();

        console.log('RESULT ON review ACTION:', result)

        return await result.data
    } catch (error) {
        console.error('[reviewAction] caught error:', error)
        throw error
    }
}

export const createReview = async (review) => {
    const endpoint = getBaseURL() + 'api/v1/public/create/review'
    return await reviewAction(endpoint, { method: 'POST' }, review)
}


export const editReview = async (review) => {
    const endpoint = getBaseURL() + 'api/v1/public/edit/review'
    return await reviewAction(endpoint, { method: 'PATCH' }, review)
}

export const deleteReview = async (reviewId) => {

    const session = await auth()

    if (!session) {
        throw new Error('Unauthorized Action')
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

        if (!res.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await res.json()
                message = err.message || message
            } catch (parseErr) {
                console.error('[deleteReview] failed to parse error response as JSON:', parseErr)
            }
            throw new Error(message)
        }

        await res.json()

    } catch (error) {
        console.error('[deleteReview] caught error:', error)
        throw error
    }
}
