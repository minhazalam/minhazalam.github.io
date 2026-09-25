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

GitHub Pages deploys the production site from `main` to [minhazalam.github.io](https://minhazalam.github.io/). The design preview is built from `feature/data-pipeline-design` and published at `/preview/`.

## Content

- `frontend/src/content/profile.json` — short bio, skills, and contact links.
- `frontend/src/content/projects.json` — selected repository cards and technology tags.
- `frontend/src/content/experience.json` — role summary.
- `frontend/src/content/certifications.json` — credential names and verification links.

Keep the portfolio selective. Project architecture belongs on the project card only when the stages can be verified from that repository's own documentation. Personal notes remain in the interview preparation repository; the portfolio does not crawl or publish them automatically.

## Privacy

The site is static and does not track visitors. It has no backend, analytics database, or public visitor dashboard.
