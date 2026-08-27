/**
 * Better Work, Visible: human-centered enterprise landing page with an asymmetric
 * guided walkthrough, Capacity Teal emphasis, and zero surveillance language.
 */
import { useState } from "react";
import "@/live-demo.css";
import "@/live-demo-complete.css";
import "@/elite-positioning.css";
import {
  ArrowDownRight,
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

const ASSET_PATH = `${import.meta.env.BASE_URL}assets/`;

type DemoStep = "role" | "report" | "map" | "admin" | "plan";
type RoleId = "operations" | "sales" | "support" | "engineering";
type TeamSize = 12 | 24 | 50;
type PlanMove = "template" | "rollup" | "meeting";

const roles: { id: RoleId; title: string; short: string; description: string; marker: string }[] = [
  { id: "operations", title: "Operations manager", short: "Operations", description: "Owns the systems, rhythms, and handoffs that keep work moving.", marker: "OP" },
  { id: "sales", title: "Account executive", short: "Sales", description: "Balances customer conversations with follow-ups, CRM work, and coordination.", marker: "AE" },
  { id: "support", title: "Support lead", short: "Support", description: "Guides customer resolution while managing triage, drafts, and handoffs.", marker: "SL" },
  { id: "engineering", title: "Engineering manager", short: "Engineering", description: "Protects focused build time amid planning, updates, and cross-team requests.", marker: "EM" },
];

const initialTaskHours = { reporting: 6, inbox: 5, meetings: 7, coordination: 4 };

const teamData: Record<TeamSize, { recovered: string; reporting: string; meetings: string; coordination: string; inbox: string }> = {
  12: { recovered: "15.5", reporting: "8.2", meetings: "4.8", coordination: "2.1", inbox: "3.3" },
  24: { recovered: "31", reporting: "16.4", meetings: "9.6", coordination: "4.2", inbox: "6.6" },
  50: { recovered: "64.6", reporting: "34.2", meetings: "20", coordination: "8.8", inbox: "13.8" },
};

const planOptions: { id: PlanMove; title: string; detail: string; gain: number }[] = [
  { id: "template", title: "One shared update template", detail: "Replace duplicate status formats with a single weekly check-in.", gain: 0.25 },
  { id: "rollup", title: "A reusable reporting roll-up", detail: "Create one trusted source for the numbers teams repeat in meetings.", gain: 0.32 },
  { id: "meeting", title: "A lighter status rhythm", detail: "Turn one recurring status meeting into an asynchronous update.", gain: 0.18 },
];

const faqs = [
  {
    question: "Does Business Time Back monitor employees?",
    answer: "No. Business Time Back starts with self-reported estimates of everyday tasks. It does not use activity tracking, keystroke logging, screen monitoring, or surveillance tools.",
  },
  {
    question: "How do the estimates become useful?",
    answer: "The goal is direction, not false precision. Task-level estimates roll up into a team view that shows where time is being absorbed and which workflow offers the clearest first move.",
  },
  {
    question: "What does ‘recoverable time’ mean?",
    answer: "It is an estimate of time that could be reduced or streamlined—not a promise that any specific hour disappears. Leaders decide whether that capacity goes to customers, focus work, or something else.",
  },
  {
    question: "Who is it most useful for?",
    answer: "It is designed for operations leaders at growing service teams where people spend meaningful time on reporting, inboxes, coordination, status updates, and other repeatable work.",
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
  const [selectedRole, setSelectedRole] = useState<RoleId>("operations");
  const [taskHours, setTaskHours] = useState(initialTaskHours);
  const [teamSize, setTeamSize] = useState<TeamSize>(24);
  const [planMove, setPlanMove] = useState<PlanMove>("template");
  const role = roles.find((item) => item.id === selectedRole) ?? roles[0];
  const team = teamData[teamSize];
  const selectedPlan = planOptions.find((item) => item.id === planMove) ?? planOptions[0];
  const totalTaskHours = Object.values(taskHours).reduce((total, hours) => total + hours, 0);
  const reportingShare = Math.round((taskHours.reporting / totalTaskHours) * 100);
  const planGain = (Number(team.recovered) * selectedPlan.gain).toFixed(1);

  const startDemo = () => {
    setDemoStep("role");
    document.getElementById("live-demo")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

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
          <a className="launch-cta" href="mailto:contact@phronesislabs.net?subject=Business%20Time%20Back%20launch%20notification&body=Please%20notify%20me%20when%20Business%20Time%20Back%20launches.">Want launch updates? <span>Notify me <ArrowRight size={14} /></span></a>
        </nav>
        <button className="menu-button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-heading">
          <div className="hero-section__art" aria-hidden="true" />
          <div className="hero-section__content">
            <div className="kicker"><span className="kicker__dot" /> For operations leaders at growing service teams</div>
            <h1 id="hero-heading">Make room for the work<br /><em>only your team can do.</em></h1>
            <p className="hero-section__lede">Business Time Back turns quick, self-reported estimates of reporting, inboxes, meetings, and coordination into a shared plan to reduce repeat work—without employee monitoring.</p>
            <div className="hero-section__actions">
              <button className="button button--primary" onClick={startDemo}>Explore the live demo <ArrowDownRight size={18} /></button>
              <a className="quiet-link" href="#how-it-works">See how it works <ArrowRight size={16} /></a>
            </div>
            <p className="hero-section__reassurance"><ShieldCheck size={15} /> No account needed. Built from self-reported estimates, not activity tracking.</p>
          </div>
          <div className="hero-section__side-note"><span>Team-level, not individual.</span><p>See the recurring work together, then decide which one workflow is worth changing first.</p></div>
          <div className="hero-loop" aria-hidden="true"><span /><i /><b /></div>
        </section>

        <section className="signal-strip" aria-label="Business Time Back approach">
          <div><span>Start with</span><strong>01</strong><small>shared picture of everyday work</small></div>
          <div><span>Choose</span><strong>01</strong><small>workflow change worth making first</small></div>
          <p>Built for a practical conversation about how work moves—not a record of what individuals did all day.</p>
        </section>

        <section className="story-section" id="how-it-works" aria-labelledby="story-heading">
          <div className="story-section__rail"><SectionLabel number="01">The work beneath the work</SectionLabel></div>
          <div className="story-section__copy">
            <p className="eyebrow">The problem is not a lack of effort</p>
            <h2 id="story-heading">Your calendar is not<br /><em>the whole story.</em></h2>
            <p className="large-copy">Your team is already working hard. The question is which routines are quietly taking the hours your customers, decisions, and focused work need.</p>
            <p>Reporting, coordination, inboxes, status rituals, and scheduling are all part of a working team. But when they expand without anyone seeing the full picture, they start to take time from the work only people can do. Business Time Back makes those patterns visible enough to improve together.</p>
            <a className="inline-cta" href="#live-demo">Walk through the opportunity map <ArrowRight size={17} /></a>
          </div>
          <div className="story-section__image"><img src={`${ASSET_PATH}btb-rebuild-trust-detail.jpg`} alt="Colleagues reviewing a workflow together on paper" /><span className="image-caption">Work should be visible enough to improve,<br />without turning people into data points.</span></div>
        </section>

        <section className="steps-section" aria-labelledby="steps-heading">
          <div className="steps-section__heading">
            <SectionLabel number="02">From a rough estimate to one clear move</SectionLabel>
            <div><p className="eyebrow">Three steps, not another reporting process</p><h2 id="steps-heading">Start with what your team<br /><em>already knows.</em></h2></div>
          </div>
          <div className="steps-grid">
            <article className="step-card"><span className="step-card__number">01</span><Clock3 size={22} /><h3>Name the everyday work</h3><p>Each person makes a quick estimate of the time they spend on recurring tasks. Direction matters more than false precision.</p></article>
            <article className="step-card step-card--teal"><span className="step-card__number">02</span><Sparkles size={22} /><h3>See the team pattern</h3><p>Those estimates roll into a team-level opportunity map, showing where routine work clusters and where a change may help.</p></article>
            <article className="step-card"><span className="step-card__number">03</span><CircleArrowUp size={22} /><h3>Choose one better workflow</h3><p>Model a focused intervention, agree who owns it, and revisit what changed for the people doing the work.</p></article>
          </div>
        </section>

        <section className="demo-section" id="live-demo" aria-labelledby="demo-heading">
          <div className="demo-section__heading">
            <SectionLabel number="03">The mechanism, made visible</SectionLabel>
            <div><p className="eyebrow">A populated, illustrative workspace</p><h2 id="demo-heading">From your role,<br /><em>to one clearer move.</em></h2></div>
          </div>
          <div className="demo-journey" aria-label="Illustrative Business Time Back demo">
            <aside className="demo-journey__sidebar">
              <div className="canvas-brand"><CapacityMark /><span>Business Time Back</span></div>
              <div className="demo-progress" aria-label="Demo progress">
                <button className={demoStep === "role" ? "is-current" : ""} onClick={() => setDemoStep("role")}><span>01</span><b>Choose a role</b><small>Start with the work you know</small></button>
                <button className={demoStep === "report" ? "is-current" : ""} onClick={() => setDemoStep("report")}><span>02</span><b>Estimate everyday tasks</b><small>A quick, directional check-in</small></button>
                <button className={demoStep === "map" ? "is-current" : ""} onClick={() => setDemoStep("map")}><span>03</span><b>Explore the opportunity map</b><small>See the recurring work together</small></button>
                <button className={demoStep === "admin" ? "is-current" : ""} onClick={() => setDemoStep("admin")}><span>04</span><b>See the team view</b><small>Find one useful change</small></button>
                <button className={demoStep === "plan" ? "is-current" : ""} onClick={() => setDemoStep("plan")}><span>05</span><b>Plan a first move</b><small>Turn insight into a decision</small></button>
              </div>
              <div className="canvas-privacy"><ShieldCheck size={16} /><p><strong>Self-reported</strong> task estimates.<br />No activity monitoring.</p></div>
            </aside>
            <div className="demo-stage">
              {demoStep === "role" && <div className="demo-panel demo-panel--role">
                <div className="demo-panel__header"><div><span>Step 01 / 05</span><h3>What kind of work do you do?</h3></div><UsersRound size={21} /></div>
                <p className="demo-panel__intro">Choose the role closest to your everyday work. The product starts with a short, relevant task list—not a generic time-tracking template.</p>
                <div className="role-picker" role="radiogroup" aria-label="Select a role">
                  {roles.map((item) => <button key={item.id} role="radio" aria-checked={selectedRole === item.id} className={selectedRole === item.id ? "is-selected" : ""} onClick={() => setSelectedRole(item.id)}><span className="role-picker__mark">{item.marker}</span><span><b>{item.title}</b><small>{item.description}</small></span><i>{selectedRole === item.id && <Check size={15} />}</i></button>)}
                </div>
                <div className="demo-panel__actions"><span>Role selected: <strong>{role.title}</strong></span><button className="demo-button" onClick={() => setDemoStep("report")}>Continue to task estimate <ArrowRight size={16} /></button></div>
              </div>}
              {demoStep === "report" && <div className="demo-panel demo-panel--report">
                <div className="demo-panel__header"><div><span>Step 02 / 05 · {role.short}</span><h3>How does a typical week add up?</h3></div><ClipboardPenLine size={21} /></div>
                <p className="demo-panel__intro">Use a rough weekly estimate. You are not logging activity—just making recurring work visible enough for a useful team conversation.</p>
                <div className="self-report-card"><div className="self-report-card__header"><span>Everyday task</span><span>Typical hours / week</span></div>
                  {([
                    ["reporting", "Reporting & updates", "Preparing status reports, summaries, or recurring updates"],
                    ["inbox", "Inbox & follow-up", "Sorting messages, routing requests, sending routine follow-ups"],
                    ["meetings", "Meetings", "Recurring status calls, planning, and coordination"],
                    ["coordination", "Coordination", "Scheduling, chasing information, aligning moving parts"],
                  ] as [keyof typeof initialTaskHours, string, string][]).map(([key, label, detail]) => <div className="task-estimate" key={key}><div><b>{label}</b><small>{detail}</small></div><div className="hours-stepper"><button aria-label={`Reduce ${label} hours`} onClick={() => adjustTask(key, -1)}><Minus size={13} /></button><strong>{taskHours[key]}<small>h</small></strong><button aria-label={`Increase ${label} hours`} onClick={() => adjustTask(key, 1)}><Plus size={13} /></button></div></div>)}
                </div>
                <div className="report-total"><span>Time surfaced in this check-in</span><strong>{totalTaskHours}<small> hrs / week</small></strong><p>Directional input is enough to reveal where a team conversation may be useful.</p></div>
                <div className="demo-panel__actions"><button className="back-button" onClick={() => setDemoStep("role")}><ChevronLeft size={16} /> Change role</button><button className="demo-button" onClick={() => setDemoStep("map")}>Explore the opportunity map <ArrowRight size={16} /></button></div>
              </div>}
              {demoStep === "map" && <div className="demo-panel demo-panel--map">
                <div className="demo-panel__header"><div><span>Step 03 / 05 · Opportunity map</span><h3>Where does the team’s time cluster?</h3></div><Sparkles size={21} /></div>
                <p className="demo-panel__intro">Start with a team scope, then see recurring work by category. This illustrative map shows how a shared task picture can focus an operational conversation.</p>
                <div className="team-scope"><div><span>Illustrative team scope</span><p>Select a team size to see how the map scales.</p></div><div className="team-size-switch" role="group" aria-label="Illustrative team size">{([12, 24, 50] as TeamSize[]).map((size) => <button key={size} className={teamSize === size ? "is-active" : ""} onClick={() => setTeamSize(size)}>{size}<small> people</small></button>)}</div></div>
                <div className="map-stage"><div className="map-stage__summary"><span>Potential capacity to explore</span><strong>{team.recovered}<small> hrs / week</small></strong><p>Released by a focused workflow shift—not assumed headcount reduction.</p></div><div className="map-stage__ring"><i /><b><small>Start here</small><strong>Reporting</strong></b></div><div className="map-stage__paths"><span className="path path--reporting" /><span className="path path--meetings" /><span className="path path--inbox" /><span className="path path--coordination" /></div></div>
                <div className="map-breakdown"><div><span>Reporting &amp; updates</span><i><b style={{ width: "88%" }} /></i><strong>{team.reporting}h</strong><em>Highest opportunity</em></div><div><span>Meetings</span><i><b style={{ width: "64%" }} /></i><strong>{team.meetings}h</strong></div><div><span>Inbox &amp; follow-up</span><i><b style={{ width: "51%" }} /></i><strong>{team.inbox}h</strong></div><div><span>Coordination</span><i><b style={{ width: "39%" }} /></i><strong>{team.coordination}h</strong></div></div>
                <div className="demo-panel__actions"><button className="back-button" onClick={() => setDemoStep("report")}><ChevronLeft size={16} /> Edit estimates</button><button className="demo-button" onClick={() => setDemoStep("admin")}>See the administrator view <ArrowRight size={16} /></button></div>
              </div>}
              {demoStep === "admin" && <div className="demo-panel demo-panel--admin">
                <div className="demo-panel__header"><div><span>Step 04 / 05 · Administrator view</span><h3>Where should the team start?</h3></div><LayoutDashboard size={21} /></div>
                <p className="demo-panel__intro">An administrator sees team-level patterns, not individual activity. Use the view to identify one workflow that is clear enough to improve together.</p>
                <div className="admin-metrics"><div><span>Responses mapped</span><strong>{teamSize}<small> people</small></strong><p>Illustrative team sample</p></div><div><span>Work pattern highlighted</span><strong>{reportingShare}%</strong><p>Reporting & updates share</p></div><div><span>First move to consider</span><strong>01</strong><p>Standardize the reporting rhythm</p></div></div>
                <div className="admin-map"><div className="admin-map__title"><div><span>Team opportunity map</span><b>Operations · illustrative roll-up</b></div><span className="status-indicator"><i /> Directional view</span></div><div className="admin-map__rows"><div><span>Reporting & updates</span><i><b style={{ width: `${Math.max(42, reportingShare + 42)}%` }} /></i><strong>Highest opportunity</strong></div><div><span>Meetings</span><i><b style={{ width: "61%" }} /></i><strong>Discuss next</strong></div><div><span>Inbox & follow-up</span><i><b style={{ width: "49%" }} /></i><strong>Monitor</strong></div><div><span>Coordination</span><i><b style={{ width: "37%" }} /></i><strong>Monitor</strong></div></div></div>
                <div className="recommendation-bar"><span><CircleCheck size={17} /> Recommended first move</span><p>Reduce duplicate weekly reporting by agreeing one shared update rhythm before adding another meeting.</p><button onClick={() => setDemoStep("plan")}>Build a change plan <ArrowRight size={15} /></button></div>
                <div className="demo-panel__actions"><button className="back-button" onClick={() => setDemoStep("map")}><ChevronLeft size={16} /> Explore team map</button><span className="demo-complete"><Check size={15} /> Team insight ready</span></div>
              </div>}
              {demoStep === "plan" && <div className="demo-panel demo-panel--plan">
                <div className="demo-panel__header"><div><span>Step 05 / 05 · Change plan</span><h3>Turn one insight into a workable experiment.</h3></div><Target size={21} /></div>
                <p className="demo-panel__intro">A good plan is focused enough to test. Choose one reporting intervention, name the capacity it could redirect, and agree when the team will review it.</p>
                <div className="plan-options" role="radiogroup" aria-label="Select an illustrative workflow move">{planOptions.map((option) => <button key={option.id} role="radio" aria-checked={planMove === option.id} className={planMove === option.id ? "is-selected" : ""} onClick={() => setPlanMove(option.id)}><span><b>{option.title}</b><small>{option.detail}</small></span>{planMove === option.id && <Check size={16} />}</button>)}</div>
                <div className="plan-summary"><div><span>Illustrative capacity to redirect</span><strong>{planGain}<small> hrs / week</small></strong><p>Based on the selected team scope and this example intervention.</p></div><div><span>Suggested review rhythm</span><b>Try it for two weekly cycles.</b><p>Then compare the team’s experience, not just the time estimate.</p></div><div><span>Suggested owner</span><b>{role.short} lead + team</b><p>Make the plan visible to the people doing the work.</p></div></div>
                <div className="plan-commitment"><CircleCheck size={19} /><p><strong>Example next step:</strong> Review the current reporting rhythm, agree one shared format, and revisit the team’s experience after two weeks.</p></div>
                <div className="demo-panel__actions"><button className="back-button" onClick={() => setDemoStep("admin")}><ChevronLeft size={16} /> Back to team view</button><button className="demo-button" onClick={() => setDemoStep("role")}>Start another example <ArrowRight size={16} /></button></div>
              </div>}
            </div>
          </div>
          <p className="demo-note">This is an illustrative experience, not an operational report. Business Time Back begins with self-reported task estimates; the administrator view makes shared patterns visible without monitoring individual activity.</p>
        </section>

        <section className="proof-section" id="why-it-works" aria-labelledby="proof-heading">
          <div className="proof-section__visual"><img src={`${ASSET_PATH}btb-rebuild-product-map.jpg`} alt="Abstract visual representation of an opportunity map" /><div className="proof-section__badge"><CapacityMark /><span>Capacity<br />loop</span></div></div>
          <div className="proof-section__content">
            <SectionLabel number="04">A clear contrast</SectionLabel>
            <p className="eyebrow">Why this is different</p>
            <h2 id="proof-heading">A team plan,<br /><em>not a time tracker.</em></h2>
            <p className="large-copy">Time trackers document individual activity after it has happened. Business Time Back helps teams discuss repeat work and choose the workflow to improve next.</p>
            <div className="proof-points"><div><Check size={18} /><p><strong>Private by design</strong><br />Self-reported estimates, not activity records.</p></div><div><Check size={18} /><p><strong>Directional on purpose</strong><br />Focus on opportunity, not false precision.</p></div><div><Check size={18} /><p><strong>Capacity, not cuts</strong><br />The tool makes trade-offs visible; leaders choose where recovered capacity goes.</p></div></div>
          </div>
        </section>

        <section className="fit-section" aria-labelledby="fit-heading">
          <div><SectionLabel number="05">Is this your team?</SectionLabel><h2 id="fit-heading">When routine work becomes<br /><em>invisible overhead.</em></h2><p className="fit-section__note"><strong>Not for:</strong> teams looking to monitor individuals, build a performance-surveillance system, or get a guaranteed savings figure from a quick estimate.</p></div>
          <div className="fit-section__cards">
            <article><span>Sales</span><p>See where CRM upkeep and routine follow-ups are taking time from the conversations that move work forward.</p></article>
            <article><span>Customer support</span><p>Make triage, repeat replies, and handoffs visible enough to protect attention for the cases that need judgment.</p></article>
            <article><span>Operations</span><p>Identify where reports and coordination are quietly absorbing the time needed for decisions and improvement.</p></article>
            <article><span>Engineering</span><p>Spot status rituals and cross-team interruption patterns that are crowding out focused build and review time.</p></article>
          </div>
        </section>

        <section className="commercial-section" aria-labelledby="commercial-heading">
          <div className="commercial-section__copy"><SectionLabel number="06">A clear next step</SectionLabel><p className="eyebrow">Explore before you commit</p><h2 id="commercial-heading">See the work that is getting<br /><em>in the way of the work.</em></h2><p>Explore a populated example, then decide whether your team has one routine worth changing together. If the approach fits, we can discuss scope, privacy expectations, and a tailored plan.</p><button className="button button--primary" onClick={startDemo}>Explore the live demo <ArrowDownRight size={18} /></button></div>
          <div className="commercial-card"><span className="commercial-card__label">What you will see in the live demo</span><ul><li><Check size={17} /> A role-relevant starting point</li><li><Check size={17} /> Self-reported task estimates</li><li><Check size={17} /> A team-level opportunity map</li><li><Check size={17} /> One focused change plan</li></ul><div className="commercial-card__footer"><span>Explore first. Decide on scope later.</span><a href="mailto:hello@phronesislabs.net?subject=Business%20Time%20Back%20team%20plan">Ask about your team <ArrowRight size={15} /></a></div></div>
        </section>

        <section className="faq-section" id="faq" aria-labelledby="faq-heading">
          <div className="faq-section__heading"><SectionLabel number="07">Common questions</SectionLabel><h2 id="faq-heading">Useful enough to act on.<br /><em>Honest enough to trust.</em></h2><p>Business Time Back is designed to support a practical conversation without pretending to be more certain than the evidence allows.</p></div>
          <div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<ChevronDown size={20} /></summary><p>{faq.answer}</p></details>)}</div>
        </section>

        <section className="closing-section"><div className="closing-section__art" aria-hidden="true" /><div className="closing-section__content"><CapacityMark /><p className="eyebrow">Make a better use of the hours you already have</p><h2>See the work that is<br /><em>getting in the way of the work.</em></h2><p>Explore a populated example, then decide whether your team has one routine worth changing together.</p><button className="button button--light" onClick={startDemo}>Explore the live demo <ArrowDownRight size={18} /></button><span className="closing-section__note"><ShieldCheck size={15} /> No account needed to explore</span></div></section>
      </main>

      <footer className="site-footer"><div className="site-footer__brand"><CapacityMark /><span>Business Time Back</span></div><p>Business Time Back is a product of <a href="https://phronesislabs.net" target="_blank" rel="noreferrer">Phronesis Labs, LLC</a>. Workforce time intelligence for teams that want to improve work without monitoring people.</p><div className="footer-links"><a href="mailto:contact@phronesislabs.net">contact@phronesislabs.net</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="#top">Back to top <ArrowRight size={15} /></a></div></footer>
    </div>
  );
}
