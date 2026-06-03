# BRANCH_STATUS — solob-portal (whatissolob.com)

**App path:** `solob-portal/`
**Live domain:** `whatissolob.com`
**VPS container:** `mw-solob`
**VPS port:** `3000`
**Repo:** `https://github.com/HammazoneRecords/Book-of-Solobility`

---

## Current State

| Branch | Last Updated | Deployed? | Notes |
|---|---|---|---|
| main | 2026-05-02 | ✅ Production | Nav border-b removed, live at whatissolob.com |

## Last Action

**Date:** 2026-05-02
**Branch:** main
**Action:** Hotfix — nav border-b removed from all SEO pages
**What changed:**
- `src/pages/seo/About.tsx` — removed `border-b border-white/5` from nav className
- `src/pages/seo/GatePage.tsx` — removed `border-b border-white/5` from nav className
- `src/pages/seo/GatesIndex.tsx` — removed `border-b border-white/5` from nav className
- `src/pages/seo/Glossary.tsx` — removed `border-b border-white/5` from nav className

**Schema migration:** none

---

### Previous Action: 2026-04-30 — SEO infrastructure
- `src/components/PageSeo.tsx` — per-page meta tag manager
- `src/pages/seo/About.tsx` — /about page
- `src/pages/seo/GatesIndex.tsx` — /gates-overview page
- `src/pages/seo/GatePage.tsx` — /gates/:gateName (all 8 gates)
- `src/pages/seo/Glossary.tsx` — /glossary page
- `scripts/prerender.js` — Puppeteer prerender pipeline
- `public/robots.txt` + `public/sitemap.xml`
- `src/App.tsx` — 4 new unprotected routes
- `package.json` — build script: vite build && node scripts/prerender.js
- `logic-check.config.js` — 13-check automated validator (all passing)

---

## Active Feature Branches

| Branch | Purpose | Created | Status |
|---|---|---|---|
| — | No active feature branches | — | — |

## Pending Merges

- None

---

## History

| Date | Branch | Action | Notes |
|---|---|---|---|
| 2026-04-30 | main | BRANCH_STATUS.md created | — |
| 2026-04-30 | main | SEO infrastructure deployed | 13/13 logic checks passing, VPS rebuilt |
| 2026-05-02 | main | Nav border-b hotfix | Removed from 4 SEO pages, deployed to VPS |
