# Minhaz Alam — Data Engineering Portfolio

A small, static portfolio for selected data engineering projects, experience, and verified credentials. The visual style uses a dark technical palette, restrained grid texture, and concise repository cards. It does not force personal history into generic pipeline stages.

## Run locally

Requirements: Node.js 20 and Yarn 1.

```bash
cd frontend
yarn install --frozen-lockfile
yarn start
```

## Deploy

GitHub Pages deploys the production site from `main` to [minhazalam.github.io](https://minhazalam.github.io/). The development preview is built from `dev` and published at `/preview/`. Work on `feature/*` branches, merge to `dev` to review the preview, then merge approved changes to `main`.

## Content

- `frontend/src/content/profile.json` — short bio, skills, and contact links.
- `frontend/src/content/projects.json` — selected repository cards and technology tags.
- `frontend/src/content/experience.json` — role summary.
- `frontend/src/content/certifications.json` — credential names and verification links.

The two featured repositories have concise overview pages linked from the homepage. Their stated scope and repository folders come from their public GitHub descriptions and tree; detailed implementation claims should be added only when the source repositories document them.

## Selected writing

The `/writing` page publishes only Markdown notes explicitly listed in `frontend/src/content/writing.json`. Note bodies stay in the public `data-engineering-interview-prep` repository; the Pages workflow checks out that repository, copies only allowlisted files during the build, and creates static routes for each published note. A daily scheduled build refreshes those selected files. Adding or removing a note requires updating the portfolio manifest and deploying that change. The page stays empty until a note is deliberately selected.

To publish a note, add an entry with a unique URL slug and its exact path in the prep repository, for example:

```json
{
  "slug": "spark-skew",
  "title": "Handling skew in Spark joins",
  "summary": "A concise summary of the production scenario.",
  "topic": "Spark",
  "date": "2026-09-26",
  "sourceFile": "production-scenarios/spark/skew.md"
}
```

Keep the note itself in the prep repository. The source repository remains the canonical place to edit it.

Keep the portfolio selective. Project architecture belongs on the project card only when the stages can be verified from that repository's own documentation. Personal notes remain in the interview preparation repository; the portfolio does not crawl or publish them automatically.

## Privacy

The site is static and does not track visitors. It has no backend, analytics database, or public visitor dashboard.
