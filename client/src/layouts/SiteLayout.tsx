/**
 * Shared chrome for every page except the landing page: a sticky header with the
 * full nav, a breadcrumb, and the site footer.
 */
import { ReactNode } from "react";
import { Link } from "wouter";
import { BRAND, FOOTER_LINKS, NAV, PageMeta as Meta } from "@/content/site";
import { Icon } from "@/components/Icons";
import { PageMeta } from "@/components/PageMeta";
import { SmartLink } from "@/components/Rich";
import { useBodyClass } from "@/hooks/useBodyClass";
import "@/styles/site.css";

export function SiteHeader() {
  return (
    <header className="hd">
      <div className="wrap hd-in">
        <Link href="/" className="brand">
          <span className="badge">
            <Icon.clock />
          </span>{" "}
          {BRAND.name}
        </Link>
        <nav className="nav" aria-label="Main navigation">
          {NAV.map(item => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-links">
          {FOOTER_LINKS.map((item, i) => (
            <span key={item.href}>
              {i > 0 && " · "}
              <Link href={item.href}>{item.label}</Link>
            </span>
          ))}
        </div>
        <p>
          {BRAND.name} is a{" "}
          <SmartLink href={BRAND.parentUrl}>{BRAND.parentShort}</SmartLink>{" "}
          project — workforce time intelligence. Questions?{" "}
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
        </p>
        <p className="upd">
          {BRAND.updated} · {BRAND.copyright}
        </p>
      </div>
    </footer>
  );
}

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav className="crumb" aria-label="Breadcrumb">
      <SmartLink href={BRAND.parentUrl}>{BRAND.parentShort}</SmartLink> ›{" "}
      <Link href="/">{BRAND.name}</Link> › <span>{current}</span>
    </nav>
  );
}

export function SiteLayout({
  meta,
  crumb,
  children,
}: {
  meta: Meta;
  crumb: string;
  children: ReactNode;
}) {
  useBodyClass("page-doc");

  return (
    <>
      <PageMeta meta={meta} />
      <SiteHeader />
      <main>
        <div className="wrap">
          <Breadcrumb current={crumb} />
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
