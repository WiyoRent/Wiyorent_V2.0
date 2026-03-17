import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function PostLoginPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');
  if (session.user.is_onboarded) redirect('/listings');
  redirect('/profile');
}
