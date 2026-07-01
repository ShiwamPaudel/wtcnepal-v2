'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save } from 'lucide-react';
import type { CmsCollection } from '@/lib/cms';
import { divisions } from '@/data/divisions';

type Editable = Record<string, unknown>;

function asString(value: unknown) {
  return String(value ?? '');
}

function lineList(value: unknown) {
  return Array.isArray(value) ? value.join('\n') : asString(value);
}

function cleanMultiline(value: unknown) {
  return asString(value)
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
    .join('\n');
}

function countArticleParagraphs(value: unknown) {
  return asString(value)
    .split('\n\n')
    .map((block) => block.trim())
    .filter((block) => block && !block.toLowerCase().startsWith('[image:')).length;
}

async function readJsonResponse(response: Response) {
  try {
    return await response.json();
  } catch {
    return { message: response.ok ? '' : 'Request failed without a JSON response.' };
  }
}

function serialize(collection: CmsCollection, formData: FormData) {
  const base = Object.fromEntries(formData.entries()) as Editable;
  delete base.imageFile;
  delete base.imageFiles;
  delete base.contentImageFiles;
  delete base.contentImageParagraph;
  delete base.directorImageFile;

  if (collection === 'products') {
    const galleryImages = asString(base.images)
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
    const primaryImage = asString(base.image).trim();
    const images = [primaryImage, ...galleryImages]
      .filter(Boolean)
      .filter((image, index, list) => list.indexOf(image) === index);

    return {
      ...base,
      images,
      sortOrder: Number(base.sortOrder || 0),
      categorySortOrder: Number(base.categorySortOrder || 0),
      featured: formData.get('featured') === 'on',
      published: formData.get('published') === 'on',
    };
  }

  if (collection === 'news') {
    const title = asString(base.title).trim();
    const slug = asString(base.slug).trim();

    return {
      ...base,
      slug,
      title,
      excerpt: asString(base.excerpt).trim(),
      content: asString(base.content).trim(),
      contentImages: cleanMultiline(base.contentImages),
      date: asString(base.date) || new Date().toISOString().slice(0, 10),
      readingTime: Number(base.readingTime || 4),
      division: asString(base.division) || 'general',
      image: asString(base.image).trim(),
      author: asString(base.author).trim() || 'Web Trading Concern Pvt. Ltd. Editorial Team',
      published: formData.get('published') === 'on',
    };
  }

  if (collection === 'home-banners') {
    return {
      ...base,
      sortOrder: Number(base.sortOrder || 0),
      published: formData.get('published') === 'on',
    };
  }

  if (collection === 'jobs') {
    return {
      ...base,
      responsibilities: asString(base.responsibilities).split('\n').map((item) => item.trim()).filter(Boolean),
      requirements: asString(base.requirements).split('\n').map((item) => item.trim()).filter(Boolean),
      published: formData.get('published') === 'on',
    };
  }

  return {
    ...base,
    published: formData.get('published') === 'on',
  };
}

export function AdminItemForm({
  collection,
  item,
  mode,
}: {
  collection: CmsCollection;
  item: Editable;
  mode: 'create' | 'edit';
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage('');

    const formData = new FormData(event.currentTarget);
    const imageFile = formData.get('imageFile');

    if (
      (collection === 'products' ||
        collection === 'news' ||
        collection === 'team' ||
        collection === 'home-banners' ||
        collection === 'page-assets') &&
      imageFile instanceof File &&
      imageFile.size > 0
    ) {
      const mediaData = new FormData();
      mediaData.set('file', imageFile);

      const mediaResponse = await fetch('/api/admin/media', {
        method: 'POST',
        body: mediaData,
      });
      const mediaResult = await readJsonResponse(mediaResponse);

      if (!mediaResponse.ok) {
        setMessage(mediaResult.message ?? 'Image upload failed.');
        setBusy(false);
        return;
      }

      formData.set('image', mediaResult.url);
    }

    if (collection === 'products') {
      const imageFiles = formData
        .getAll('imageFiles')
        .filter((file): file is File => file instanceof File && file.size > 0);

      if (imageFiles.length > 0) {
        const existingImages = asString(formData.get('images'))
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean);
        const uploadedImages: string[] = [];

        for (const file of imageFiles) {
          const mediaData = new FormData();
          mediaData.set('file', file);

          const mediaResponse = await fetch('/api/admin/media', {
            method: 'POST',
            body: mediaData,
          });
          const mediaResult = await readJsonResponse(mediaResponse);

          if (!mediaResponse.ok) {
            setMessage(mediaResult.message ?? 'Product gallery image upload failed.');
            setBusy(false);
            return;
          }

          uploadedImages.push(mediaResult.url);
        }

        formData.set('images', [...existingImages, ...uploadedImages].join('\n'));
      }
    }

    if (collection === 'news') {
      const contentImageFiles = formData
        .getAll('contentImageFiles')
        .filter((file): file is File => file instanceof File && file.size > 0);

      if (contentImageFiles.length > 0) {
        const existingContentImages = asString(formData.get('contentImages'))
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean);
        const requestedParagraph = Number(formData.get('contentImageParagraph') || 0);
        const paragraphCount = countArticleParagraphs(formData.get('content'));
        const finalParagraph = Math.max(paragraphCount, 1);
        const paragraphNumber = requestedParagraph > 0 ? Math.min(requestedParagraph, finalParagraph) : finalParagraph;
        const uploadedContentImages: string[] = [];

        for (const file of contentImageFiles) {
          const mediaData = new FormData();
          mediaData.set('file', file);

          const mediaResponse = await fetch('/api/admin/media', {
            method: 'POST',
            body: mediaData,
          });
          const mediaResult = await readJsonResponse(mediaResponse);

          if (!mediaResponse.ok) {
            setMessage(mediaResult.message ?? 'News detail image upload failed.');
            setBusy(false);
            return;
          }

          uploadedContentImages.push(
            `${paragraphNumber} | ${mediaResult.url} | ${file.name.replace(/\.[^.]+$/, '')}`,
          );
        }

        formData.set('contentImages', [...existingContentImages, ...uploadedContentImages].join('\n'));
      }
    }

    const directorImageFile = formData.get('directorImageFile');
    if (collection === 'about-page' && directorImageFile instanceof File && directorImageFile.size > 0) {
      const mediaData = new FormData();
      mediaData.set('file', directorImageFile);

      const mediaResponse = await fetch('/api/admin/media', {
        method: 'POST',
        body: mediaData,
      });
      const mediaResult = await readJsonResponse(mediaResponse);

      if (!mediaResponse.ok) {
        setMessage(mediaResult.message ?? 'Director image upload failed.');
        setBusy(false);
        return;
      }

      formData.set('directorImage', mediaResult.url);
    }

    const response = await fetch('/api/admin/cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collection, item: serialize(collection, formData) }),
    });
    const result = await readJsonResponse(response);

    if (!response.ok) {
      setMessage(result.message ?? 'Save failed.');
      setBusy(false);
      return;
    }

    router.push(`/admin/content/${collection}`);
    router.refresh();
  }

  return (
    <form onSubmit={save} className="grid gap-6">
      {mode === 'edit' && <input type="hidden" name="id" value={asString(item.id)} />}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5">
          <Field name="id" label="ID" value={item.id} helper="Leave empty to auto-generate from the title/name." disabled={mode === 'edit'} />
          {collection === 'products' && <ProductFields item={item} />}
          {collection === 'news' && <NewsFields item={item} />}
          {collection === 'team' && <TeamFields item={item} />}
          {collection === 'jobs' && <JobFields item={item} />}
          {collection === 'home-banners' && <HomeBannerFields item={item} />}
          {collection === 'page-assets' && <PageAssetFields item={item} />}
          {collection === 'about-page' && <AboutPageFields item={item} />}
        </div>
      </section>

      <section className="sticky bottom-5 z-10 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.14)] backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Check name="published" label="Published on website" value={item.published !== false} />
          <button
            type="submit"
            disabled={busy}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-[var(--color-primary)] disabled:bg-slate-300"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save {mode === 'create' ? 'record' : 'changes'}
          </button>
        </div>
        {message && <p className="mt-3 text-sm font-semibold text-red-700">{message}</p>}
      </section>
    </form>
  );
}

function ProductFields({ item }: { item: Editable }) {
  const initialDivision = asString(item.division) || 'diagnostics';
  const [selectedDivision, setSelectedDivision] = useState(initialDivision);
  const [selectedCategory, setSelectedCategory] = useState(asString(item.category));
  const categoryOptions = divisions.find((division) => division.id === selectedDivision)?.categories ?? [];

  return (
    <>
      <Field name="name" label="Product name" value={item.name} required />
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Division</span>
        <select
          name="division"
          value={selectedDivision}
          onChange={(event) => {
            setSelectedDivision(event.target.value);
            setSelectedCategory('');
          }}
          className="admin-input bg-white"
        >
          {divisions.map((division) => (
            <option key={division.id} value={division.id}>
              {division.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Category</span>
        <select
          name="category"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="admin-input bg-white"
        >
          <option value="">Select a category</option>
          {categoryOptions.map((category) => (
            <option key={`${category.name}-${category.partner}`} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <span className="mt-1 block text-xs text-slate-500">
          Categories update automatically when the product division changes.
        </span>
      </label>
      <Field name="partner" label="Partner" value={item.partner} required />
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          name="sortOrder"
          label="Product page order"
          value={item.sortOrder ?? 0}
          type="number"
          helper="Lower numbers appear first on /products and general product sections."
        />
        <Field
          name="categorySortOrder"
          label="Category order"
          value={item.categorySortOrder ?? 0}
          type="number"
          helper="Lower numbers appear first when a product category is selected."
        />
      </div>
      <Textarea
        name="description"
        label="Description"
        value={item.description}
        helper="Formatting: blank line for a new paragraph, single line break for a new line, **bold text**, *italic text*, and lines starting with - for bullets."
        required
      />
      <ProductImageField value={item.image} images={item.images} />
      <Field name="brochure" label="Brochure URL" value={item.brochure} />
      <Check name="featured" label="Featured on homepage" value={item.featured} />
    </>
  );
}

function ProductImageField({ value, images }: { value: unknown; images: unknown }) {
  const currentImage = asString(value);
  const galleryImages = Array.isArray(images) ? images.map(asString).filter(Boolean) : [];
  const galleryText = galleryImages.join('\n');

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
          {currentImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentImage} alt="" className="h-full w-full object-contain" />
          ) : (
            <span className="px-3 text-center text-xs font-semibold text-slate-400">No image</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Product image</span>
            <input
              name="imageFile"
              type="file"
              accept="image/*"
              className="mt-2 block w-full rounded-xl border border-slate-200 bg-white p-3 text-sm"
            />
          </label>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Upload a product image from your computer. The CMS uses it on the website automatically.
          </p>
          {currentImage && <input type="hidden" name="image" value={currentImage} />}
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Additional product images</span>
          <input
            name="imageFiles"
            type="file"
            accept="image/*"
            multiple
            className="mt-2 block w-full rounded-xl border border-slate-200 bg-white p-3 text-sm"
          />
          <span className="mt-2 block text-xs leading-5 text-slate-500">
            Upload multiple images for the product detail carousel.
          </span>
        </label>
        <Textarea
          name="images"
          label="Gallery image URLs"
          value={galleryText}
          rows={5}
          helper="One image URL per line. The primary product image is included automatically."
        />
      </div>
    </div>
  );
}

function NewsFields({ item }: { item: Editable }) {
  return (
    <>
      <Field name="slug" label="Slug" value={item.slug} helper="Used in /news-and-events/slug. Leave empty to use the title." />
      <Field name="title" label="Title" value={item.title} required />
      <Textarea name="excerpt" label="Excerpt" value={item.excerpt} rows={3} required />
      <Textarea
        name="content"
        label="Article content"
        value={item.content}
        rows={12}
        helper="Separate paragraphs with a blank line. To place a photo between paragraphs, add a line like [image: /api/media/id | Alt text | Optional caption]."
        required
      />
      <Textarea
        name="contentImages"
        label="Detail page photos"
        value={item.contentImages}
        rows={4}
        helper="Optional: one per line as paragraph number | image URL | alt text | caption. Example: 2 | /api/media/id | Product demo | Training session."
      />
      <NewsDetailImagesField />
      <div className="grid gap-5 md:grid-cols-2">
        <Field name="date" label="Date" value={item.date} type="date" required />
        <Field name="readingTime" label="Reading time" value={item.readingTime ?? 4} type="number" required />
      </div>
      <Select name="division" label="Division" value={item.division} options={['general', 'diagnostics', 'disinfection', 'care']} />
      <ContentImageField
        value={item.image}
        label="News image"
        emptyLabel="No image"
        helper="Upload the news image here. The CMS uses it on news pages automatically."
      />
      <Field name="author" label="Author" value={item.author ?? 'Web Trading Concern Pvt. Ltd. Editorial Team'} />
    </>
  );
}

function NewsDetailImagesField() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_180px]">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Upload detail page photos</span>
          <input
            name="contentImageFiles"
            type="file"
            accept="image/*"
            multiple
            className="mt-2 block w-full rounded-xl border border-slate-200 bg-white p-3 text-sm"
          />
          <span className="mt-2 block text-xs leading-5 text-slate-500">
            Selected photos are added to the detail page photo list when this article is saved.
          </span>
        </label>
        <Field
          name="contentImageParagraph"
          label="After paragraph"
          value=""
          type="number"
          helper="Leave empty to place uploaded photos after the final paragraph."
        />
      </div>
    </div>
  );
}

function TeamFields({ item }: { item: Editable }) {
  return (
    <>
      <PersonImageField value={item.image} />
      <Field name="sortOrder" label="Display order" value={item.sortOrder ?? 0} type="number" helper="Lower numbers appear first on the team page." />
      <Field name="name" label="Full name" value={item.name} required />
      <Field name="title" label="Role/title" value={item.title} required />
      <Textarea name="bio" label="Bio" value={item.bio} />
      <Field name="email" label="Email" value={item.email} type="email" />
    </>
  );
}

function PersonImageField({ value }: { value: unknown }) {
  const currentImage = asString(value);

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white">
          {currentImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentImage} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="px-3 text-center text-xs font-semibold text-slate-400">No photo</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Profile photo</span>
            <input
              name="imageFile"
              type="file"
              accept="image/*"
              className="mt-2 block w-full rounded-xl border border-slate-200 bg-white p-3 text-sm"
            />
          </label>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Upload a team member photo. The CMS shows it on the team page.
          </p>
          {currentImage && <input type="hidden" name="image" value={currentImage} />}
        </div>
      </div>
    </div>
  );
}

function JobFields({ item }: { item: Editable }) {
  return (
    <>
      <Field name="title" label="Job title" value={item.title} required />
      <Field name="department" label="Department" value={item.department} required />
      <div className="grid gap-5 md:grid-cols-2">
        <Field name="location" label="Location" value={item.location} required />
        <Field name="type" label="Type" value={item.type ?? 'Full-time'} required />
      </div>
      <Textarea name="summary" label="Summary" value={item.summary} required />
      <Textarea name="responsibilities" label="Responsibilities, one per line" value={lineList(item.responsibilities)} rows={6} />
      <Textarea name="requirements" label="Requirements, one per line" value={lineList(item.requirements)} rows={6} />
    </>
  );
}

function HomeBannerFields({ item }: { item: Editable }) {
  return (
    <>
      <Field name="title" label="Internal title" value={item.title} required />
      <ContentImageField
        value={item.image}
        label="Banner image"
        emptyLabel="No banner"
        helper="Upload a full-width home banner. The landing page rotates through published banners."
      />
      <Field name="alt" label="Image alt text" value={item.alt} required />
      <Field name="sortOrder" label="Display order" value={item.sortOrder ?? 0} type="number" />
    </>
  );
}

function PageAssetFields({ item }: { item: Editable }) {
  return (
    <>
      <Field
        name="title"
        label="Internal title"
        value={item.title}
        helper="For the team page hero, use ID: team-hero."
        required
      />
      <ContentImageField
        value={item.image}
        label="Page image"
        emptyLabel="No page image"
        helper="Upload the page image. For /team, create or edit the page asset with ID team-hero."
      />
      <Field name="alt" label="Image alt text" value={item.alt} required />
    </>
  );
}

function AboutPageFields({ item }: { item: Editable }) {
  return (
    <>
      <Field name="missionTitle" label="Mission title" value={item.missionTitle} required />
      <Textarea name="mission" label="Mission" value={item.mission} rows={5} required />
      <Field name="visionTitle" label="Vision title" value={item.visionTitle} required />
      <Textarea name="vision" label="Vision" value={item.vision} rows={5} required />
      <Field name="goalsTitle" label="Goals title" value={item.goalsTitle} required />
      <Textarea name="goals" label="Goals" value={item.goals} rows={5} required />
      <div className="grid gap-5 md:grid-cols-2">
        <Field name="directorName" label="Director name" value={item.directorName} />
        <Field name="directorTitle" label="Director title" value={item.directorTitle} />
      </div>
      <ContentImageField
        value={item.directorImage}
        fieldName="directorImage"
        fileFieldName="directorImageFile"
        label="Director photo"
        emptyLabel="No director photo"
        helper="Upload the director photo used in the Director's Message section."
      />
      <Field name="directorImageAlt" label="Director photo alt text" value={item.directorImageAlt} />
      <Textarea name="directorMessage" label="Director message" value={item.directorMessage} rows={8} required />
    </>
  );
}

function ContentImageField({
  value,
  fieldName = 'image',
  fileFieldName = 'imageFile',
  label,
  emptyLabel,
  helper,
}: {
  value: unknown;
  fieldName?: string;
  fileFieldName?: string;
  label: string;
  emptyLabel: string;
  helper: string;
}) {
  const currentImage = asString(value);

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex h-32 w-44 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
          {currentImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentImage} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="px-3 text-center text-xs font-semibold text-slate-400">{emptyLabel}</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">{label}</span>
            <input
              name={fileFieldName}
              type="file"
              accept="image/*"
              className="mt-2 block w-full rounded-xl border border-slate-200 bg-white p-3 text-sm"
            />
          </label>
          <p className="mt-2 text-xs leading-5 text-slate-500">{helper}</p>
          {currentImage && <input type="hidden" name={fieldName} value={currentImage} />}
        </div>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  value,
  type = 'text',
  required = false,
  disabled = false,
  helper,
}: {
  name: string;
  label: string;
  value: unknown;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  helper?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        defaultValue={asString(value)}
        className="admin-input disabled:bg-slate-100 disabled:text-slate-500"
      />
      {helper && <span className="mt-1 block text-xs text-slate-500">{helper}</span>}
    </label>
  );
}

function Textarea({
  name,
  label,
  value,
  rows = 4,
  required = false,
  helper,
}: {
  name: string;
  label: string;
  value: unknown;
  rows?: number;
  required?: boolean;
  helper?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <textarea name={name} required={required} rows={rows} defaultValue={asString(value)} className="admin-textarea" />
      {helper && <span className="mt-1 block text-xs text-slate-500">{helper}</span>}
    </label>
  );
}

function Select({ name, label, value, options }: { name: string; label: string; value: unknown; options: string[] }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <select name={name} defaultValue={asString(value) || options[0]} className="admin-input bg-white">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Check({ name, label, value }: { name: string; label: string; value: unknown }) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
      <input name={name} type="checkbox" defaultChecked={Boolean(value)} className="h-4 w-4" />
      {label}
    </label>
  );
}
