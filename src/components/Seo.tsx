import React from 'react';

type SeoProps = {
  title: string;
  description?: string;
};

// React 19 hebt <title>- und <meta>-Elemente aus Komponenten automatisch
// in den <head> – eine zusätzliche Bibliothek (react-helmet) ist nicht nötig.
export default function Seo({ title, description }: SeoProps) {
  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </>
  );
}
