import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "./auth";

// Next.js middleware (run before matched routes - see `config.match` below).
// Each block below is an independent guard checked in order; the first one
// that matches wins and redirects, otherwise the request proceeds normally.
export async function proxy (req){
    const session = await auth()
    const user = session?.user
    const {pathname} = req.nextUrl

    // Protected Admin Paths -- NOT ADMIN
    // /admin/* requires role === 'admin'; everyone else is sent to /login
    const adminProtectRoutes = ['/admin']
    const role = user?.role
    const isAdminRoute = adminProtectRoutes.some(path => pathname.startsWith(path))

    if(isAdminRoute && role !== 'admin'){
        return NextResponse.redirect(new URL('/login', req.url))
    }

    // Protected User Paths --- NOT LOGIN
    // /housemates and /profile require any authenticated user
    const protectedUserPaths = ['/housemates', '/profile']
    const isProtectedUserPath = protectedUserPaths.some(path => pathname.startsWith(path))

    if(isProtectedUserPath && !user){
        return NextResponse.redirect(new URL('/login', req.url))
    }

    // Blocked users cannot access housemate detail pages
    if(pathname.startsWith('/housemates/') && user?.is_blocked){
        return NextResponse.redirect(new URL('/profile', req.url))
    }

    // Protected HouseMate Path
    // Viewing a specific housemate's profile requires the visitor to be
    // verified themselves (not pending/unverified)
    const isVerified = user?.verification_status
    const completedOnboarding = user?.is_onboarded
    if(pathname.startsWith('/housemates/') && (!isVerified || isVerified === 'pending')){
        return NextResponse.redirect(new URL('/housemates', req.url))
    }

    return NextResponse.next()

}

// Limits this middleware to only run on the routes it actually guards
export const config = {
    matcher : ['/housemates/:path*', '/profile', '/admin/:path*']
}


