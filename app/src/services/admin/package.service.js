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

        const result = await res.json()

        if (!res.ok) {
            throw new Error(result.message)
        }

        return result.data
    } catch (error) {
        console.error(error.message)
        throw new Error(error.message || 'An internal server error occured while fetching packages')
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

        const result = await res.json()

        if (!res.ok) {
            throw new Error(result.message)
        }

        return result.data
    } catch (error) {
        console.error(error.message)
        throw new Error(error.message || 'An internal server error occured while creating package')
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

        const result = await res.json()

        if (!res.ok) {
            throw new Error(result.message)
        }

        return result.data
    } catch (error) {
        console.error(error.message)
        throw new Error(error.message || 'An internal server error occured while updating package')
    }
}

export const deletePackage = async (id) => {
    try {
        const session = await auth()

        if (!session) {
            throw new Error('Unauthenticated access')
        }

        const endPoint = getBaseURL() + `api/v1/admin/delete/package/${id}`

        const res = await fetch(endPoint, {
            method: 'DELETE',
            headers: {
                'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE': session?.user?.role,
            },
        })

        const result = await res.json()

        if (!res.ok) {
            throw new Error(result.message)
        }
    } catch (error) {
        console.error(error.message)
        throw new Error(error.message || 'An internal server error occured while deleting package')
    }
}
