export const dynamic =  'force-dynamic'

import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import LoginForm from '@/components/auth/LoginForm';


export const metadata = {
  title: 'Sign In | WiyoRent',
  description: 'Sign in to your WiyoRent account',
};

export default async function LoginPage({searchParams }) {
  const session = await auth();
  const params = await searchParams 

  const callbackUrl = params?.callbackUrl || '/listings'

  if (session?.user) {
    if(!session?.is_onboarded){
      redirect('/profile');
    }
    redirect('/listings');
  }

  return <LoginForm callbackUrl = {callbackUrl} />;
}
