/** 404 page — carries the same sticky header and footer as every other page. */
import { Link } from "wouter";
import { BRAND } from "@/content/site";
import { SiteLayout } from "@/layouts/SiteLayout";

export default function NotFound() {
  return (
    <SiteLayout
      meta={{
        path: "/404",
        title: `Page not found | ${BRAND.name}`,
        description: "That page doesn't exist. Here's the way back.",
      }}
      crumb="Page not found"
    >
      <h1>That page doesn't exist</h1>
      <p className="lead">
        The link may be out of date, or the page may have moved. Nothing is
        broken on your end.
      </p>
      <p>Try one of these instead:</p>
      <ul>
        <li>
          <Link href="/">Business Time Back home</Link> — see where your week
          goes
        </li>
        <li>
          <Link href="/how-it-works/">How it works</Link> — the method, step by
          step
        </li>
        <li>
          <Link href="/faq/">FAQ</Link> — the usual questions, answered
        </li>
      </ul>
      <div className="cta">
        <Link href="/" className="btn">
          Try Business Time Back →
        </Link>
      </div>
    </SiteLayout>
  );
}
