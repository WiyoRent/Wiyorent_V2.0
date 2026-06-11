"use client"
import { SessionProvider } from "next-auth/react"

// Wraps the app in NextAuth's client-side SessionProvider so client components
// can call useSession() to read the logged-in user without a server round-trip.
function ClientSessionProvider({children}) {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default ClientSessionProvider