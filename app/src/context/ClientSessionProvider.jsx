"use client"
import { SessionProvider } from "next-auth/react"

function ClientSessionProvider({children}) {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default ClientSessionProvider