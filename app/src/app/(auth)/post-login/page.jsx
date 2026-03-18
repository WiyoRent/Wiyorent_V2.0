export const dynamic =  'force-dynamic'

import { auth } from '@/auth';
import { redirect } from 'next/navigation';

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