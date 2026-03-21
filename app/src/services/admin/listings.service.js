"use server"
import { auth } from "@/auth"
import { getBaseURL } from "@/lib/getBaseURL"

export const getAdminListings = async (queryString = '') => {
  try {
    const session = await auth()
    const res = await fetch(`${getBaseURL()}api/v1/admin/fetchAllListings?${queryString}`, {
      cache: 'no-store',
      headers: {
        'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY,
        'X-USER-ROLE': session?.user?.role,
      },
    })
    const result = await res.json()
    if (!result.success) throw new Error(result.message)
    return result.data
  } catch (error) {
    console.error(error.message)
    return { listings: [], filter_meta: null }
  }
}

export const createListing = async (formData) => {
    try {
        const session = await auth()

        if (!session) {
            throw new Error('Unauthenticated access')
        }

        const endPoint = getBaseURL() + 'api/v1/admin/createListing'

        const res = await fetch(endPoint, {
            method: 'POST',
            headers: {
                'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE': session?.user?.role,
            },
            body: formData
        })

        const result = await res.json()

        if (!res.ok) {
            throw new Error(result.message)
        }

        return result.data
    } catch (error) {
        console.error(error.message)
        throw new Error(error.message || 'An internal server error occured while creating listing')
    }
}

export const toggleListingActive = async (listing_id, is_active) => {
    try {
        const session = await auth()

        if (!session) {
            throw new Error('Unauthenticated access')
        }

        const endPoint = getBaseURL() + `api/v1/admin/listings/${listing_id}`

        const res = await fetch(endPoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE': session?.user?.role,
            },
            body: JSON.stringify({ is_active }),
        })

        const result = await res.json()

        if (!res.ok) {
            throw new Error(result.message)
        }

        return result
    } catch (error) {
        console.error(error.message)
        throw new Error(error.message || 'An internal server error occured while updating listing visibility')
    }
}

export const editListing = async (listing_id, formData) => {
    try {
        const session = await auth()

        if (!session) {
            throw new Error('Unauthenticated access')
        }

        const endPoint = getBaseURL() + `api/v1/admin/editListing/${listing_id}`

        const res = await fetch(endPoint, {
            method: 'PATCH',
            headers: {
                'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE': session?.user?.role,
            },
            body: formData
        })

        const result = await res.json()

        if (!res.ok) {
            throw new Error(result.message)
        }

        return result
    } catch (error) {
        console.error(error.message)
        throw new Error(error.message || 'An internal server error occured while editing listing')
    }
}
