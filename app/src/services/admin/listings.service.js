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
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
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

        // Strip images — they are uploaded separately after getting the listing_id
        formData.delete('images')

        const endPoint = getBaseURL() + 'api/v1/admin/createListing'

        console.log('[createListing] fetching', endPoint)

        const res = await fetch(endPoint, {
            method: 'POST',
            headers: {
                'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE': session?.user?.role,
            },
            body: formData
        })

        console.log('[createListing] response status:', res.status, res.statusText)

        if (!res.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await res.json()
                console.log('[createListing] error body:', err)
                message = err.message || message
            } catch (parseErr) {
                console.error('[createListing] failed to parse error response as JSON:', parseErr.message)
            }
            throw new Error(message)
        }

        const result = await res.json()

        return result.data.listing_id
    } catch (error) {
        console.error('[createListing] caught error:', error)
        throw new Error(error.message || 'An internal server error occured while creating listing')
    }
}

export const setListingImages = async (listing_id, image_urls) => {
    try {
        const session = await auth()

        if (!session) {
            throw new Error('Unauthenticated access')
        }

        const endPoint = getBaseURL() + `api/v1/admin/setListingImages/${listing_id}`

        const res = await fetch(endPoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE': session?.user?.role,
            },
            body: JSON.stringify({ images: image_urls }),
        })

        if (!res.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await res.json()
                message = err.message || message
            } catch (_) {}
            throw new Error(message)
        }

        return await res.json()
    } catch (error) {
        console.error('[setListingImages] caught error:', error)
        throw new Error(error.message || 'An internal server error occured while setting listing images')
    }
}

export const deleteListing = async (listing_id) => {
    try {
        const session = await auth()

        if (!session) {
            throw new Error('Unauthenticated access')
        }

        const endPoint = getBaseURL() + `api/v1/admin/deleteListing/${listing_id}`

        const res = await fetch(endPoint, {
            method: 'DELETE',
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
            } catch (_) {}
            throw new Error(message)
        }

        return await res.json()
    } catch (error) {
        console.error('[deleteListing] caught error:', error)
        throw new Error(error.message || 'An internal server error occured while deleting listing')
    }
}

export const toggleListingActive = async (listing_id, is_active) => {
    try {
        const session = await auth()

        if (!session) {
            throw new Error('Unauthenticated access')
        }

        const endPoint = getBaseURL() + `api/v1/admin/toggleActive/${listing_id}`

        const res = await fetch(endPoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE': session?.user?.role,
            },
            body: JSON.stringify({ is_active }),
        })

        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const result = await res.json()

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

        console.log('[editListing] fetching', endPoint)

        const res = await fetch(endPoint, {
            method: 'PATCH',
            headers: {
                'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY,
                'X-USER-ROLE': session?.user?.role,
            },
            body: formData
        })

        console.log('[editListing] response status:', res.status, res.statusText)

        if (!res.ok) {
            let message = 'An error occurred. Try again later.'
            try {
                const err = await res.json()
                console.log('[editListing] error body:', err)
                message = err.message || message
            } catch (parseErr) {
                console.error('[editListing] failed to parse error response as JSON:', parseErr.message)
            }
            throw new Error(message)
        }

        const result = await res.json()

        return result
    } catch (error) {
        console.error('[editListing] caught error:', error)
        throw new Error(error.message || 'An internal server error occured while editing listing')
    }
}
