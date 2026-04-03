"use server"

import { auth } from "@/auth"
import { getBaseURL } from "@/lib/getBaseURL"

export const getPackages = async () => {
    try {
        const session = await auth()

        if (!session) {
            throw new Error('Unauthenticated access')
        }

        const endPoint = getBaseURL() + 'api/v1/admin/get/packages'

        const res = await fetch(endPoint, {
            headers: {
                'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE': session?.user?.role,
            },
        })

        if (!res.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await res.json()
                message = err.message || message
            } catch (parseErr) {
                console.error('[getPackages] failed to parse error response as JSON:', parseErr)
            }
            throw new Error(message)
        }

        const result = await res.json()

        return result.data
    } catch (error) {
        console.error('[getPackages] caught error:', error)
        throw error
    }
}

export const createPackage = async (pkg) => {
    try {
        const session = await auth()

        if (!session) {
            throw new Error('Unauthenticated access')
        }

        const endPoint = getBaseURL() + 'api/v1/admin/create/package'

        const res = await fetch(endPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE': session?.user?.role,
            },
            body: JSON.stringify(pkg),
        })

        if (!res.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await res.json()
                message = err.message || message
            } catch (parseErr) {
                console.error('[createPackage] failed to parse error response as JSON:', parseErr)
            }
            throw new Error(message)
        }

        const result = await res.json()

        return result.data
    } catch (error) {
        console.error('[createPackage] caught error:', error)
        throw error
    }
}

export const updatePackage = async (id, pkg) => {
    try {
        const session = await auth()

        if (!session) {
            throw new Error('Unauthenticated access')
        }

        const endPoint = getBaseURL() + `api/v1/admin/update/package/${id}`

        const res = await fetch(endPoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE': session?.user?.role,
            },
            body: JSON.stringify(pkg),
        })

        if (!res.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await res.json()
                message = err.message || message
            } catch (parseErr) {
                console.error('[updatePackage] failed to parse error response as JSON:', parseErr)
            }
            throw new Error(message)
        }

        const result = await res.json()

        return result.data
    } catch (error) {
        console.error('[updatePackage] caught error:', error)
        throw error
    }
}
