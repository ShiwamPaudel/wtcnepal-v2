import 'server-only';

import { randomUUID } from 'crypto';
import type { NewsArticle } from '@/data/news';
import { newsArticles } from '@/data/news';
import type { Product } from '@/data/products';
import { products } from '@/data/products';
import type { TeamMember } from '@/data/team';
import { team } from '@/data/team';
import type { JobOpening } from '@/data/jobs';
import { jobs } from '@/data/jobs';
import { getTursoClient, isTursoConfigured } from '@/lib/turso';

export type CmsCollection =
  | 'products'
  | 'news'
  | 'team'
  | 'jobs'
  | 'home-banners'
  | 'page-assets'
  | 'about-page';

export type HomeBanner = {
  id: string;
  title: string;
  image: string;
  alt: string;
  sortOrder?: number;
  published?: boolean;
};

export type PageAsset = {
  id: string;
  title: string;
  image: string;
  alt: string;
  published?: boolean;
};

export type AboutPageContent = {
  id: string;
  missionTitle: string;
  mission: string;
  visionTitle: string;
  vision: string;
  goalsTitle: string;
  goals: string;
  directorName: string;
  directorTitle: string;
  directorMessage: string;
  directorImage: string;
  directorImageAlt: string;
  published?: boolean;
};

export type CmsContent = {
  products: Product[];
  news: NewsArticle[];
  team: TeamMember[];
  jobs: JobOpening[];
  'home-banners': HomeBanner[];
  'page-assets': PageAsset[];
  'about-page': AboutPageContent[];
};

export type CmsItemRecord<T = Record<string, unknown>> = {
  collection: CmsCollection;
  id: string;
  data: T;
  status: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type CmsMedia = {
  id: string;
  filename: string;
  contentType: string;
  size: number;
  storedSize: number;
  dataType: string;
  isCorrupt: boolean;
  createdAt: string;
};

export type CareerApplication = {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  coverNote: string;
  cvMediaId: string;
  cvFilename: string;
  status: string;
  createdAt: string;
};

export type FormSubmissionType = 'contact' | 'brochure';

export type FormSubmission = {
  id: string;
  type: FormSubmissionType;
  sourcePath: string;
  productId: string;
  productName: string;
  brochureUrl: string;
  name: string;
  email: string;
  phone: string;
  institution: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const fallbackContent: CmsContent = {
  products,
  news: [...newsArticles].sort((a, b) => b.date.localeCompare(a.date)),
  team,
  jobs,
  'home-banners': [
    {
      id: 'home-banner-1',
      title: 'Home banner',
      image: '/home-banners/hb-1.png',
      alt: 'WTC Nepal home banner',
      sortOrder: 0,
      published: true,
    },
  ],
  'page-assets': [
    {
      id: 'team-hero',
      title: 'Team hero photo',
      image: '',
      alt: 'WTC Nepal team',
      published: true,
    },
  ],
  'about-page': [
    {
      id: 'about-page',
      missionTitle: 'Raise equipment reliability',
      mission:
        'Our mission is to help healthcare facilities access appropriate medical technology and keep it running through dependable technical support and clear user training.',
      visionTitle: "Be Nepal's trusted partner",
      vision:
        'We aim to be the healthcare technology partner institutions can rely on for product selection, implementation, uptime, and long-term lifecycle support.',
      goalsTitle: 'Deliver measurable support',
      goals:
        'Strengthen service coverage, expand product training, improve response times, and keep dependable healthcare technology accessible across Nepal.',
      directorName: 'Director',
      directorTitle: 'Web Trading Concern Pvt. Ltd.',
      directorMessage:
        'WTC Nepal continues to grow with a service-first commitment: reliable products, responsive support, and long-term partnership with healthcare teams across the country.',
      directorImage: '',
      directorImageAlt: 'WTC Nepal director',
      published: true,
    },
  ],
};

const collectionFallbacks: Record<CmsCollection, unknown[]> = {
  products: fallbackContent.products,
  news: fallbackContent.news,
  team: fallbackContent.team,
  jobs: fallbackContent.jobs,
  'home-banners': fallbackContent['home-banners'],
  'page-assets': fallbackContent['page-assets'],
  'about-page': fallbackContent['about-page'],
};

function nowIso() {
  return new Date().toISOString();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseRow<T>(value: unknown): T | null {
  if (typeof value !== 'string') return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

async function ensureCmsItemsUpsertConstraint(db: NonNullable<ReturnType<typeof getTursoClient>>) {
  await db.execute(
    `DELETE FROM cms_items
      WHERE rowid IN (
        SELECT rowid
        FROM (
          SELECT
            rowid,
            ROW_NUMBER() OVER (
              PARTITION BY collection, id
              ORDER BY updated_at DESC, created_at DESC, rowid DESC
            ) AS duplicate_rank
          FROM cms_items
        )
        WHERE duplicate_rank > 1
      )`,
  );

  await db.execute(
    'CREATE UNIQUE INDEX IF NOT EXISTS idx_cms_items_collection_id ON cms_items(collection, id)',
  );
}

export async function ensureCmsSchema() {
  const db = getTursoClient();
  if (!db) return false;

  await db.batch(
    [
      `CREATE TABLE IF NOT EXISTS cms_items (
        collection TEXT NOT NULL,
        id TEXT NOT NULL,
        data TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'published',
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        PRIMARY KEY (collection, id)
      )`,
      `CREATE TABLE IF NOT EXISTS cms_media (
        id TEXT PRIMARY KEY,
        filename TEXT NOT NULL,
        content_type TEXT NOT NULL,
        size INTEGER NOT NULL,
        data BLOB NOT NULL,
        created_at TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS career_applications (
        id TEXT PRIMARY KEY,
        job_id TEXT NOT NULL,
        job_title TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        cover_note TEXT NOT NULL,
        cv_media_id TEXT NOT NULL,
        cv_filename TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS form_submissions (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        source_path TEXT NOT NULL,
        product_id TEXT NOT NULL DEFAULT '',
        product_name TEXT NOT NULL DEFAULT '',
        brochure_url TEXT NOT NULL DEFAULT '',
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        institution TEXT NOT NULL DEFAULT '',
        message TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT 'new',
        metadata TEXT NOT NULL DEFAULT '{}',
        ip_hash TEXT NOT NULL DEFAULT '',
        user_agent TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )`,
      'CREATE INDEX IF NOT EXISTS idx_form_submissions_type_created ON form_submissions(type, created_at)',
      'CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status)',
    ],
    'write',
  );

  await ensureCmsItemsUpsertConstraint(db);

  return true;
}

export async function seedCmsFromLocalContent() {
  const db = getTursoClient();
  if (!db) return false;

  await ensureCmsSchema();
  const createdAt = nowIso();
  const statements = Object.entries(collectionFallbacks).flatMap(([collection, items]) =>
    items.map((item, index) => {
      const record = item as { id?: string; slug?: string; title?: string; name?: string };
      const id = record.id || record.slug || slugify(record.title || record.name || randomUUID());

      return {
        sql: `INSERT OR IGNORE INTO cms_items
          (collection, id, data, status, sort_order, created_at, updated_at)
          VALUES (?, ?, ?, 'published', ?, ?, ?)`,
        args: [collection, id, JSON.stringify({ ...record, id }), index, createdAt, createdAt],
      };
    }),
  );

  if (statements.length > 0) {
    await db.batch(statements, 'write');
  }

  return true;
}

export async function getCmsCollection<T>(collection: CmsCollection, fallback: T[]): Promise<T[]> {
  const db = getTursoClient();
  if (!db) return fallback;

  try {
    await ensureCmsSchema();
    const result = await db.execute({
      sql: `SELECT data FROM cms_items
        WHERE collection = ? AND status = 'published'
        ORDER BY sort_order ASC, updated_at DESC`,
      args: [collection],
    });

    const rows = result.rows
      .map((row) => parseRow<T>(row.data))
      .filter((item): item is T => Boolean(item));

    return rows;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown CMS error.';
    console.warn(`CMS unavailable; using local ${collection} fallback. ${message}`);
    return fallback;
  }
}

export async function getPublishedProducts() {
  return getCmsCollection<Product>('products', fallbackContent.products);
}

export async function getPublishedNews() {
  const articles = await getCmsCollection<NewsArticle>('news', fallbackContent.news);
  return [...articles].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPublishedTeam() {
  return getCmsCollection<TeamMember>('team', fallbackContent.team);
}

export async function getPublishedJobs() {
  const openings = await getCmsCollection<JobOpening>('jobs', fallbackContent.jobs);
  return openings.filter((job) => job.published !== false);
}

export async function getPublishedHomeBanners() {
  const banners = await getCmsCollection<HomeBanner>('home-banners', fallbackContent['home-banners']);
  return [...banners]
    .filter((banner) => banner.published !== false && banner.image)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function getPublishedPageAsset(id: string) {
  const assets = await getCmsCollection<PageAsset>('page-assets', fallbackContent['page-assets']);
  return assets.find((asset) => asset.id === id && asset.published !== false);
}

export async function getPublishedAboutPageContent() {
  const records = await getCmsCollection<AboutPageContent>('about-page', fallbackContent['about-page']);
  return records.find((record) => record.id === 'about-page' && record.published !== false) ?? fallbackContent['about-page'][0];
}

export async function getAdminCmsContent(): Promise<CmsContent> {
  if (!isTursoConfigured()) return fallbackContent;

  const [cmsProducts, cmsNews, cmsTeam, cmsJobs, cmsHomeBanners, cmsPageAssets, cmsAboutPage] = await Promise.all([
    getAdminCmsCollection<Product>('products'),
    getAdminCmsCollection<NewsArticle>('news'),
    getAdminCmsCollection<TeamMember>('team'),
    getAdminCmsCollection<JobOpening>('jobs'),
    getAdminCmsCollection<HomeBanner>('home-banners'),
    getAdminCmsCollection<PageAsset>('page-assets'),
    getAdminCmsCollection<AboutPageContent>('about-page'),
  ]);

  return {
    products: cmsProducts.map((item) => item.data),
    news: cmsNews.map((item) => item.data),
    team: cmsTeam.map((item) => item.data),
    jobs: cmsJobs.map((item) => item.data),
    'home-banners': cmsHomeBanners.map((item) => item.data),
    'page-assets': cmsPageAssets.map((item) => item.data),
    'about-page': cmsAboutPage.map((item) => item.data),
  };
}

export async function getAdminCmsCollection<T = Record<string, unknown>>(
  collection: CmsCollection,
): Promise<CmsItemRecord<T>[]> {
  const db = getTursoClient();

  if (!db) {
    return (collectionFallbacks[collection] as T[]).map((item, index) => {
      const record = item as T & { id?: string; slug?: string };
      return {
        collection,
        id: record.id || record.slug || String(index + 1),
        data: record,
        status: 'local',
        sortOrder: index,
        createdAt: '',
        updatedAt: '',
      };
    });
  }

  await ensureCmsSchema();
  const result = await db.execute({
    sql: `SELECT collection, id, data, status, sort_order, created_at, updated_at
      FROM cms_items
      WHERE collection = ?
      ORDER BY sort_order ASC, updated_at DESC`,
    args: [collection],
  });

  const records: CmsItemRecord<T>[] = [];

  for (const row of result.rows) {
    const data = parseRow<T>(row.data);
    if (!data) continue;

    records.push({
      collection,
      id: String(row.id),
      data,
      status: String(row.status),
      sortOrder: Number(row.sort_order),
      createdAt: String(row.created_at),
      updatedAt: String(row.updated_at),
    });
  }

  return records;
}

export async function getAdminCmsItem<T = Record<string, unknown>>(
  collection: CmsCollection,
  id: string,
): Promise<CmsItemRecord<T> | null> {
  const records = await getAdminCmsCollection<T>(collection);
  return records.find((record) => record.id === id) ?? null;
}

export async function saveCmsItem(collection: CmsCollection, payload: Record<string, unknown>) {
  const db = getTursoClient();
  if (!db) throw new Error('CMS storage is not configured.');

  await ensureCmsSchema();

  const title = String(payload.title ?? payload.name ?? '');
  const id = String(payload.id || payload.slug || slugify(title) || randomUUID());
  const item = {
    ...payload,
    id,
    ...(collection === 'news' ? { slug: String(payload.slug || id) } : {}),
  };
  const updatedAt = nowIso();

  await db.execute({
    sql: `INSERT INTO cms_items
      (collection, id, data, status, sort_order, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(collection, id) DO UPDATE SET
        data = excluded.data,
        status = excluded.status,
        sort_order = excluded.sort_order,
        updated_at = excluded.updated_at`,
    args: [
      collection,
      id,
      JSON.stringify(item),
      payload.published === false ? 'draft' : 'published',
      Number(payload.sortOrder ?? 0),
      updatedAt,
      updatedAt,
    ],
  });

  return item;
}

export async function deleteCmsItem(collection: CmsCollection, id: string) {
  const db = getTursoClient();
  if (!db) throw new Error('CMS storage is not configured.');

  await ensureCmsSchema();
  await db.execute({
    sql: 'DELETE FROM cms_items WHERE collection = ? AND id = ?',
    args: [collection, id],
  });
}

export async function deleteMedia(id: string) {
  const db = getTursoClient();
  if (!db) throw new Error('CMS storage is not configured.');

  await ensureCmsSchema();
  await db.execute({
    sql: 'DELETE FROM cms_media WHERE id = ?',
    args: [id],
  });
}

export async function saveMedia(file: File, maxBytes = 5 * 1024 * 1024) {
  const db = getTursoClient();
  if (!db) throw new Error('CMS storage is not configured.');
  if (file.size > maxBytes) throw new Error(`File must be ${Math.floor(maxBytes / 1024 / 1024)}MB or smaller.`);

  await ensureCmsSchema();

  const id = randomUUID();
  const buffer = Buffer.from(await file.arrayBuffer());
  const createdAt = nowIso();

  await db.execute({
    sql: `INSERT INTO cms_media (id, filename, content_type, size, data, created_at)
      VALUES (?, ?, ?, ?, ?, ?)`,
    args: [id, file.name, file.type || 'application/octet-stream', file.size, buffer, createdAt],
  });

  return {
    id,
    filename: file.name,
    contentType: file.type || 'application/octet-stream',
    size: file.size,
    createdAt,
    url: `/api/media/${id}`,
  };
}

export async function getMedia(id: string) {
  const db = getTursoClient();
  if (!db) return null;

  await ensureCmsSchema();
  const result = await db.execute({
    sql: 'SELECT filename, content_type, size, data, typeof(data) AS data_type, length(data) AS stored_size, created_at FROM cms_media WHERE id = ?',
    args: [id],
  });
  const row = result.rows[0];
  if (!row) return null;

  const size = Number(row.size);
  const storedSize = Number(row.stored_size);
  const dataType = String(row.data_type);
  const isCorrupt = dataType !== 'blob' || storedSize !== size;

  return {
    filename: String(row.filename),
    contentType: String(row.content_type),
    size,
    storedSize,
    dataType,
    isCorrupt,
    data: row.data as ArrayBuffer | Buffer | Uint8Array,
    createdAt: String(row.created_at),
  };
}

export async function listMedia(): Promise<CmsMedia[]> {
  const db = getTursoClient();
  if (!db) return [];

  await ensureCmsSchema();
  const result = await db.execute(
    'SELECT id, filename, content_type, size, typeof(data) AS data_type, length(data) AS stored_size, created_at FROM cms_media ORDER BY created_at DESC LIMIT 100',
  );

  return result.rows.map((row) => ({
    id: String(row.id),
    filename: String(row.filename),
    contentType: String(row.content_type),
    size: Number(row.size),
    storedSize: Number(row.stored_size),
    dataType: String(row.data_type),
    isCorrupt: String(row.data_type) !== 'blob' || Number(row.stored_size) !== Number(row.size),
    createdAt: String(row.created_at),
  }));
}

export async function submitCareerApplication(input: {
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  coverNote: string;
  cvFile: File;
}) {
  const db = getTursoClient();
  if (!db) throw new Error('Applications are not available until CMS storage is configured.');

  await ensureCmsSchema();
  const cv = await saveMedia(input.cvFile, 6 * 1024 * 1024);
  const id = randomUUID();
  const createdAt = nowIso();

  await db.execute({
    sql: `INSERT INTO career_applications
      (id, job_id, job_title, name, email, phone, cover_note, cv_media_id, cv_filename, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)`,
    args: [
      id,
      input.jobId,
      input.jobTitle,
      input.name,
      input.email,
      input.phone,
      input.coverNote,
      cv.id,
      cv.filename,
      createdAt,
    ],
  });

  return id;
}

export async function listCareerApplications(): Promise<CareerApplication[]> {
  const db = getTursoClient();
  if (!db) return [];

  await ensureCmsSchema();
  const result = await db.execute(
    'SELECT * FROM career_applications ORDER BY created_at DESC LIMIT 200',
  );

  return result.rows.map((row) => ({
    id: String(row.id),
    jobId: String(row.job_id),
    jobTitle: String(row.job_title),
    name: String(row.name),
    email: String(row.email),
    phone: String(row.phone),
    coverNote: String(row.cover_note),
    cvMediaId: String(row.cv_media_id),
    cvFilename: String(row.cv_filename),
    status: String(row.status),
    createdAt: String(row.created_at),
  }));
}

export async function updateCareerApplicationStatus(id: string, status: string) {
  const db = getTursoClient();
  if (!db) throw new Error('CMS storage is not configured.');

  await ensureCmsSchema();
  await db.execute({
    sql: 'UPDATE career_applications SET status = ? WHERE id = ?',
    args: [status, id],
  });
}

export async function deleteCareerApplication(id: string) {
  const db = getTursoClient();
  if (!db) throw new Error('CMS storage is not configured.');

  await ensureCmsSchema();
  await db.execute({
    sql: 'DELETE FROM career_applications WHERE id = ?',
    args: [id],
  });
}

export async function submitContactSubmission(input: {
  sourcePath: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  ipHash: string;
  userAgent: string;
}) {
  const db = getTursoClient();
  if (!db) throw new Error('Contact enquiries are not available until CMS storage is configured.');

  await ensureCmsSchema();
  const id = randomUUID();
  const createdAt = nowIso();

  await db.execute({
    sql: `INSERT INTO form_submissions
      (id, type, source_path, name, email, phone, message, status, metadata, ip_hash, user_agent, created_at, updated_at)
      VALUES (?, 'contact', ?, ?, ?, ?, ?, 'new', '{}', ?, ?, ?, ?)`,
    args: [
      id,
      input.sourcePath,
      input.name,
      input.email,
      input.phone,
      input.message,
      input.ipHash,
      input.userAgent.slice(0, 500),
      createdAt,
      createdAt,
    ],
  });

  return id;
}

export async function submitBrochureRequest(input: {
  sourcePath: string;
  productId: string;
  productName: string;
  brochureUrl: string;
  name: string;
  institution: string;
  email: string;
  phone: string;
  ipHash: string;
  userAgent: string;
}) {
  const db = getTursoClient();
  if (!db) throw new Error('Brochure requests are not available until CMS storage is configured.');

  await ensureCmsSchema();
  const id = randomUUID();
  const createdAt = nowIso();

  await db.execute({
    sql: `INSERT INTO form_submissions
      (id, type, source_path, product_id, product_name, brochure_url, name, email, phone, institution, status, metadata, ip_hash, user_agent, created_at, updated_at)
      VALUES (?, 'brochure', ?, ?, ?, ?, ?, ?, ?, ?, 'new', '{}', ?, ?, ?, ?)`,
    args: [
      id,
      input.sourcePath,
      input.productId,
      input.productName,
      input.brochureUrl,
      input.name,
      input.email,
      input.phone,
      input.institution,
      input.ipHash,
      input.userAgent.slice(0, 500),
      createdAt,
      createdAt,
    ],
  });

  return id;
}

export async function listFormSubmissions(type?: FormSubmissionType): Promise<FormSubmission[]> {
  const db = getTursoClient();
  if (!db) return [];

  await ensureCmsSchema();
  const result = await db.execute({
    sql: `SELECT *
      FROM form_submissions
      ${type ? 'WHERE type = ?' : ''}
      ORDER BY created_at DESC
      LIMIT 300`,
    args: type ? [type] : [],
  });

  return result.rows.map((row) => ({
    id: String(row.id),
    type: String(row.type) as FormSubmissionType,
    sourcePath: String(row.source_path),
    productId: String(row.product_id),
    productName: String(row.product_name),
    brochureUrl: String(row.brochure_url),
    name: String(row.name),
    email: String(row.email),
    phone: String(row.phone),
    institution: String(row.institution),
    message: String(row.message),
    status: String(row.status),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  }));
}

export async function updateFormSubmissionStatus(id: string, status: string) {
  const db = getTursoClient();
  if (!db) throw new Error('CMS storage is not configured.');

  await ensureCmsSchema();
  await db.execute({
    sql: 'UPDATE form_submissions SET status = ?, updated_at = ? WHERE id = ?',
    args: [status, nowIso(), id],
  });
}

export async function deleteFormSubmission(id: string) {
  const db = getTursoClient();
  if (!db) throw new Error('CMS storage is not configured.');

  await ensureCmsSchema();
  await db.execute({
    sql: 'DELETE FROM form_submissions WHERE id = ?',
    args: [id],
  });
}
