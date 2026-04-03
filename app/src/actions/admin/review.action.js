"use server"

import { auth } from "@/auth"
import { getBaseURL } from "@/lib/getBaseURL"

export const approveReview = async (review_id, email, full_name, property_title) => {

    const session = await auth()

    try {
        if (!session) {
            throw new Error("Unauthorized")
        }

        const endPoint = getBaseURL() + `api/v1/admin/approve/user/review/${review_id}`

        const res = await fetch(endPoint, {
            method : 'PATCH',
            body : JSON.stringify({
                status : 'approved',
                email,
                full_name,
                property_title
            }),
            headers : {
                'Content-Type' : 'application/json',
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE' : session?.user?.role,
            }
        })

        if (!res.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await res.json()
                message = err.message || message
            } catch (parseErr) {
                console.error('[approveReview] failed to parse error response as JSON:', parseErr)
            }
            throw new Error(message)
        }

        const result = await res.json()

        if (!result.success) {
            throw new Error(result.message || "Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.")
        }
    } catch (error) {
        console.error('[approveReview] caught error:', error)
        throw error
    }
}

export const rejectReview = async (review_id, email, full_name, property_title, review_rejection_note) => {

    const session = await auth()

    try {
        if (!session) {
            throw new Error("Unauthorized")
        }

        const endPoint = getBaseURL() + `api/v1/admin/reject/user/review/${review_id}`

        const res = await fetch(endPoint, {
            method : 'PATCH',
            body : JSON.stringify({
                status : 'rejected',
                email,
                full_name,
                property_title,
                review_rejection_note
            }),
            headers : {
                'Content-Type' : 'application/json',
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE' : session?.user?.role,
            }
        })

        if (!res.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await res.json()
                message = err.message || message
            } catch (parseErr) {
                console.error('[rejectReview] failed to parse error response as JSON:', parseErr)
            }
            throw new Error(message)
        }

        const result = await res.json()

        if (!result.success) {
            throw new Error(result.message || "Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.")
        }
    } catch (error) {
        console.error('[rejectReview] caught error:', error)
        throw error
    }
}

export const deleteReview = async (review_id) => {
    const session = await auth()
    try {
        if (!session) throw new Error("Unauthorized")

        const endPoint = getBaseURL() + `api/v1/admin/delete/user/review/${review_id}`

        const res = await fetch(endPoint, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE': session?.user?.role,
            }
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

        const result = await res.json()
        if (!result.success) throw new Error(result.message || "Something went wrong on our end. Please check your connection, refresh the page, or try again later. If the issue persists, contact support at wiyorent@gmail.com.")
    } catch (error) {
        console.error('[deleteReview] caught error:', error)
        throw error
    }
}
