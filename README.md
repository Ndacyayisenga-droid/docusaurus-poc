# Docusaurus POC Documentation Site

This project is a **Proof of Concept (POC)** documentation site built with
**Docusaurus v3** to evaluate:

- Docs-as-Code workflows (Markdown/MDX)
- Code snippets with syntax highlighting, line numbers, and copy buttons
- Local search
- PDF export of documentation
- Responsive design and accessibility
- Dead link detection
- CI/CD deployment to GitHub Pages

## Prerequisites

- **Node.js** `>= 20`
- **npm** (bundled with Node.js)

## Install dependencies

```bash
npm install
```

## Run locally

```bash
npm run start
```

Then open `http://localhost:3000` in your browser.

This command:

- Starts a local development server
- Watches files for changes
- Hot-reloads content and layout updates

## Build the site

```bash
npm run build
```

This generates static content into the `build` directory. During the build:

- **Broken links** and **broken Markdown links** cause the build to fail
  (`onBrokenLinks: 'throw'`, `onBrokenMarkdownLinks: 'throw'`).

You can serve the build locally with:

```bash
npm run serve
```

## Export documentation to PDF

This POC includes a simple PDF export script powered by **Playwright**:

1. Build the site:

   ```bash
   npm run build
   ```

2. Export the main docs page to PDF:

   ```bash
   npm run export:pdf
   ```

This will:

- Start a temporary static server for the `build` directory
- Open `/docs/intro` in a headless browser
- Save `docs-poc.pdf` in the project root

You can extend the script in `scripts/export-pdf.mjs` to export additional
routes as needed.

## Search

The site uses the **`docusaurus-plugin-search-local`** plugin to provide
client-side search across:

- Docs
- Static pages

The search bar appears in the navbar and works offline once the site is
loaded.

## CI/CD and GitHub Pages

A GitHub Actions workflow is provided at
`.github/workflows/deploy.yml`. It:

1. Checks out the repository
2. Installs Node.js
3. Runs `npm install`
4. Runs `npm run build` (which fails on broken links)
5. Uploads the `build` directory as an artifact
6. Deploys the site to **GitHub Pages**

To enable GitHub Pages deployment:

1. Push this project to a GitHub repository.
2. Update `url`, `baseUrl`, `organizationName`, and `projectName` in
   `docusaurus.config.js` to match your GitHub username and repository name.
3. In the repository settings, enable GitHub Pages with the **GitHub Actions**
   workflow as the source.

Alternatively, you can set these environment variables in CI:

- `DOCUSAURUS_URL` (example: `https://my-user.github.io`)
- `DOCUSAURUS_BASE_URL` (example: `/my-repo/`)
- `DOCUSAURUS_ORG` (example: `my-user`)
- `DOCUSAURUS_PROJECT` (example: `my-repo`)
- `DOCUSAURUS_REPO_URL` (example: `https://github.com/my-user/my-repo`)

## Docusaurus features demonstrated

- **Docs-as-Code**: All content in `docs/` is written in Markdown/MDX and
  versioned with the code. An **AsciiDoc example** is authored as `docs/asciidoc-example.adoc` and converted at build time with **Asciidoctor.js** into `docs/_asciidoc-example-html.json`, then shown via `docs/asciidoc-example.mdx` (Docusaurus still has no first-class `.adoc` loader; this proves the AsciiDoc toolchain in-repo).
- **Tabs & Admonitions**: See `docs/code-examples.md` and `docs/getting-started.md`.
- **Code blocks**: Multiple languages with syntax highlighting, line numbers,
  and copy buttons.
- **Mermaid diagrams**: Sequence, flowchart, and class diagrams in
  `docs/code-examples.md` (via `@docusaurus/theme-mermaid`).
- **Sidebar navigation**: Configured in `sidebars.js`.
- **Table of contents**: Automatically generated from headings on each page.
- **Dark/light theme switch**: Built into the navbar.
- **Responsive design**: Mobile navigation drawer and desktop layout.
- **Accessibility**: Semantic layout, ARIA-friendly components, and keyboard
  navigation (see `docs/accessibility.md`).

