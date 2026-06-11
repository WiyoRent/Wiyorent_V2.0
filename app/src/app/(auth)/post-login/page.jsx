export const dynamic =  'force-dynamic'

import { auth } from '@/auth';
import { redirect } from 'next/navigation';

// Landing spot after Google OAuth completes. Renders nothing - it only decides
// where to send the user next, preserving an optional `?redirect=` target
// (e.g. the page they tried to visit before being asked to log in):
// - not signed in (shouldn't normally happen here) -> back to /login
// - signed in but hasn't finished onboarding -> /profile to complete it
// - fully onboarded -> the original redirect target, or /listings by default
export default async function PostLoginPage({ searchParams }) {
  const session = await auth();

  // read the original destination the user was trying to reach
  const params = await searchParams;
  const callbackUrl = params.callbackUrl || 'listings'

  if (!session?.user) {
    redirect(`/login`);
  }

  // only enforce onboarding for routes that genuinely need a complete profile
  const requiresOnboarding = ['/housemates'].some(
    path => callbackUrl.startsWith(path)
  )

  if (!session.user.is_onboarded && requiresOnboarding) {
    redirect(`/profile`)
  }

  // Send them back to where they originally wanted to go
  redirect(callbackUrl);
}