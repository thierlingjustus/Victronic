import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

type CtaLinkProps = {
  /** Router-Ziel, z.B. "/#contact". Alternativ `href` für einen Anker auf derselben Seite. */
  to?: string;
  href?: string;
  size?: 'sm' | 'md';
  /** Pfeil hinter dem Text – in der Navigation ohne. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Die Haupt-Aktion der Seite als Text-Link: hellblaue, leicht leuchtende
 * Schrift mit feiner Unterlinie. Ersetzt die früheren vollflächig blauen
 * Buttons. Das Aussehen liegt gebündelt in index.css (.cta-link).
 */
export default function CtaLink({ to, href, size = 'md', arrow = true, className = '', children }: CtaLinkProps) {
  const cls = `cta-link ${size === 'sm' ? 'cta-link--sm' : ''} ${className}`.trim();
  const label = (
    <span className="cta-link__label">
      {children}
      {arrow && <ChevronRight className="cta-link__arrow" aria-hidden="true" />}
    </span>
  );

  if (to) {
    return (
      <Link to={to} className={cls}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {label}
    </a>
  );
}
