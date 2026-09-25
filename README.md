# Minhaz Alam — Data Engineering Portfolio

A static, single-page portfolio that presents a data engineering career as a pipeline: Source → Ingest → Transform → Gold → Serve → Output. No backend or writable storage is used.

## Run locally

Requirements: Node.js 20 and Yarn 1.

```bash
cd frontend
yarn install --frozen-lockfile
yarn start
```

## Deploy

The `Deploy to GitHub Pages` workflow builds the production site from `main` at [minhazalam.github.io](https://minhazalam.github.io/) and the exploration branch at `/preview/`.

## Content

- `frontend/src/content/careerPipeline.json` holds editable copy for the career stages.
- `frontend/src/content/projects.json` lists selected repositories and their visual architecture stages.
- `frontend/src/content/profile.json` contains the name, focus, skills, and contact links.
- `frontend/src/content/certifications.json` contains credentials and verification URLs.

Full project documentation and future authored notes belong in their GitHub repositories. Only selected project links appear on the portfolio.

The `feature/data-pipeline-design` branch deploys a design preview under `/preview/`; the production homepage is built from `main`.
