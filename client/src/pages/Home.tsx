/**
 * Better Work, Visible: human-centered landing page with an asymmetric guided
 * walkthrough, Capacity Teal emphasis, and zero surveillance language — written
 * for small business owners who wear every hat.
 */
import { useState } from "react";
import { LaunchSignupDialog } from "@/components/LaunchSignupDialog";
import { ExitIntentSignup } from "@/components/ExitIntentSignup";
import { APP_ROOT, ASSET_PATH } from "@/lib/sitePaths";
import "@/live-demo.css";
import "@/live-demo-complete.css";
import "@/elite-positioning.css";
import "@/waitlist.css";
import "@/waitlist-success-override.css";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleArrowUp,
  CircleCheck,
  ChevronLeft,
  Clock3,
  ClipboardPenLine,
  LayoutDashboard,
  Menu,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  X,
} from "lucide-react";

type DemoStep = "role" | "report" | "map" | "admin" | "plan";
type RoleId = "retail" | "services" | "ecommerce" | "cafe";
type BusinessSize = 1 | 3 | 6;
type PlanMove = "adminblock" | "checklist" | "replies";

const roles: { id: RoleId; title: string; short: string; description: string; marker: string }[] = [
  { id: "retail", title: "Shop & retail owner", short: "Retail", description: "Runs the floor, the stock room, and everything in between.", marker: "SR" },
  { id: "services", title: "Local service owner", short: "Services", description: "Balances jobs on site with scheduling, quotes, and invoicing.", marker: "LS" },
  { id: "ecommerce", title: "Ecommerce seller", short: "Ecommerce", description: "Juggles orders, listings, customer messages, and fulfillment.", marker: "EC" },
  { id: "cafe", title: "Café or restaurant owner", short: "Café", description: "Keeps supplier orders, staffing, and service running every day.", marker: "CR" },
];

const initialTaskHours = { admin: 6, inventory: 5, customers: 7, marketing: 4 };

const businessData: Record<BusinessSize, { recovered: string; admin: string; customers: string; inventory: string; marketing: string }> = {
  1: { recovered: "6.4", admin: "2.9", customers: "1.7", inventory: "1.1", marketing: "0.7" },
  3: { recovered: "14.2", admin: "6.3", customers: "3.8", inventory: "2.6", marketing: "1.5" },
  6: { recovered: "26.8", admin: "11.9", customers: "7.2", inventory: "4.9", marketing: "2.8" },
};

const businessSizeLabels: Record<BusinessSize, string> = { 1: "Just you", 3: "You + 2", 6: "You + 5" };

const planOptions: { id: PlanMove; title: string; detail: string; gain: number }[] = [
  { id: "adminblock", title: "One weekly admin block", detail: "Batch invoices, bills, and paperwork into one planned session instead of scattered catch-ups.", gain: 0.32 },
  { id: "checklist", title: "A reusable reorder checklist", detail: "Turn stock checks and supplier orders into one repeatable list you run on a schedule.", gain: 0.25 },
  { id: "replies", title: "Saved replies for common questions", detail: "Answer the questions customers ask most from a small set of ready responses.", gain: 0.18 },
];

const faqs = [
  {
    question: "Does Business Time Back monitor me or my staff?",
    answer: "No. Business Time Back starts with self-reported estimates of everyday tasks. It does not use activity tracking, keystroke logging, screen monitoring, or surveillance tools — for you or for anyone helping you run the business.",
  },
  {
    question: "How do the estimates become useful?",
    answer: "The goal is direction, not false precision. Task-level estimates roll up into a clear picture of your week that shows where time is being absorbed and which change offers the clearest first move.",
  },
  {
    question: "What does ‘recoverable time’ mean?",
    answer: "It is an estimate of time that could be reduced or streamlined—not a promise that any specific hour disappears. You decide whether that capacity goes to customers, growth, or a lighter week.",
  },
  {
    question: "Who is it most useful for?",
    answer: "Small business owners who wear a lot of hats — running a shop, a local service business, an online store, or a digital service — where admin, inventory, customer service, marketing, and fulfillment quietly eat into the week.",
  },
];

function CapacityMark({ className = "" }: { className?: string }) {
  return <img className={className} src={`${ASSET_PATH}btb-rebuild-capacity-mark.png`} alt="Business Time Back" />;
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{number}</span><i /> <p>{children}</p></div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoStep, setDemoStep] = useState<DemoStep>("role");
  const [selectedRole, setSelectedRole] = useState<RoleId>("retail");
  const [taskHours, setTaskHours] = useState(initialTaskHours);
  const [businessSize, setBusinessSize] = useState<BusinessSize>(3);
  const [planMove, setPlanMove] = useState<PlanMove>("adminblock");
  const role = roles.find((item) => item.id === selectedRole) ?? roles[0];
  const business = businessData[businessSize];
  const selectedPlan = planOptions.find((item) => item.id === planMove) ?? planOptions[0];
  const totalTaskHours = Object.values(taskHours).reduce((total, hours) => total + hours, 0);
  const adminShare = Math.round((taskHours.admin / totalTaskHours) * 100);
  const planGain = (Number(business.recovered) * selectedPlan.gain).toFixed(1);

  const adjustTask = (task: keyof typeof initialTaskHours, change: number) => {
    setTaskHours((current) => ({ ...current, [task]: Math.min(14, Math.max(0, current[task] + change)) }));
  };

  return (
    <div className="btb-site">
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="Business Time Back home">
          <CapacityMark className="wordmark__mark" />
          <span>Business Time Back</span>
        </a>
        <nav className={menuOpen ? "main-nav main-nav--open" : "main-nav"} aria-label="Main navigation">
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#why-it-works" onClick={() => setMenuOpen(false)}>Why self-report</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <a className="nav-signin" href="mailto:hello@phronesislabs.net?subject=Business%20Time%20Back%20workspace%20access" onClick={() => setMenuOpen(false)}>Returning user? Sign in <ArrowRight size={14} /></a>
          <LaunchSignupDialog className="launch-cta" source="header">Notify me of launch <ArrowRight size={14} /></LaunchSignupDialog>
        </nav>
        <button className="menu-button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
      <ExitIntentSignup />

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-heading">
          <div className="hero-section__art" aria-hidden="true" style={{ backgroundImage: `linear-gradient(90deg,rgba(248,244,233,1) 0%,rgba(248,244,233,.96) 38%,rgba(248,244,233,.6) 54%,rgba(248,244,233,.1) 77%),url('${ASSET_PATH}btb-rebuild-hero.jpg')` }} />
          <div className="hero-section__content">
            <div className="kicker"><span className="kicker__dot" /> For small business owners who wear every hat</div>
            <h1 id="hero-heading">Make room for the work<br /><em>only you can do.</em></h1>
            <p className="hero-section__lede">Business Time Back turns quick, self-reported estimates of admin, inventory, customer service, marketing, and fulfillment into a concrete plan to win back hours—without monitoring anyone.</p>
            <div className="hero-section__actions">
              <LaunchSignupDialog className="button button--primary" source="hero">Notify me of launch <ArrowRight size={18} /></LaunchSignupDialog>
              <a className="quiet-link" href="#how-it-works">See how it works <ArrowRight size={16} /></a>
            </div>
            <p className="hero-section__reassurance"><ShieldCheck size={15} /> No account needed. Built from self-reported estimates, not activity tracking.</p>
          </div>
          <div className="hero-section__side-note"><span>Your whole week, at a glance.</span><p>See where the hours actually go, then decide which one change is worth making first.</p></div>
          <div className="hero-loop" aria-hidden="true"><span /><i /><b /></div>
        </section>

        <section className="signal-strip" aria-label="Business Time Back approach">
          <div><span>Start with</span><strong>01</strong><small>clear picture of everyday work</small></div>
          <div><span>Choose</span><strong>01</strong><small>change worth making first</small></div>
          <p>Built to show where your week actually goes—not to record what anyone did all day.</p>
        </section>

        <section className="story-section" id="how-it-works" aria-labelledby="story-heading">
          <div className="story-section__rail"><SectionLabel number="01">The work beneath the work</SectionLabel></div>
          <div className="story-section__copy">
            <p className="eyebrow">The problem is not a lack of effort</p>
            <h2 id="story-heading">Your calendar is not<br /><em>the whole story.</em></h2>
            <p className="large-copy">You are already working hard. The question is which routines are quietly taking the hours your customers, your growth, and your best work need.</p>
            <p>Admin, bookkeeping, inventory, customer messages, marketing, and fulfillment are all part of running a business. But when they expand without anyone seeing the full picture, they start to take time from the work only you can do. Business Time Back makes those patterns visible enough to improve.</p>
            <LaunchSignupDialog className="inline-cta" source="story">Notify me of launch <ArrowRight size={17} /></LaunchSignupDialog>
          </div>
          <div className="story-section__image"><img src={`${ASSET_PATH}btb-rebuild-trust-detail.jpg`} alt="A business owner reviewing a workflow on paper" /><span className="image-caption">Work should be visible enough to improve,<br />without turning people into data points.</span></div>
        </section>

        <section className="steps-section" aria-labelledby="steps-heading">
          <div className="steps-section__heading">
            <SectionLabel number="02">From a rough estimate to one clear move</SectionLabel>
            <div><p className="eyebrow">Three steps, not another chore</p><h2 id="steps-heading">Start with what you<br /><em>already know.</em></h2></div>
          </div>
          <div className="steps-grid">
            <article className="step-card"><span className="step-card__number">01</span><Clock3 size={22} /><h3>Map the everyday</h3><p>Make a quick estimate of the time you spend on the tasks that come with running the business—admin, inventory, customer service, marketing, fulfillment. Direction matters more than false precision.</p></article>
            <article className="step-card step-card--teal"><span className="step-card__number">02</span><Sparkles size={22} /><h3>See what's recoverable</h3><p>Your estimates roll up into an opportunity map, showing where routine work clusters and how many hours are recoverable.</p></article>
            <article className="step-card"><span className="step-card__number">03</span><CircleArrowUp size={22} /><h3>Plan one move</h3><p>Model a focused change on the highest-value area, and start where the return is clear and the change is manageable.</p></article>
          </div>
        </section>

        <section className="demo-section" id="live-demo" aria-labelledby="demo-heading">
          <div className="demo-section__heading">
            <SectionLabel number="03">The mechanism, made visible</SectionLabel>
            <div><p className="eyebrow">A populated, illustrative workspace</p><h2 id="demo-heading">From your business,<br /><em>to one clearer move.</em></h2></div>
          </div>
          <div className="demo-journey" aria-label="Illustrative Business Time Back demo">
            <aside className="demo-journey__sidebar">
              <div className="canvas-brand"><CapacityMark /><span>Business Time Back</span></div>
              <div className="demo-progress" aria-label="Demo progress">
                <button className={demoStep === "role" ? "is-current" : ""} onClick={() => setDemoStep("role")}><span>01</span><b>Choose your business</b><small>Start with the work you know</small></button>
                <button className={demoStep === "report" ? "is-current" : ""} onClick={() => setDemoStep("report")}><span>02</span><b>Estimate everyday tasks</b><small>A quick, directional check-in</small></button>
                <button className={demoStep === "map" ? "is-current" : ""} onClick={() => setDemoStep("map")}><span>03</span><b>Explore the opportunity map</b><small>See where the week goes</small></button>
                <button className={demoStep === "admin" ? "is-current" : ""} onClick={() => setDemoStep("admin")}><span>04</span><b>See the owner's view</b><small>Find one useful change</small></button>
                <button className={demoStep === "plan" ? "is-current" : ""} onClick={() => setDemoStep("plan")}><span>05</span><b>Plan a first move</b><small>Turn insight into a decision</small></button>
              </div>
              <div className="canvas-privacy"><ShieldCheck size={16} /><p><strong>Self-reported</strong> task estimates.<br />No activity monitoring.</p></div>
            </aside>
            <div className="demo-stage">
              {demoStep === "role" && <div className="demo-panel demo-panel--role">
                <div className="demo-panel__header"><div><span>Step 01 / 05</span><h3>What kind of business do you run?</h3></div><UsersRound size={21} /></div>
                <p className="demo-panel__intro">Choose the business closest to your everyday work. The product starts with a short, relevant task list—not a generic time-tracking template.</p>
                <div className="role-picker" role="radiogroup" aria-label="Select a business type">
                  {roles.map((item) => <button key={item.id} role="radio" aria-checked={selectedRole === item.id} className={selectedRole === item.id ? "is-selected" : ""} onClick={() => setSelectedRole(item.id)}><span className="role-picker__mark">{item.marker}</span><span><b>{item.title}</b><small>{item.description}</small></span><i>{selectedRole === item.id && <Check size={15} />}</i></button>)}
                </div>
                <div className="demo-panel__actions"><span>Business selected: <strong>{role.title}</strong></span><button className="demo-button" onClick={() => setDemoStep("report")}>Continue to task estimate <ArrowRight size={16} /></button></div>
              </div>}
              {demoStep === "report" && <div className="demo-panel demo-panel--report">
                <div className="demo-panel__header"><div><span>Step 02 / 05 · {role.short}</span><h3>How does a typical week add up?</h3></div><ClipboardPenLine size={21} /></div>
                <p className="demo-panel__intro">Use a rough weekly estimate. You are not logging activity—just making recurring work visible enough to act on.</p>
                <div className="self-report-card"><div className="self-report-card__header"><span>Everyday task</span><span>Typical hours / week</span></div>
                  {([
                    ["admin", "Admin & bookkeeping", "Invoices, bills, payroll, paperwork, and the books"],
                    ["inventory", "Inventory & ordering", "Stock counts, reordering, and supplier coordination"],
                    ["customers", "Customer service", "Messages, calls, follow-ups, and order questions"],
                    ["marketing", "Marketing & listings", "Posts, promotions, listings, and updates"],
                  ] as [keyof typeof initialTaskHours, string, string][]).map(([key, label, detail]) => <div className="task-estimate" key={key}><div><b>{label}</b><small>{detail}</small></div><div className="hours-stepper"><button aria-label={`Reduce ${label} hours`} onClick={() => adjustTask(key, -1)}><Minus size={13} /></button><strong>{taskHours[key]}<small>h</small></strong><button aria-label={`Increase ${label} hours`} onClick={() => adjustTask(key, 1)}><Plus size={13} /></button></div></div>)}
                </div>
                <div className="report-total"><span>Time surfaced in this check-in</span><strong>{totalTaskHours}<small> hrs / week</small></strong><p>Directional input is enough to reveal where a change may be worth it.</p></div>
                <div className="demo-panel__actions"><button className="back-button" onClick={() => setDemoStep("role")}><ChevronLeft size={16} /> Change business</button><button className="demo-button" onClick={() => setDemoStep("map")}>Explore the opportunity map <ArrowRight size={16} /></button></div>
              </div>}
              {demoStep === "map" && <div className="demo-panel demo-panel--map">
                <div className="demo-panel__header"><div><span>Step 03 / 05 · Opportunity map</span><h3>Where does your time cluster?</h3></div><Sparkles size={21} /></div>
                <p className="demo-panel__intro">Start with your business size, then see recurring work by category. This illustrative map shows how a clear task picture can focus your next move.</p>
                <div className="team-scope"><div><span>Illustrative business size</span><p>Select a size to see how the map scales.</p></div><div className="team-size-switch" role="group" aria-label="Illustrative business size">{([1, 3, 6] as BusinessSize[]).map((size) => <button key={size} className={businessSize === size ? "is-active" : ""} onClick={() => setBusinessSize(size)}>{businessSizeLabels[size]}</button>)}</div></div>
                <div className="map-stage"><div className="map-stage__summary"><span>Potential capacity to explore</span><strong>{business.recovered}<small> hrs / week</small></strong><p>Released by a focused workflow shift—not by working longer days.</p></div><div className="map-stage__ring"><i /><b><small>Start here</small><strong>Admin</strong></b></div><div className="map-stage__paths"><span className="path path--reporting" /><span className="path path--meetings" /><span className="path path--inbox" /><span className="path path--coordination" /></div></div>
                <div className="map-breakdown"><div><span>Admin &amp; bookkeeping</span><i><b style={{ width: "88%" }} /></i><strong>{business.admin}h</strong><em>Highest opportunity</em></div><div><span>Customer service</span><i><b style={{ width: "64%" }} /></i><strong>{business.customers}h</strong></div><div><span>Inventory &amp; ordering</span><i><b style={{ width: "51%" }} /></i><strong>{business.inventory}h</strong></div><div><span>Marketing &amp; listings</span><i><b style={{ width: "39%" }} /></i><strong>{business.marketing}h</strong></div></div>
                <div className="demo-panel__actions"><button className="back-button" onClick={() => setDemoStep("report")}><ChevronLeft size={16} /> Edit estimates</button><button className="demo-button" onClick={() => setDemoStep("admin")}>See the owner's view <ArrowRight size={16} /></button></div>
              </div>}
              {demoStep === "admin" && <div className="demo-panel demo-panel--admin">
                <div className="demo-panel__header"><div><span>Step 04 / 05 · Owner's view</span><h3>Where should you start?</h3></div><LayoutDashboard size={21} /></div>
                <p className="demo-panel__intro">The owner's view shows patterns across the whole business, not a surveillance log. Use it to spot one workflow that is clear enough to improve.</p>
                <div className="admin-metrics"><div><span>Estimates mapped</span><strong>{businessSizeLabels[businessSize]}</strong><p>Illustrative business sample</p></div><div><span>Work pattern highlighted</span><strong>{adminShare}%</strong><p>Admin & bookkeeping share</p></div><div><span>First move to consider</span><strong>01</strong><p>Batch the admin rhythm</p></div></div>
                <div className="admin-map"><div className="admin-map__title"><div><span>Opportunity map</span><b>Your business · illustrative roll-up</b></div><span className="status-indicator"><i /> Directional view</span></div><div className="admin-map__rows"><div><span>Admin & bookkeeping</span><i><b style={{ width: `${Math.max(42, adminShare + 42)}%` }} /></i><strong>Highest opportunity</strong></div><div><span>Customer service</span><i><b style={{ width: "61%" }} /></i><strong>Discuss next</strong></div><div><span>Inventory & ordering</span><i><b style={{ width: "49%" }} /></i><strong>Monitor</strong></div><div><span>Marketing & listings</span><i><b style={{ width: "37%" }} /></i><strong>Monitor</strong></div></div></div>
                <div className="recommendation-bar"><span><CircleCheck size={17} /> Recommended first move</span><p>Cut scattered admin catch-ups by batching invoices, bills, and paperwork into one planned weekly block.</p><button onClick={() => setDemoStep("plan")}>Build a change plan <ArrowRight size={15} /></button></div>
                <div className="demo-panel__actions"><button className="back-button" onClick={() => setDemoStep("map")}><ChevronLeft size={16} /> Explore the map</button><span className="demo-complete"><Check size={15} /> Insight ready</span></div>
              </div>}
              {demoStep === "plan" && <div className="demo-panel demo-panel--plan">
                <div className="demo-panel__header"><div><span>Step 05 / 05 · Change plan</span><h3>Turn one insight into a workable experiment.</h3></div><Target size={21} /></div>
                <p className="demo-panel__intro">A good plan is focused enough to test. Choose one intervention, name the hours it could redirect, and decide when you will review it.</p>
                <div className="plan-options" role="radiogroup" aria-label="Select an illustrative workflow move">{planOptions.map((option) => <button key={option.id} role="radio" aria-checked={planMove === option.id} className={planMove === option.id ? "is-selected" : ""} onClick={() => setPlanMove(option.id)}><span><b>{option.title}</b><small>{option.detail}</small></span>{planMove === option.id && <Check size={16} />}</button>)}</div>
                <div className="plan-summary"><div><span>Illustrative hours to redirect</span><strong>{planGain}<small> hrs / week</small></strong><p>Based on the selected business size and this example intervention.</p></div><div><span>Suggested review rhythm</span><b>Try it for two weekly cycles.</b><p>Then compare how the week felt, not just the time estimate.</p></div><div><span>Suggested owner</span><b>You (plus anyone who helps)</b><p>Make the plan visible to the people doing the work.</p></div></div>
                <div className="plan-commitment"><CircleCheck size={19} /><p><strong>Example next step:</strong> Pick one admin block this week, batch what you can into it, and revisit how the week felt after two cycles.</p></div>
                <div className="demo-panel__actions"><button className="back-button" onClick={() => setDemoStep("admin")}><ChevronLeft size={16} /> Back to owner's view</button><button className="demo-button" onClick={() => setDemoStep("role")}>Start another example <ArrowRight size={16} /></button></div>
              </div>}
            </div>
          </div>
          <p className="demo-note">This is an illustrative experience, not an operational report. Business Time Back begins with self-reported task estimates; the owner's view makes patterns visible without monitoring anyone.</p>
        </section>

        <section className="proof-section" id="why-it-works" aria-labelledby="proof-heading">
          <div className="proof-section__visual"><img src={`${ASSET_PATH}btb-rebuild-product-map.jpg`} alt="Abstract visual representation of an opportunity map" /><div className="proof-section__badge"><CapacityMark /><span>Capacity<br />loop</span></div></div>
          <div className="proof-section__content">
            <SectionLabel number="04">A clear contrast</SectionLabel>
            <p className="eyebrow">Why this is different</p>
            <h2 id="proof-heading">A plan for your week,<br /><em>not a time tracker.</em></h2>
            <p className="large-copy">Time trackers document activity after it has happened. Business Time Back helps you see the repeat work in your week and choose the change to make next.</p>
            <div className="proof-points"><div><Check size={18} /><p><strong>Private by design</strong><br />Self-reported estimates, not activity records.</p></div><div><Check size={18} /><p><strong>Directional on purpose</strong><br />Focus on opportunity, not false precision.</p></div><div><Check size={18} /><p><strong>Capacity, not guilt</strong><br />The tool makes trade-offs visible; you choose where recovered hours go.</p></div></div>
          </div>
        </section>

        <section className="fit-section" aria-labelledby="fit-heading">
          <div><SectionLabel number="05">Is this your business?</SectionLabel><h2 id="fit-heading">When routine work becomes<br /><em>invisible overhead.</em></h2><p className="fit-section__note"><strong>Not for:</strong> anyone looking to monitor employees, build a performance-surveillance system, or get a guaranteed savings figure from a quick estimate.</p></div>
          <div className="fit-section__cards">
            <article><span>Shop & retail</span><p>Less time on stock counts and reordering, more time on the floor with customers.</p></article>
            <article><span>Local services</span><p>Less time on scheduling and invoicing, more time on the job that pays.</p></article>
            <article><span>Ecommerce</span><p>Less time on order-status messages and listing upkeep, more time growing the catalog.</p></article>
            <article><span>Cafés & restaurants</span><p>Less time on supplier orders and scheduling, more time on the food and the room.</p></article>
          </div>
        </section>

        <section className="commercial-section" aria-labelledby="commercial-heading">
          <div className="commercial-section__copy"><SectionLabel number="06">A clear next step</SectionLabel><p className="eyebrow">Explore before you commit</p><h2 id="commercial-heading">See the work that is getting<br /><em>in the way of the work.</em></h2><p>Explore a populated example, then decide whether your business has one routine worth changing first. If the approach fits, join the pre-launch list and we will let you know the moment it opens.</p><LaunchSignupDialog className="button button--primary" source="commercial">Notify me of launch <ArrowRight size={18} /></LaunchSignupDialog></div>
          <div className="commercial-card"><span className="commercial-card__label">What you will see in the live demo</span><ul><li><Check size={17} /> A business-relevant starting point</li><li><Check size={17} /> Self-reported task estimates</li><li><Check size={17} /> An opportunity map for your whole week</li><li><Check size={17} /> One focused change plan</li></ul><div className="commercial-card__footer"><span>Explore first. Decide later.</span><LaunchSignupDialog className="commercial-card__notify" source="commercial">Notify me of launch <ArrowRight size={15} /></LaunchSignupDialog></div></div>
        </section>

        <section className="faq-section" id="faq" aria-labelledby="faq-heading">
          <div className="faq-section__heading"><SectionLabel number="07">Common questions</SectionLabel><h2 id="faq-heading">Useful enough to act on.<br /><em>Honest enough to trust.</em></h2><p>Business Time Back is designed to support a practical decision without pretending to be more certain than the evidence allows. More detail lives in the <a href={`${APP_ROOT}faq/`}>full FAQ</a>.</p></div>
          <div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<ChevronDown size={20} /></summary><p>{faq.answer}</p></details>)}</div>
        </section>

        <section className="closing-section"><div className="closing-section__art" aria-hidden="true" style={{ backgroundImage: `linear-gradient(90deg,rgba(12,49,52,.97) 0%,rgba(12,49,52,.86) 46%,rgba(12,49,52,.23) 100%),url('${ASSET_PATH}btb-rebuild-product-map.jpg')` }} /><div className="closing-section__content"><CapacityMark /><p className="eyebrow">Make a better use of the hours you already have</p><h2>See the work that is<br /><em>getting in the way of the work.</em></h2><p>Explore a populated example, then decide whether your business has one routine worth changing first.</p><LaunchSignupDialog className="button button--light" source="closing">Notify me of launch <ArrowRight size={18} /></LaunchSignupDialog><span className="closing-section__note"><ShieldCheck size={15} /> No account needed to explore</span></div></section>
      </main>

      <footer className="site-footer"><div className="site-footer__brand"><CapacityMark /><span>Business Time Back</span></div><p>Business Time Back is a product of <a href="https://phronesislabs.net" target="_blank" rel="noreferrer">Phronesis Labs, LLC</a>. Time intelligence for small business owners who want their hours back—without monitoring anyone.</p><div className="footer-links"><a href="mailto:hello@phronesislabs.net">hello@phronesislabs.net</a><a href={`${APP_ROOT}how-it-works/`}>How it works</a><a href={`${APP_ROOT}business-time-back-vs-time-tracking/`}>vs Time tracking</a><a href={`${APP_ROOT}faq/`}>FAQ</a><a href={`${APP_ROOT}about/`}>About</a><a href={`${APP_ROOT}privacy/`}>Privacy</a><a href={`${APP_ROOT}terms/`}>Terms</a><a href="#top">Back to top <ArrowRight size={15} /></a></div></footer>
    </div>
  );
}
