---
sidebar_position: 4
---

# Accessibility

This page summarizes how this POC addresses **accessibility** requirements and
how Docusaurus helps produce ARIA‑friendly documentation sites.

## Semantic layout

- The main layout uses semantic HTML elements such as `<header>`, `<nav>`,
  `<main>`, and `<footer>`.
- The **sidebar**, **navbar**, and **footer** are announced correctly to screen
  readers.
- Headings on each page form a logical hierarchy, which powers both the
  **table of contents** and assistive technologies.

## Keyboard navigation

- All interactive elements (links, buttons, navigation items) are reachable via
  the keyboard `Tab` key.
- The mobile navigation drawer and theme toggle are fully keyboard accessible.
- Focus styles are preserved so users can see which element is active.

## ARIA‑friendly components

Docusaurus core components (navbar, sidebar, search, and dialog elements) ship
with sensible ARIA attributes by default. This includes:

- ARIA labels for the **search input**
- Proper labelling for the **theme toggle** and navigation buttons
- Landmark roles for header, navigation, main content, and footer

## Color mode and contrast

The POC enables a **dark/light theme switch** via the navbar:

- The `colorMode` setting in `docusaurus.config.js` respects the user’s system
  preference.
- Docusaurus themes are designed with accessible contrast ratios in both light
  and dark modes.

## Content guidelines

Even with an accessible framework, content still matters. This POC encourages:

- Descriptive link text instead of “click here”
- Clear heading structure (one `h1` per page, nested headings below)
- Short paragraphs and lists for scannability

## Configuration summary

Key configuration related to reliability and link health:

- `onBrokenLinks: 'throw'` ensures that broken links fail the build.
- `onBrokenMarkdownLinks: 'throw'` enforces valid internal Markdown links.

Together with Docusaurus’ built‑in semantics and components, this provides a
solid foundation for building an accessible documentation site.

