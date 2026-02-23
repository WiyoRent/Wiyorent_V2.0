import { redirect } from 'next/navigation';
import { auth, signIn } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';


export const metadata = {
  title: 'Sign In | WiyoRent',
  description: 'Sign in to your WiyoRent account',
};

export default async function LoginPage() {
  const session = await auth();

  // If already logged in, redirect to dashboard
  if (session?.user) {
    redirect('/listings');
  }

  return <LoginForm />;
}



function LoginForm() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-base-100 rounded-box shadow-2xl p-8 sm:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 relative">
              <Image
                src="/logo.svg"
                alt="WiyoRent Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h1 className="font-primary text-3xl sm:text-4xl font-extrabold text-base-content uppercase tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="font-secondary text-base-content/60 text-sm">
              Sign in to access your WiyoRent account
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-base-300" />
            <span className="font-secondary text-xs text-base-content/40 uppercase tracking-wide">
              Sign in with
            </span>
            <div className="flex-1 h-px bg-base-300" />
          </div>

          {/* Google Sign In Form */}
          <form
            action={async () => {
              'use server';
              await signIn('google', { redirectTo: '/profile' });
            }}
          >
            <button
              type="submit"
              className="btn btn-outline w-full rounded-field font-secondary font-semibold text-base gap-3 h-12 hover:bg-base-200 border-base-300 hover:border-primary transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </form>

          {/* Info Note */}
          <div className="mt-8 pt-6 border-t border-base-200">
            <p className="font-secondary text-xs text-base-content/40 text-center leading-relaxed">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-accent hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="font-secondary text-sm text-base-content/50">
              Need help?{' '}
              <Link href="/support" className="text-accent hover:underline font-semibold">
                Contact Support
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Accent Decoration */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm px-4 py-2 rounded-field border border-accent/20">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="font-secondary text-xs font-semibold text-accent uppercase tracking-wide">
              Student Housing Made Simple
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

