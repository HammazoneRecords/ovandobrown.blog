'use client';
// Firebase auth removed. Blog is public — no auth required.
export function useAuth() {
  return {
    user: null,
    isLoading: false,
    isAuthLoading: false,
    handleGoogleSignIn: async () => {},
    handleEmailSignUp: async (_e: string, _p: string) => {},
    handleEmailSignIn: async (_e: string, _p: string) => {},
    handleSignOut: async () => {},
  };
}
