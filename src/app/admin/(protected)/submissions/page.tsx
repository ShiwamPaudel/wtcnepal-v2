import { AdminSubmissionsManager } from '@/components/admin/AdminSubmissionsManager';
import { listFormSubmissions } from '@/lib/cms';

export default async function AdminSubmissionsPage() {
  const submissions = await listFormSubmissions();

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Submissions</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Track contact enquiries and brochure requests received from public website forms.
        </p>
      </div>
      <AdminSubmissionsManager submissions={submissions} />
    </div>
  );
}
