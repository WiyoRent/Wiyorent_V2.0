"use server"

import { auth } from "@/auth"
import { getBaseURL } from "@/lib/getBaseURL"

export const approveReview = async (review_id, email, full_name, property_title) => {

    const session = await auth()

    try {
        if(!session){
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
                'X-Internal-API-Key' : process.env.INTERNAL_BACKEND_KEY,
                'X-User-Role' : session?.user?.role,
            }
        })
        const result = await res.json()

        if(!res.ok){
            throw new Error(result.message || "An internal server error occured")
        }

        if(!result.success){
            throw new Error(result.message || "An internal server error occured")
        }
    } catch (error) {
        console.error('An internal server error occured on this action', error.message)
        throw new Error(error.message || 'An internal server error occured on this action' )
    }
}

export const rejectReview = async (review_id, email, full_name, property_title, review_rejection_note) => {

    const session = await auth()

    try {
        if(!session){
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
                'X-Internal-API-Key' : process.env.INTERNAL_BACKEND_KEY,
                'X-User-Role' : session?.user?.role,
            }
        })
        const result = await res.json()

        if(!res.ok){
            throw new Error(result.message || "An internal server error occured")
        }

        if(!result.success){
            throw new Error(result.message || "An internal server error occured")
        }
    } catch (error) {
        console.error('An internal server error occured on this action', error.message)
        throw new Error(error.message || 'An internal server error occured on this action' )
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
                'X-Internal-API-Key': process.env.INTERNAL_BACKEND_KEY,
                'X-User-Role': session?.user?.role,
            }
        })
        const result = await res.json()
        if (!res.ok) throw new Error(result.message || "An internal server error occurred")
        if (!result.success) throw new Error(result.message || "An internal server error occurred")
    } catch (error) {
        console.error(error.message)
        throw new Error(error.message || 'An internal server error occurred')
    }
}