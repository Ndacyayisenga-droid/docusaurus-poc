import {chromium} from 'playwright';
import serve from 'serve';

const BUILD_DIR = 'build';
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

async function main() {
  // Start a static file server for the built site
  const server = serve(BUILD_DIR, {
    port: PORT,
    single: true,
    silent: true,
  });

  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Visit the main docs page; you can add more URLs if desired
    await page.goto(`${BASE_URL}/docs/intro`, {
      waitUntil: 'networkidle',
    });

    await page.pdf({
      path: 'docs-poc.pdf',
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
    console.log('PDF exported to docs-poc.pdf');
  } finally {
    server.stop();
  }
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});

