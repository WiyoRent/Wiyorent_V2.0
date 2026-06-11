export const dynamic =  'force-dynamic'

import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Sign In | WiyoRent',
  description: 'Sign in to your WiyoRent account',
};

export default async function LoginPage() {
  const session = await auth();

  // If already logged in, send the user onward instead of showing the login
  // form again: incomplete profiles go to /profile to finish onboarding,
  // everyone else goes straight to /listings.
  if (session?.user) {
    if(!session?.is_onboarded){
      redirect('/profile');
    }
    redirect('/listings');
  }

  return <LoginForm />;
}
