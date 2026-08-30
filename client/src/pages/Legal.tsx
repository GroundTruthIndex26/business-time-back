/**
 * Better Work, Visible: legal pages retain the product's calm, candid editorial
 * language while presenting the user-supplied policy structure clearly.
 */
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { APP_ROOT, ASSET_PATH } from "@/lib/sitePaths";

type LegalKind = "privacy" | "terms";

function LegalHeader() {
  return (
    <header className="legal-header">
      <a
        href={APP_ROOT}
        className="wordmark"
        aria-label="Business Time Back home"
      >
        <img
          className="wordmark__mark"
          src={`${ASSET_PATH}btb-rebuild-capacity-mark.png`}
          alt="Business Time Back"
        />
        <span>Business Time Back</span>
      </a>
      <a className="legal-header__back" href={APP_ROOT}>
        <ArrowLeft size={15} /> Back to the product
      </a>
    </header>
  );
}

function LegalFooter() {
  return (
    <footer className="legal-footer">
      <div>
        <img
          src={`${ASSET_PATH}btb-rebuild-capacity-mark.png`}
          alt="Business Time Back"
        />
        <p>
          Business Time Back is a product of{" "}
          <a href="https://phronesislabs.net" target="_blank" rel="noreferrer">
            Phronesis Labs, LLC
          </a>
          .
        </p>
      </div>
      <nav aria-label="Legal navigation">
        <a href="mailto:contact@phronesislabs.net">contact@phronesislabs.net</a>
        <a href={`${APP_ROOT}privacy`}>Privacy</a>
        <a href={`${APP_ROOT}terms`}>Terms</a>
      </nav>
    </footer>
  );
}

const privacySections = [
  {
    title: "Our Core Privacy Promise",
    body: (
      <>
        <p>
          <strong>
            We believe in your right to privacy and your right to your own data.
            We will never sell or share your data with a third party.
          </strong>{" "}
          You have the right to request your own data for as long as we have it.
          You also have the right to delete it at any time.
        </p>
        <p>
          That’s the part that matters most. The rest of this document explains
          how we live up to it.
        </p>
      </>
    ),
  },
  {
    title: "What We Collect",
    body: (
      <>
        <p>
          When you use Business Time Back, operated by Phronesis Labs, LLC, we
          collect only what’s needed to provide the experience or respond to a
          request:
        </p>
        <ul>
          <li>
            <strong>Your email address</strong>, if you choose to give it to us
            to be notified at launch or to contact us about a team plan.
          </li>
          <li>
            <strong>Your role and task estimates</strong>, if you choose to
            provide them in a Business Time Back experience.
          </li>
          <li>
            <strong>Your results</strong>, including any opportunity map or
            change plan generated from the information you choose to provide.
          </li>
          <li>
            <strong>Payment information</strong>, if paid services are offered.
            Payment processing is handled by the relevant payment processor; we
            do not store card numbers.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Why We Collect It",
    body: (
      <>
        <p>We use your data to:</p>
        <ul>
          <li>Provide and improve the Business Time Back experience</li>
          <li>
            Send you launch notifications or information you specifically
            request
          </li>
          <li>Respond to customer support inquiries</li>
          <li>
            Improve the product using aggregated, de-identified patterns, never
            your individual data tied to you
          </li>
        </ul>
        <p>
          That’s it. We do not use your data for advertising, profiling,
          training models for resale, or any purpose unrelated to delivering the
          service you asked us to provide.
        </p>
      </>
    ),
  },
  {
    title: "Who We Share It With",
    body: (
      <>
        <p>
          Short answer: nobody, except the service providers we need to operate.
        </p>
        <p>
          The companies that help us run Business Time Back may have access to
          limited data only to do their job. We will identify applicable
          providers as part of the live service. None may sell your data, and we
          do not share it with anyone outside the providers needed to run the
          service.
        </p>
        <p>
          We will never sell your data. We will never give it to data brokers.
          We will never share it with advertisers. We will never trade it. If we
          are ever acquired or merged into another company, your data rights as
          described in this policy will transfer with the acquisition, and we
          will notify you in advance of any material change.
        </p>
      </>
    ),
  },
  {
    title: "Your Rights",
    body: (
      <>
        <p>You have the right to:</p>
        <ul>
          <li>
            <strong>Request a copy of your data</strong> at any time, for as
            long as we have it. Email us and we will send you everything we have
            about you within 30 days.
          </li>
          <li>
            <strong>Correct your data</strong> if any of it is wrong.
          </li>
          <li>
            <strong>Delete your data</strong> at any time. Email us and we will
            delete your account and all associated data within 30 days. Some
            information may remain in backup systems for a short additional
            period before being permanently purged.
          </li>
          <li>
            <strong>Opt out of future communications.</strong> Reply to any
            email we send you or email us directly.
          </li>
        </ul>
        <p>
          If you are a resident of California, the European Union, the United
          Kingdom, or another jurisdiction with specific privacy laws, you may
          have additional rights. Email us and we will honor them.
        </p>
      </>
    ),
  },
  {
    title: "How Long We Keep It",
    body: (
      <p>
        We keep your data as long as you have an account with us or as long as
        you want us to keep it. There is no automatic expiration. If you want it
        deleted, ask us and we will delete it.
      </p>
    ),
  },
  {
    title: "Security",
    body: (
      <p>
        We protect your data using industry-standard encryption in transit and
        at rest. We use trusted infrastructure providers that maintain
        appropriate security practices. No system is perfectly secure, and we
        cannot guarantee absolute protection against every possible threat. If
        we ever experience a data breach that affects you, we will notify you as
        required by applicable law.
      </p>
    ),
  },
  {
    title: "Children",
    body: (
      <p>
        Business Time Back is not directed at children under 18. We do not
        knowingly collect data from anyone under 18. If you believe a minor has
        provided us with information, please email us and we will delete it.
      </p>
    ),
  },
  {
    title: "Changes to This Policy",
    body: (
      <p>
        If we change this policy, we will update the “Last updated” date at the
        top and email registered users about material changes before they take
        effect. Minor wording clarifications may be made without notice.
      </p>
    ),
  },
];

const termSections = [
  {
    title: "What You Get",
    body: (
      <p>
        Business Time Back offers an interactive demonstration and may offer
        team plans or related services. The scope, access, payment, and delivery
        terms for any paid service will be presented before you make a purchase.
        We will not convert a purchase into a subscription or charge you again
        unless we explicitly tell you and you actively agree.
      </p>
    ),
  },
  {
    title: "What This Service Is (And Isn’t)",
    body: (
      <>
        <p>
          Business Time Back is a workforce time-intelligence tool. It uses
          self-reported task estimates to help teams see recurring work patterns
          and consider a focused workflow improvement.
        </p>
        <p>
          <strong>
            It is not employment monitoring, performance scoring, professional
            financial advice, or legal advice.
          </strong>{" "}
          It does not predict individual performance, guarantee time savings, or
          promise that any specific workflow change will produce a particular
          result.
        </p>
      </>
    ),
  },
  {
    title: "Using the Service",
    body: (
      <p>
        Business Time Back may allow you to explore an illustrative experience
        without creating an account or password. If you use the service, you
        confirm that you are at least 18 years old, that the information you
        provide is accurate to the best of your knowledge, and that you are
        using the service for yourself or on behalf of an organization with
        appropriate permission.
      </p>
    ),
  },
  {
    title: "Payment",
    body: (
      <p>
        Any payment terms for a Business Time Back service will be shown before
        checkout. If payment processing is made available, it may be handled by
        a third-party processor. If a payment fails or is reversed through a
        chargeback, fraud claim, or similar process, we may suspend access until
        the matter is resolved.
      </p>
    ),
  },
  {
    title: "Refunds",
    body: (
      <p>
        Any applicable refund terms will be shown before you buy a paid Business
        Time Back service. Contact us if you have a question about a purchase or
        a refund request.
      </p>
    ),
  },
  {
    title: "Acceptable Use",
    body: (
      <>
        <p>When you use Business Time Back, you agree not to:</p>
        <ul>
          <li>Use the service for any unlawful purpose</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Scrape, copy, or republish our content without permission</li>
          <li>
            Use automated tools to interact with our service in ways that
            disrupt it
          </li>
          <li>
            Resell, redistribute, or use our content for commercial purposes
            without written permission
          </li>
          <li>Impersonate someone else when using the service</li>
        </ul>
        <p>
          We may suspend or terminate your access if you violate these terms.
        </p>
      </>
    ),
  },
  {
    title: "Our Content",
    body: (
      <p>
        The text, design, logos, methodology, and materials generated by
        Business Time Back are our intellectual property or that of our service
        providers. You may use materials supplied to you for your organization’s
        internal planning. You may not republish, resell, or use them for
        unrelated commercial purposes without our written permission. You retain
        ownership of the information you provide; we have a limited license to
        use it solely to deliver the service, as described in our Privacy
        Policy.
      </p>
    ),
  },
  {
    title: "Service Availability",
    body: (
      <p>
        We try to keep Business Time Back available, but we cannot guarantee
        uninterrupted service. We may experience downtime for maintenance,
        updates, or unexpected technical issues. We are not liable for losses
        resulting from service interruptions.
      </p>
    ),
  },
  {
    title: "Disclaimers and Limitations",
    body: (
      <p>
        To the maximum extent permitted by law, Business Time Back and Phronesis
        Labs, LLC will not be liable for any indirect, incidental, special,
        consequential, or punitive damages, including lost income, lost
        opportunities, or operational outcomes that result from your use of the
        service. Our total liability to you for any claim related to the service
        will not exceed the total amount you paid us in the twelve months before
        the claim.
      </p>
    ),
  },
  {
    title: "Changes to These Terms",
    body: (
      <p>
        We may update these terms. If we make material changes, we will update
        the “Last updated” date and email users who have given us an email
        address before the changes take effect. Continued use of the service
        after the change means you accept the new terms.
      </p>
    ),
  },
  {
    title: "Governing Law",
    body: (
      <p>
        These terms are governed by the laws of the State of North Carolina,
        United States, without regard to its conflict of law principles. Any
        dispute will be resolved in the state or federal courts located in North
        Carolina.
      </p>
    ),
  },
  {
    title: "Ending Your Relationship With Us",
    body: (
      <p>
        You can stop using Business Time Back at any time. To delete your data,
        see our Privacy Policy or email us. We may terminate your access for
        violating these terms.
      </p>
    ),
  },
];

export function LegalPage({ kind }: { kind: LegalKind }) {
  const isPrivacy = kind === "privacy";
  const title = isPrivacy ? "Privacy Policy" : "Terms of Service";
  const updated = isPrivacy ? "July 28, 2026" : "August 5, 2026";
  const sections = isPrivacy ? privacySections : termSections;
  return (
    <div className="legal-page">
      <LegalHeader />
      <main>
        <section className="legal-hero">
          <p>Legal</p>
          <h1>{title}</h1>
          <span>Last updated: {updated}</span>
        </section>
        <section className="legal-content">
          <a className="legal-breadcrumb" href={APP_ROOT}>
            <ArrowLeft size={14} /> Home
          </a>
          <div className="legal-draft">
            <ShieldCheck size={17} />
            <p>
              <strong>Draft: legal review pending.</strong> This Business Time
              Back policy adapts the source text supplied by the site owner and
              should be reviewed by qualified counsel before public use.
            </p>
          </div>
          <p className="legal-intro">
            Business Time Back is a product of{" "}
            <a
              href="https://phronesislabs.net"
              target="_blank"
              rel="noreferrer"
            >
              Phronesis Labs, LLC
            </a>{" "}
            (“we,” “us,” “our”).{" "}
            {isPrivacy
              ? "This Privacy Policy explains what data we collect, why we collect it, and what rights you have over it."
              : "These Terms of Service govern your use of our website and services. By using Business Time Back, you agree to these terms."}
          </p>
          <p className="legal-intro">
            {isPrivacy
              ? "We wrote this policy to be read, not skimmed. It’s short on purpose."
              : "We tried to write these in plain English. If anything is unclear, email us."}
          </p>
          {sections.map(section => (
            <section className="legal-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.body}
            </section>
          ))}
          <section className="legal-section">
            <h2>Questions</h2>
            <p>
              If you have any questions about this{" "}
              {isPrivacy ? "policy or how we handle your data" : "agreement"},
              email us at{" "}
              <a href="mailto:contact@phronesislabs.net">
                contact@phronesislabs.net
              </a>
              .
            </p>
            <p>
              Business Time Back is a product of{" "}
              <a
                href="https://phronesislabs.net"
                target="_blank"
                rel="noreferrer"
              >
                Phronesis Labs, LLC
              </a>
              , registered in North Carolina, United States.
            </p>
            <p className="legal-switch">
              Read the related document:{" "}
              <a href={`${APP_ROOT}${isPrivacy ? "terms" : "privacy"}`}>
                {isPrivacy ? "Terms of Service" : "Privacy Policy"}{" "}
                <ArrowRight size={14} />
              </a>
            </p>
          </section>
        </section>
      </main>
      <LegalFooter />
    </div>
  );
}

export function PrivacyPage() {
  return <LegalPage kind="privacy" />;
}
export function TermsPage() {
  return <LegalPage kind="terms" />;
}
