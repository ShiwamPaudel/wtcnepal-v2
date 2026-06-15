import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { isAdminAuthenticated, isAdminLoginConfigured } from '@/lib/admin-auth';

export const metadata: Metadata = {
  title: 'Admin Login | WTC Nepal',
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect('/admin');
  }

  const loginConfigured = await isAdminLoginConfigured();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f8fb] p-5">
      <div className="w-full max-w-md">
        <AdminLoginForm loginConfigured={loginConfigured} />
      </div>
    </main>
  );
}
