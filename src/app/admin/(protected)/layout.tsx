import { redirect } from 'next/navigation';
import { AdminShell } from '@/components/admin/AdminShell';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }

  return <AdminShell>{children}</AdminShell>;
}
