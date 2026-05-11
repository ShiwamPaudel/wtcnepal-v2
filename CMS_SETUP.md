# WTC Nepal CMS Setup

This site now has a Git-based Decap CMS admin at `/admin/`. It edits JSON files in `src/content/`, which the Next.js pages import through the typed files in `src/data/`.

## Local editing

1. Start the Next.js app:
   ```bash
   npm run dev
   ```
2. In another terminal, start Decap's local Git proxy:
   ```bash
   npm run cms
   ```
3. Open `http://localhost:3000/admin/`.
4. Edit products, partners, team members, service stations, or news.
5. Save in the CMS, then review the Git diff and commit the JSON changes.

## Production setup

1. Push this repository to GitHub.
2. Edit `public/admin/config.yml` and replace:
   ```yaml
   repo: CHANGE_ME_OWNER/CHANGE_ME_REPO
   branch: main
   ```
3. Deploy the site. `/admin/` will load the CMS UI.
4. Configure GitHub authentication for Decap CMS. The simplest managed route is Netlify Identity + Git Gateway. For direct GitHub backend use, editors need push access and a GitHub OAuth flow.
5. Invite only trusted editors because CMS saves changes back to the repository.

## What editors can update

- Products: `src/content/products.json`
- Partners: `src/content/partners.json`
- Team: `src/content/team.json`
- News: `src/content/news.json`
- Service stations: `src/content/serviceStations.json`

Uploaded images are stored in `public/images/uploads` and referenced as `/images/uploads/...`.
