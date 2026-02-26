import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware (req){
    const session = await auth()
    const user = session?.user
    const {pathname} = req.nextUrl

    // Protected Admin Paths -- NOT ADMIN
    const adminProtectRoutes = ['/admin']
    const role = user?.role
    const isAdminRoute = adminProtectRoutes.some(path => pathname.startsWith(path))

    if(isAdminRoute && role !== 'admin'){
        return NextResponse.redirect(new URL('/login', req.url))
    }

    // Protected User Paths --- NOT LOGIN
    const protectedUserPaths = ['/housemates', '/profile']
    const isProtectedUserPath = protectedUserPaths.some(path => pathname.startsWith(path))

    if(isProtectedUserPath && !user){
        return NextResponse.redirect(new URL('/login', req.url))
    }

    // Protected HouseMate Path
    const isVerified = user?.is_verified
    const completedOnboarding = user?.is_onboarded
    if(pathname.startsWith('/housemates/') && !isVerified){
        return NextResponse.redirect(new URL('/housemates', req.url))
    }

    return NextResponse.next()

}

export const config = {
    match : ['/', '/housemates/:path*', '/profile', '/admin/:path*']
}


