"use server"
import { auth } from "@/auth"
import { getBaseURL } from "@/lib/getBaseURL"

export const getAdminAnalytics = async () => {
  try {
    const session = await auth()
    const res = await fetch(`${getBaseURL()}api/v1/admin/analytics`, {
      cache: 'no-store',
      headers: {
        'X-INTERNAL-API-KEY': process.env.INTERNAL_BACKEND_KEY,
        'X-USER-ROLE': session?.user?.role,
      },
    })
    if (!res.ok) throw new Error(`Analytics fetch failed: ${res.status}`)
    const result = await res.json()
    if (!result.success) throw new Error(result.message)
    return result.data
  } catch (error) {
    console.error(error.message)
    return {}
  }
}
