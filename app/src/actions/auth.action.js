'use server';
import { signIn } from '@/auth';

// Server Action triggered by the "Sign in with Google" button. Starts the
// NextAuth Google OAuth flow; on success the user lands on /post-login,
// which routes them based on onboarding/role status.
export async function googleSignIn() {
  await signIn('google', { redirectTo: '/post-login' });
}
