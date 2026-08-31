/**
 * Better Work, Visible: focused content pages (how it works, comparison, FAQ,
 * about) rendered from the shared content module in the legal pages' calm
 * editorial style, so every route shares one visual language.
 */
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { Fragment, ReactNode } from "react";
import { APP_ROOT, ASSET_PATH } from "@/lib/sitePaths";
import {
  ABOUT_PAGE,
  BRAND,
  Block,
  ContentPage,
  FAQ_PAGE,
  HOW_IT_WORKS_PAGE,
  VS_TIME_TRACKING_PAGE,
} from "@/content/site";
import "@/doc.css";

/** Renders the content module's tiny inline markup: [label](url) and **bold**. */
function Rich({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) parts.push(text.slice(cursor, match.index));
    if (match[1] !== undefined) {
      const href = match[2];
      const external = /^(https?:|mailto:)/.test(href);
      parts.push(
        <a key={key++} href={href} {...(external && href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
          {match[1]}
        </a>
      );
    } else {
      parts.push(<strong key={key++}>{match[3]}</strong>);
    }
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}

function DocBlock({ block }: { block: Block }) {
  switch (block.kind) {
    case "lead":
      return <p className="legal-intro"><Rich text={block.text} /></p>;
    case "p":
      return <p><Rich text={block.text} /></p>;
    case "h2":
      return <h2><Rich text={block.text} /></h2>;
    case "h3":
      return <h3><Rich text={block.text} /></h3>;
    case "ul":
      return <ul>{block.items.map((item, index) => <li key={index}><Rich text={item} /></li>)}</ul>;
    case "steps":
      return (
        <ol className="doc-steps">
          {block.items.map((step, index) => (
            <li key={index}>
              <span className="doc-steps__number">{String(index + 1).padStart(2, "0")}</span>
              <div><b>{step.title}</b><p><Rich text={step.body} /></p></div>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr>{block.head.map((cell, index) => <th key={index}>{cell.split("\n").map((line, i) => <Fragment key={i}>{i > 0 && <br />}{line}</Fragment>)}</th>)}</tr></thead>
            <tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th scope="row" key={cellIndex}>{cell}</th> : <td key={cellIndex}><Rich text={cell} /></td>)}</tr>)}</tbody>
          </table>
        </div>
      );
    case "faq":
      return (
        <div className="doc-faq">
          {block.items.map((item) => (
            <details key={item.q} open={item.open}>
              <summary>{item.q}<ChevronDown size={18} /></summary>
              <p><Rich text={item.a} /></p>
            </details>
          ))}
        </div>
      );
    case "cta":
      return <p className="doc-cta"><a className="doc-cta__button" href={block.href}>{block.label.replace(" →", "")} <ArrowRight size={16} /></a></p>;
    default:
      return null;
  }
}

function DocHeader() {
  return (
    <header className="legal-header">
      <a href={APP_ROOT} className="wordmark" aria-label="Business Time Back home">
        <img className="wordmark__mark" src={`${ASSET_PATH}btb-rebuild-capacity-mark.png`} alt="Business Time Back" />
        <span>Business Time Back</span>
      </a>
      <a className="legal-header__back" href={APP_ROOT}><ArrowLeft size={15} /> Back to the product</a>
    </header>
  );
}

function DocFooter() {
  return (
    <footer className="legal-footer">
      <div>
        <img src={`${ASSET_PATH}btb-rebuild-capacity-mark.png`} alt="Business Time Back" />
        <p>Business Time Back is a product of <a href={BRAND.parentUrl} target="_blank" rel="noreferrer">{BRAND.parent}</a>.</p>
      </div>
      <nav aria-label="Site navigation">
        <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
        <a href={`${APP_ROOT}how-it-works/`}>How it works</a>
        <a href={`${APP_ROOT}business-time-back-vs-time-tracking/`}>vs Time tracking</a>
        <a href={`${APP_ROOT}faq/`}>FAQ</a>
        <a href={`${APP_ROOT}about/`}>About</a>
        <a href={`${APP_ROOT}privacy/`}>Privacy</a>
        <a href={`${APP_ROOT}terms/`}>Terms</a>
      </nav>
    </footer>
  );
}

export function DocPage({ page }: { page: ContentPage }) {
  return (
    <div className="legal-page">
      <DocHeader />
      <main>
        <section className="legal-hero">
          <p>{page.crumb}</p>
          <h1 className="doc-h1">{page.h1}</h1>
          <span>{BRAND.updated}</span>
        </section>
        <section className="legal-content">
          <a className="legal-breadcrumb" href={APP_ROOT}><ArrowLeft size={14} /> Home</a>
          <div className="doc-body legal-section">
            {page.blocks.map((block, index) => <DocBlock key={index} block={block} />)}
          </div>
        </section>
      </main>
      <DocFooter />
    </div>
  );
}

export function HowItWorksPage() { return <DocPage page={HOW_IT_WORKS_PAGE} />; }
export function VsTimeTrackingPage() { return <DocPage page={VS_TIME_TRACKING_PAGE} />; }
export function FaqPage() { return <DocPage page={FAQ_PAGE} />; }
export function AboutPage() { return <DocPage page={ABOUT_PAGE} />; }
