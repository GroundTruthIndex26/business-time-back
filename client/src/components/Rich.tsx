/**
 * Renders the tiny inline markup used across content/site.ts:
 *   [label](/path) → link (internal links route client-side)
 *   **bold**       → <strong>
 */
import { Fragment, ReactNode } from "react";
import { Link } from "wouter";

const TOKEN = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

export function isInternal(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

export function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (isInternal(href)) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function Rich({
  text,
  linkClass,
}: {
  text: string;
  linkClass?: string;
}) {
  const out: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  TOKEN.lastIndex = 0;

  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index));
    if (match[3] !== undefined) {
      out.push(<strong key={match.index}>{match[3]}</strong>);
    } else {
      out.push(
        <SmartLink key={match.index} href={match[2]} className={linkClass}>
          {match[1]}
        </SmartLink>
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));

  return (
    <>
      {out.map((node, i) => (
        <Fragment key={i}>{node}</Fragment>
      ))}
    </>
  );
}
