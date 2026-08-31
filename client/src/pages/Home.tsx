/**
 * Business Time Back landing page: hero, the demo workspace, and the marketing
 * sections beneath it. Structure and copy mirror the live site.
 */
import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { BRAND, FOOTER_LINKS, HOME, META } from "@/content/site";
import { Icon } from "@/components/Icons";
import { PageMeta } from "@/components/PageMeta";
import { Rich, SmartLink } from "@/components/Rich";
import { Demo } from "@/demo/Demo";
import { useBodyClass } from "@/hooks/useBodyClass";
import { captureLead, track } from "@/lib/leadCapture";
import "@/styles/home.css";

const SCROLL_REVEAL = 320;

export default function Home() {
  const [screen, setScreen] = useState<"auth" | "workspace">("auth");
  const [scrolled, setScrolled] = useState(false);
  const [busy, setBusy] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useBodyClass("page-home");

  // Sticky header appears once the hero scrolls away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_REVEAL);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("scrolled", scrolled);
    return () => document.body.classList.remove("scrolled");
  }, [scrolled]);

  // A returning visitor in this session goes straight back into the demo.
  useEffect(() => {
    try {
      if (sessionStorage.getItem("btb_demo_access") === "true")
        setScreen("workspace");
    } catch {
      /* private browsing */
    }
  }, []);

  function openDemo() {
    setScreen("workspace");
    window.scrollTo(0, 0);
  }

  function scrollToGate() {
    document
      .getElementById("demo-gate")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => emailRef.current?.focus({ preventScroll: true }), 500);
  }

  function submitGate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = emailRef.current?.value.trim() ?? "";
    if (!email) return;

    setBusy(true);
    try {
      sessionStorage.setItem("btb_email", email);
      sessionStorage.setItem("btb_demo_access", "true");
    } catch {
      /* private browsing */
    }

    // Saved in the background; a slow write never blocks demo access.
    captureLead(email).catch(err => {
      console.error("Lead capture failed:", err);
      track("LeadCaptureFailed");
    });

    openDemo();
    setBusy(false);
    track("DemoAccess");
  }

  return (
    <>
      <PageMeta meta={META.home} />

      <div className="sticky-header">
        <Link href="/" className="sh-brand">
          <Icon.info />
          Business Time Back
        </Link>
        <a
          className="sh-cta"
          href="#demo-gate"
          onClick={e => {
            e.preventDefault();
            scrollToGate();
          }}
        >
          {HOME.hero.cta}
        </a>
      </div>

      <header className="site-header">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            {HOME.hero.crumbs.map(c => (
              <li
                key={c.label}
                {...(c.href ? {} : { "aria-current": "page" as const })}
              >
                {c.href ? (
                  <SmartLink href={c.href}>{c.label}</SmartLink>
                ) : (
                  c.label
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="site-h1">{HOME.hero.title}</h1>
        <p className="site-sub">{HOME.hero.sub}</p>
        <a
          className="h-cta"
          href="#demo-gate"
          onClick={e => {
            e.preventDefault();
            scrollToGate();
          }}
        >
          {HOME.hero.cta}
        </a>
      </header>

      <div id="demo-root">
        <Demo
          screen={screen}
          onEnter={openDemo}
          onExit={() => setScreen("auth")}
        />
      </div>

      <main className="content">
        <Section
          id="what"
          eyebrow={HOME.what.eyebrow}
          heading={HOME.what.heading}
        >
          <p className="lead">{HOME.what.lead}</p>
          {HOME.what.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Section>

        <Section
          id="how-it-works"
          eyebrow={HOME.howItWorks.eyebrow}
          heading={HOME.howItWorks.heading}
        >
          <div className="how-grid">
            {HOME.howItWorks.cards.map(c => (
              <div className="how-card" key={c.n}>
                <div className="n">{c.n}</div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 22 }}>
            <Rich text={HOME.howItWorks.footnote} linkClass="inline" />
          </p>
        </Section>

        <Section
          id="before-after"
          eyebrow={HOME.beforeAfter.eyebrow}
          heading={HOME.beforeAfter.heading}
        >
          <div className="before-after-grid">
            <div className="before-card">
              <h3>{HOME.beforeAfter.before.title}</h3>
              <div className="stat-before">{HOME.beforeAfter.before.stat}</div>
              <p>{HOME.beforeAfter.before.caption}</p>
              <ul>
                {HOME.beforeAfter.before.points.map(p => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="arrow">→</div>
            <div className="after-card">
              <h3>{HOME.beforeAfter.after.title}</h3>
              <div className="stat-after">{HOME.beforeAfter.after.stat}</div>
              <p>{HOME.beforeAfter.after.caption}</p>
              <ul>
                {HOME.beforeAfter.after.points.map(p => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section
          id="use-cases"
          eyebrow={HOME.useCases.eyebrow}
          heading={HOME.useCases.heading}
        >
          <p>{HOME.useCases.intro}</p>
          <div className="use-grid">
            {HOME.useCases.items.map(u => (
              <div className="use" key={u.title}>
                <strong>{u.title}</strong>
                <span>{u.body}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="limits"
          eyebrow={HOME.limits.eyebrow}
          heading={HOME.limits.heading}
        >
          <div className="limits">
            {HOME.limits.items.map(l => {
              const Glyph = Icon[l.icon];
              return (
                <div className="limit" key={l.title}>
                  <Glyph />
                  <div>
                    <b>{l.title}</b>
                    <p>{l.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section
          id="testimonials"
          eyebrow={HOME.testimonials.eyebrow}
          heading={HOME.testimonials.heading}
        >
          <div className="testimonials-grid">
            {HOME.testimonials.items.map(t => (
              <div className="testimonial-card" key={t.name}>
                <div className="stars">★★★★★</div>
                <p className="quote">"{t.quote}"</p>
                <div className="testimonial-author">
                  <div className="avatar placeholder-avatar">{t.initials}</div>
                  <div className="author-info">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="video-testimonial">
            <div className="eyebrow">{HOME.testimonials.videoEyebrow}</div>
            <div className="video-placeholder">
              <svg
                viewBox="0 0 400 225"
                style={{ width: "100%", height: "auto" }}
              >
                <rect width="400" height="225" fill="#e0e0e0" />
                <circle cx="200" cy="112" r="40" fill="#999" />
                <path d="M180 95 L200 107 L180 119 Z" fill="#fff" />
              </svg>
              <p className="video-label">{HOME.testimonials.videoLabel}</p>
            </div>
          </div>
        </Section>

        <Section
          id="pricing"
          eyebrow={HOME.pricing.eyebrow}
          heading={HOME.pricing.heading}
        >
          <div className="pricing-grid">
            {HOME.pricing.plans.map(plan => (
              <div
                className={`pricing-card${plan.featured ? " featured" : ""}`}
                key={plan.name}
              >
                {plan.featured && "badge" in plan && (
                  <div className="badge">{plan.badge}</div>
                )}
                <h3>{plan.name}</h3>
                <div className="price">
                  {"customPrice" in plan && plan.customPrice ? (
                    plan.customPrice
                  ) : (
                    <>
                      <span className="currency">{plan.currency}</span>
                      <span className="amount">{plan.amount}</span>
                      <span className="period">{plan.period}</span>
                    </>
                  )}
                </div>
                <p className="desc">{plan.desc}</p>
                <ul className="features">
                  {plan.features.map(f => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                {plan.contact ? (
                  <a
                    className="button outline wide"
                    href={`mailto:${BRAND.email}?subject=${encodeURIComponent("Business Time Back — Enterprise enquiry")}`}
                  >
                    {plan.contactLabel}
                  </a>
                ) : (
                  <button
                    type="button"
                    className="button primary wide"
                    onClick={scrollToGate}
                  >
                    {HOME.pricing.ctaLabel}
                  </button>
                )}
                <p className="cta-note">
                  {plan.contact ? plan.contactNote : HOME.pricing.ctaNote}
                </p>
              </div>
            ))}
          </div>
          <div className="pricing-guarantee">
            <h3>{HOME.pricing.guarantee.title}</h3>
            {HOME.pricing.guarantee.body.map((p, i) => (
              <p key={i}>
                <Rich text={p} />
              </p>
            ))}
          </div>
        </Section>

        <section id="demo-gate">
          <h2>{HOME.demoGate.heading}</h2>
          <p style={{ color: "#aed3ce", fontSize: 15, margin: "16px 0 0" }}>
            {HOME.demoGate.sub}
          </p>
          <form className="email-form" onSubmit={submitGate}>
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder={HOME.demoGate.placeholder}
              required
            />
            <button type="submit" disabled={busy}>
              {busy ? HOME.demoGate.busyButton : HOME.demoGate.button}
            </button>
            <p className="form-note">{HOME.demoGate.note}</p>
          </form>
        </section>

        <section style={{ marginTop: 60 }}>
          <div className="security-badges">
            {HOME.securityBadges.map(b => (
              <div className="badge-item" key={b.label}>
                <Icon.shieldSolid />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </section>

        <Section
          id="comparison"
          eyebrow={HOME.comparison.eyebrow}
          heading={HOME.comparison.heading}
        >
          <p>
            <Rich text={HOME.comparison.intro} />
          </p>
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  {HOME.comparison.columns.map((c, i) => (
                    <th key={i}>
                      {c.split("\n").map((line, j) => (
                        <span key={j}>
                          {j > 0 && <br />}
                          {line}
                        </span>
                      ))}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HOME.comparison.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>
                        {j === 0 ? <strong>{cell}</strong> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="comparison-advice">
            {HOME.comparison.advice.map(a => (
              <div className="advice-card" key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="faq" eyebrow={HOME.faq.eyebrow} heading={HOME.faq.heading}>
          <div className="faq">
            {HOME.faq.items.map((item, i) => (
              <details key={item.q} open={i === 0}>
                <summary>{item.q}</summary>
                <div className="a">{item.a}</div>
              </details>
            ))}
          </div>
        </Section>

        <Section
          id="about"
          eyebrow={HOME.about.eyebrow}
          heading={HOME.about.heading}
        >
          <div className="about-card">
            {HOME.about.body.map((p, i) => (
              <p
                key={i}
                style={
                  i === HOME.about.body.length - 1
                    ? { marginBottom: 0 }
                    : undefined
                }
              >
                <Rich text={p} linkClass="inline" />
              </p>
            ))}
          </div>
        </Section>
      </main>

      <footer className="site-footer">
        <div className="in">
          <span>
            {BRAND.copyright} · A {BRAND.parentShort} project · {BRAND.updated}
          </span>
          <span className="fnote">
            {FOOTER_LINKS.map((item, i) => (
              <span key={item.href}>
                {i > 0 && " · "}
                <Link href={item.href}>{item.label}</Link>
              </span>
            ))}
          </span>
          <span className="fnote">
            <SmartLink href={BRAND.parentUrl}>phronesislabs.net</SmartLink> ·{" "}
            <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          </span>
        </div>
      </footer>
    </>
  );
}

function Section({
  id,
  eyebrow,
  heading,
  children,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id}>
      <div className="eyebrow">{eyebrow}</div>
      <h2>{heading}</h2>
      {children}
    </section>
  );
}
