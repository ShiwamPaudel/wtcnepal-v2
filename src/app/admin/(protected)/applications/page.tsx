import { AdminApplicationsManager } from '@/components/admin/AdminApplicationsManager';
import { listCareerApplications } from '@/lib/cms';

export default async function AdminApplicationsPage() {
  const applications = await listCareerApplications();

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Applications</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Review career applicants, open CV files, update hiring status, or permanently delete records.
        </p>
      </div>
      <AdminApplicationsManager applications={applications} />
    </div>
  );
}
