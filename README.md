# Minhaz Alam — Data Engineering Portfolio

A minimal static portfolio highlighting selected data engineering repositories. Project code and detailed documentation live on GitHub.

## Run locally

Requirements: Node.js 20 and Yarn 1.

```bash
cd frontend
yarn install --frozen-lockfile
yarn start
```

## Deploy

The `Deploy to GitHub Pages` workflow builds and publishes the React app to [minhazalam.github.io](https://minhazalam.github.io/) on each push to `main`.

## Content

- `frontend/src/content/projects.json` lists the selected data engineering and preparation repositories.
- `frontend/src/content/profile.json` contains the short introduction and contact links.
- `frontend/src/content/certifications.json` contains credentials and their verification URLs.
- `frontend/src/content/writing.json` contains article metadata and content. Add topic tags such as `Spark`, `SQL`, `AWS`, `dbt`, or `Optimization`; GitHub stores the content and each push republishes the static site.

The `/recruiter` view is a short introduction to skills, selected repositories, verified credentials, and technical writing. All site content is static JSON—there is no backend.
