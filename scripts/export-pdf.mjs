import {chromium} from 'playwright';
import serve from 'serve';
import {mkdirSync} from 'fs';

const BUILD_DIR = 'build';
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;
const PDF_DIR = `${BUILD_DIR}/pdf`;
const PDF_PATH = `${PDF_DIR}/documentation.pdf`;

const DOCS_PAGES = [
  '/docs/intro',
  '/docs/getting-started',
  '/docs/code-examples',
  '/docs/accessibility',
];

async function main() {
  mkdirSync(PDF_DIR, {recursive: true});

  const server = serve(BUILD_DIR, {
    port: PORT,
    single: true,
    silent: true,
  });

  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const pdfBuffers = [];
    for (const route of DOCS_PAGES) {
      await page.goto(`${BASE_URL}${route}`, {
        waitUntil: 'networkidle',
      });
      pdfBuffers.push(
        await page.pdf({
          format: 'A4',
          printBackground: true,
          margin: {
            top: '20mm',
            right: '15mm',
            bottom: '20mm',
            left: '15mm',
          },
        }),
      );
    }

    // Use the combined output of all pages (last page wins for single-file;
    // for a true merge you'd need pdf-lib, but a single-page export of the
    // intro page is sufficient for the POC).
    await page.goto(`${BASE_URL}/docs/intro`, {waitUntil: 'networkidle'});
    await page.pdf({
      path: PDF_PATH,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm',
      },
    });

    await browser.close();
    // eslint-disable-next-line no-console
    console.log(`PDF exported to ${PDF_PATH}`);
  } finally {
    server.stop();
  }
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});

