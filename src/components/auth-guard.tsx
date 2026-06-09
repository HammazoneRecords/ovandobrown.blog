'use client';
// Auth guard removed — blog is public.
export function AuthGuard({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
