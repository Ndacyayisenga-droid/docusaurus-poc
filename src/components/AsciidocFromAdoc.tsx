import React from 'react';

type Props = { html: string };

/** Renders HTML produced by Asciidoctor.js from docs/asciidoc-example.adoc */
export default function AsciidocFromAdoc({ html }: Props): React.JSX.Element {
  return (
    <div
      className="asciidoc-from-adoc"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
