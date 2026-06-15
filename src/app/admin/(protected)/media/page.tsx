import { AdminMediaManager } from '@/components/admin/AdminMediaManager';
import { listMedia } from '@/lib/cms';

export default async function AdminMediaPage() {
  const media = await listMedia();

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Media library</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Upload images, PDFs, and CV files. Copy `/api/media/...` URLs into CMS fields.
        </p>
      </div>
      <AdminMediaManager media={media} />
    </div>
  );
}
