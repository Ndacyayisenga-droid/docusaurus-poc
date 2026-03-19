/**
 * Writes docs/_asciidoc-example-html.json from docs/asciidoc-example.adoc (Asciidoctor.js).
 * docs/asciidoc-example.mdx imports that JSON so MDX never embeds raw HTML strings.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Asciidoctor from '@asciidoctor/core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const adocPath = path.join(root, 'docs', 'asciidoc-example.adoc');
const outPath = path.join(root, 'docs', '_asciidoc-example-html.json');

const asciidoctor = Asciidoctor();
const adoc = fs.readFileSync(adocPath, 'utf8');
const html = asciidoctor.convert(adoc, {
  safe: 'server',
  attributes: { experimental: '', icons: 'font' },
});

fs.writeFileSync(outPath, JSON.stringify({ html }, null, 0), 'utf8');
console.log('Wrote', path.relative(root, outPath), 'from', path.relative(root, adocPath));
