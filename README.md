# Minhaz Alam — Data Engineering Portfolio

A minimal, responsive portfolio for data engineering work. The site is a static React application: it has no server, database, API keys, or runtime write operations. Portfolio content is version-controlled JSON, and each project can link to its own GitHub repository for code, documentation, and downloadable artifacts.

## Run locally

Requirements: Node.js 20 and Yarn 1.

```bash
cd frontend
yarn install
yarn start
```

Open http://localhost:3000. The app uses hash-based routes so project pages work at https://minhazalam.github.io/ on static hosting.

## Deploy with GitHub Pages

1. Push the repository to GitHub.
2. In **Settings → Pages**, select **GitHub Actions** as the source.
3. Push to `main`, or run the **Deploy to GitHub Pages** workflow manually.

The workflow in `.github/workflows/deploy-pages.yml` builds the static app and publishes `frontend/build`. No secrets or backend services are required.

## Manage portfolio content

Edit the JSON files in `frontend/src/content/`; changes are included at build time. See [frontend/README.md](frontend/README.md) for each content schema and project link guidance. For larger assets and project-specific documentation, store them in a public GitHub repository and link to them from the project entry.

## Architecture

- `frontend/src/pages` and `frontend/src/components`: React UI and routes.
- `frontend/src/content`: profile, project, experience, writing, skill, certification, architecture, and lab data.
- `.github/workflows/deploy-pages.yml`: static GitHub Pages deployment.
- GitHub's public API is used only for optional public repository listings; curated portfolio content does not depend on that request.

There is no backend or persistent user data. The contact action uses email links.
