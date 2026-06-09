import { adminLogin } from '../actions';

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm p-8 rounded-2xl border border-border bg-card shadow-xl">
        <h1 className="text-2xl font-bold mb-1">Admin</h1>
        <p className="text-sm text-muted-foreground mb-6">ovandobrown.blog</p>

        {searchParams.error && (
          <p className="text-sm text-red-500 mb-4">Wrong password.</p>
        )}

        <form action={adminLogin} className="space-y-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoFocus
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
