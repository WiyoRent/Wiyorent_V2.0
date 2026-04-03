"use server"

import { auth } from "@/auth"
import { getBaseURL } from "@/lib/getBaseURL"
import { cookies } from "next/headers"
import {v4 as uuidv4} from 'uuid'

export const trackView = async (listingId) => {

    const cookieStore = await cookies()

    let sessionId = cookieStore.get('sessionId')?.value

    if (!sessionId) {
        sessionId = uuidv4()
        cookieStore.set('sessionId', sessionId, {
            maxAge : 60 * 60 * 24 * 365
        });
    }

    const session = await auth()

    try {
        const endpoint = getBaseURL() + `api/v1/public/listing/${listingId}/view`
        const res = await fetch(endpoint, {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'X-INTERNAL-API-KEY' : process.env.INTERNAL_BACKEND_KEY,
                'X-User-Id' : session?.user?.id
            },
            body : JSON.stringify({
                userId : session?.user?.id || null,
                sessionId : sessionId || null
            })
        })

        if (!res.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await res.json()
                message = err.message || message
            } catch (parseErr) {
                console.error('[trackView] failed to parse error response as JSON:', parseErr)
            }
            throw new Error(message)
        }
    } catch (error) {
        console.error('[trackView] caught error:', error)
        throw error
    }
}

export const trackHousemateView = async (housemateId) => {

    const cookieStore = await cookies()

    let sessionId = cookieStore.get('sessionId')?.value

    if (!sessionId) {
        sessionId = uuidv4()
        cookieStore.set('sessionId', sessionId, {
            maxAge: 60 * 60 * 24 * 365
        })
    }

    const session = await auth()

    try {
        const endpoint = getBaseURL() + `api/v1/public/housemates/${housemateId}/view`
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY,
                'X-User-Id': session?.user?.id
            },
            body: JSON.stringify({
                userId: session?.user?.id || null,
                sessionId: sessionId || null
            })
        })

        if (!res.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await res.json()
                message = err.message || message
            } catch (parseErr) {
                console.error('[trackHousemateView] failed to parse error response as JSON:', parseErr)
            }
            throw new Error(message)
        }
    } catch (error) {
        console.error('[trackHousemateView] caught error:', error)
        throw error
    }
}
