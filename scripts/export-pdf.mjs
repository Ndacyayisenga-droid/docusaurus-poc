import {chromium} from 'playwright';
import {createServer} from 'http';
import {readFileSync, existsSync, mkdirSync, statSync} from 'fs';
import {join, extname} from 'path';

const BUILD_DIR = 'build';
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;
const PDF_DIR = `${BUILD_DIR}/pdf`;
const PDF_PATH = `${PDF_DIR}/documentation.pdf`;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function startStaticServer() {
  const server = createServer((req, res) => {
    let urlPath = new URL(req.url, BASE_URL).pathname;
    let filePath = join(BUILD_DIR, urlPath);

    if (existsSync(filePath) && statSync(filePath).isDirectory()) {
      filePath = join(filePath, 'index.html');
    }

    if (!existsSync(filePath)) {
      filePath = join(BUILD_DIR, 'index.html');
    }

    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    try {
      const content = readFileSync(filePath);
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => resolve(server));
  });
}

async function main() {
  mkdirSync(PDF_DIR, {recursive: true});

  const server = await startStaticServer();

  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();

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
    server.close();
  }
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
