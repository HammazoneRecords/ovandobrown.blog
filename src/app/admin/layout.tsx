import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const session = jar.get('ob_session')?.value;

  if (session !== process.env.ADMIN_SESSION_TOKEN) {
    redirect('/admin/login');
  }

  return <>{children}</>;
}
