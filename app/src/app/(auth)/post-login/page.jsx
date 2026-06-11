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

  const { redirect: redirectTo } = await searchParams;

  if (!session?.user) {
    redirect(redirectTo ? `/login?redirect=${redirectTo}` : '/login');
  }

  if (!session.user.is_onboarded) {
    redirect(redirectTo ? `/profile?redirect=${redirectTo}` : '/profile');
  }

  redirect(redirectTo || '/listings');
}