---
sidebar_position: 5
---

# AsciiDoc Example (Markdown equivalent)

Docusaurus uses **Markdown and MDX** only; it does not render AsciiDoc (`.adoc`) files. This page is the **Markdown equivalent** of the AsciiDoc example in the MkDocs POC, so both POCs offer comparable "AsciiDoc example" content for evaluation.

**In the MkDocs POC:** the same content lives in `docs/asciidoc-example.adoc` and is rendered natively with the `mkdocs-asciidoctor-backend` plugin.

---

This page mirrors an AsciiDoc example. It demonstrates that the **MkDocs POC** can use *AsciiDoc* as well as Markdown when you enable the `mkdocs-asciidoctor-backend` plugin. Here we show the same structure and message in Markdown for Docusaurus.

## Why AsciiDoc?

AsciiDoc offers:

- Strong semantics (sections, admonitions, cross-references)
- Good fit for long-form technical docs and books
- Output to HTML, PDF, and more via Asciidoctor

## Quick example

A minimal YAML snippet:

```yaml
site_name: MkDocs POC
docs_dir: docs
theme:
  name: material
```

## Cross-references

You can link to other docs, e.g. the [Intro](./intro.md) page or [Getting Started](./getting-started.md).

For native AsciiDoc rendering, see the **MkDocs POC** and its README section on AsciiDoc support.
