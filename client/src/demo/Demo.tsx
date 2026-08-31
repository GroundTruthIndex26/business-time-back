/**
 * The landing-page demo workspace. Ported from the live vanilla-JS demo to
 * React state; screens, copy and calculations are unchanged.
 */
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { CAT, CatKey, LIBRARY, MY_SAVED, ROLES, Role, TEAM, fmt } from "./data";
import { Icon } from "@/components/Icons";

type Screen = "auth" | "workspace";
type View = "dashboard" | "tasks";

export function Demo({
  screen,
  onEnter,
  onExit,
}: {
  screen: Screen;
  onEnter: () => void;
  onExit: () => void;
}) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [view, setView] = useState<View>("dashboard");
  const [role, setRole] = useState<Role>("Shop & Retail");
  const [hours, setHours] = useState<Record<string, number>>({ ...MY_SAVED });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [mobileNav, setMobileNav] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [mapToast, setMapToast] = useState(false);

  // The live demo marks the body while the workspace is open so the landing
  // page's own sticky header stays out of the way.
  useEffect(() => {
    document.body.classList.toggle("demo-active", screen !== "auth");
    return () => document.body.classList.remove("demo-active");
  }, [screen]);

  function reset() {
    setMode("signin");
    setSelected(new Set());
    setHours({ ...MY_SAVED });
    setRole("Shop & Retail");
    setView("dashboard");
  }

  function exit() {
    try {
      sessionStorage.removeItem("btb_demo_access");
    } catch {
      /* private browsing */
    }
    reset();
    onExit();
  }

  function enter(e?: FormEvent) {
    e?.preventDefault();
    setView("dashboard");
    onEnter();
  }

  if (screen === "auth") {
    return (
      <AuthView
        mode={mode}
        onToggleMode={() => setMode(mode === "signin" ? "signup" : "signin")}
        onEnter={enter}
      />
    );
  }

  return (
    <div className="demo-shell">
      <div className="demo-banner">
        <span className="left">
          <Icon.eye /> Demo mode — exploring sample data for Rivertown Goods
        </span>
        <button onClick={exit}>
          Exit demo <Icon.arrow />
        </button>
      </div>
      <div className="app-shell">
        <Sidebar
          view={view}
          mobileNav={mobileNav}
          onView={v => {
            setView(v);
            setMobileNav(false);
          }}
          onExit={exit}
        />
        <main className="main-content">
          <header className="topbar">
            <button
              className="menu-button"
              onClick={() => setMobileNav(!mobileNav)}
            >
              <Icon.menu />
            </button>
            <span className="topbar-context">
              {view === "dashboard" ? "Overview" : "My time map"}
            </span>
            <div className="topbar-right">
              <span className="status-dot demo-dot" /> Demo data{" "}
              <span className="topbar-avatar">D</span>
            </div>
          </header>
          {view === "dashboard" ? (
            <DashboardView
              selected={selected}
              onToggle={id => {
                const next = new Set(selected);
                next.has(id) ? next.delete(id) : next.add(id);
                setSelected(next);
              }}
              savedToast={savedToast}
              onSave={() => {
                setSavedToast(true);
                setTimeout(() => setSavedToast(false), 2200);
              }}
            />
          ) : (
            <TimeMapView
              role={role}
              onRole={setRole}
              hours={hours}
              onHours={setHours}
              mapToast={mapToast}
              onSave={() => {
                setMapToast(true);
                setTimeout(() => setMapToast(false), 2200);
              }}
            />
          )}
        </main>
      </div>
      <div className="made-badge">
        <span className="dot" /> Business Time Back
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- auth */

function AuthView({
  mode,
  onToggleMode,
  onEnter,
}: {
  mode: "signin" | "signup";
  onToggleMode: () => void;
  onEnter: (e?: FormEvent) => void;
}) {
  const signup = mode === "signup";
  return (
    <div className="auth-shell">
      <div className="auth-aside">
        <span className="orb a" />
        <span className="orb b" />
        <div className="aside-rings" />
        <div className="brand">
          <span className="brand-mark">
            <Icon.clock />
          </span>
          <span>Business Time Back</span>
        </div>
        <div className="aside-copy">
          <div className="eyebrow light">
            <span className="eyebrow-dot" />
            For small business owners doing it all
          </div>
          <p className="hero-title">
            More time for real work.
            <br />
            <em>Less time on busywork.</em>
          </p>
          <p>
            Business Time Back helps small business owners see where their week
            goes, find the highest-value opportunities, and make a confident
            plan to win back hours for growing the business.
          </p>
        </div>
        <div className="aside-stat">
          <div>
            <strong className="accentnum">11.6k</strong>
            <span>hours reclaimed</span>
          </div>
          <div className="stat-rule" />
          <div>
            <strong className="accentnum">41%</strong>
            <span>average time on admin &amp; ops</span>
          </div>
        </div>
      </div>
      <div className="auth-main">
        <div className="auth-form-wrap">
          <div className="mobile-brand brand">
            <span className="brand-mark">
              <Icon.clock />
            </span>
            <span>Business Time Back</span>
          </div>
          <div className="auth-heading">
            <div className="eyebrow">Time intelligence for small business</div>
            <h2>
              {signup ? (
                <>
                  Start your <em>workspace</em>.
                </>
              ) : (
                <>
                  <em>Welcome</em> back.
                </>
              )}
            </h2>
            <p>
              {signup
                ? "Create your workspace and find your first hour back."
                : "Sign in to continue to your workspace."}
            </p>
          </div>
          <form onSubmit={onEnter}>
            {signup && (
              <label>
                Full name
                <input placeholder="Alex Morgan" required />
              </label>
            )}
            <label>
              Work email
              <input type="email" placeholder="you@yourbusiness.com" required />
            </label>
            <label>
              Password
              <input
                type="password"
                placeholder="At least 6 characters"
                minLength={6}
                required
              />
            </label>
            <button type="submit" className="button primary wide">
              {signup ? "Create workspace" : "Sign in"} <Icon.arrow />
            </button>
          </form>
          <div className="demo-divider">
            <span>or</span>
          </div>
          <button className="demo-button" onClick={() => onEnter()}>
            <Icon.eye /> Explore the live demo <Icon.arrow />
          </button>
          <p className="demo-sub">
            No account needed. Walk through a fully populated sample workspace.
          </p>
          <div className="auth-switch">
            {signup ? "Already have an account?" : "New to Business Time Back?"}{" "}
            <button onClick={onToggleMode}>
              {signup ? "Sign in" : "Create an account"}
            </button>
          </div>
          <div className="auth-note">
            <Icon.shield /> Your workspace is private and protected by design.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- sidebar */

function Sidebar({
  view,
  mobileNav,
  onView,
  onExit,
}: {
  view: View;
  mobileNav: boolean;
  onView: (v: View) => void;
  onExit: () => void;
}) {
  return (
    <aside className={`sidebar${mobileNav ? " open" : ""}`}>
      <span className="orb a" />
      <div className="brand">
        <span className="brand-mark">
          <Icon.clock />
        </span>
        <span>Business Time Back</span>
      </div>
      <div className="workspace-label">WORKSPACE</div>
      <div className="org-chip">
        <span className="org-avatar">R</span>
        <span className="name">Rivertown Goods</span>
        <Icon.chevron />
      </div>
      <nav>
        <button
          className={view === "dashboard" ? "active" : ""}
          onClick={() => onView("dashboard")}
        >
          <Icon.dash />
          Overview
        </button>
        <button
          className={view === "tasks" ? "active" : ""}
          onClick={() => onView("tasks")}
        >
          <Icon.clock />
          My time map
        </button>
        <button className="disabled-nav">
          <Icon.users />
          Staff insights <span className="tag">Owner</span>
        </button>
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-help">
          <span className="help-icon">
            <Icon.spark />
          </span>
          <div>
            <strong>Need a hand?</strong>
            <small>See how it works</small>
          </div>
          <Icon.arrow />
        </div>
        <button className="profile" onClick={onExit}>
          <span className="pavatar">D</span>
          <span className="who">
            <strong>Demo viewer</strong>
            <small>Sample workspace</small>
          </span>
          <Icon.logout />
        </button>
      </div>
    </aside>
  );
}

/* -------------------------------------------------------------- dashboard */

function DashboardView({
  selected,
  onToggle,
  savedToast,
  onSave,
}: {
  selected: Set<string>;
  onToggle: (id: string) => void;
  savedToast: boolean;
  onSave: () => void;
}) {
  const totalHours = TEAM.reduce((s, t) => s + t.hours, 0);
  const baseRec = TEAM.reduce((s, t) => s + t.rec, 0);
  const selRec = Array.from(selected).reduce((s, id) => {
    const t = TEAM.find(x => x.id === id);
    return s + (t ? t.rec : 0);
  }, 0);
  const byCat = (Object.keys(CAT) as CatKey[])
    .map(k => ({
      k,
      label: CAT[k],
      hours: TEAM.filter(t => t.cat === k).reduce((s, t) => s + t.rec, 0),
    }))
    .filter(x => x.hours > 0)
    .sort((a, b) => b.hours - a.hours);
  const top5 = TEAM.slice()
    .sort((a, b) => b.rec - a.rec)
    .slice(0, 5);
  const maxCat = byCat[0] ? byCat[0].hours : 1;

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="eyebrow">Owner's view</div>
          <h1>Your time-back opportunity</h1>
          <p>
            See where your week goes and model the return on a better way of
            running the business.
          </p>
        </div>
        <button className="button outline">
          <Icon.file /> Share summary
        </button>
      </div>

      <div className="metric-grid">
        <div className="metric-card accent">
          <span className="metric-label">
            Potential time back <span className="info">i</span>
          </span>
          <strong className="big num">{fmt(baseRec + selRec)}</strong>
          <span className="metric-foot">
            <Icon.trend /> {Math.round((baseRec / totalHours) * 100)}% of mapped
            time has opportunity
          </span>
          <div className="metric-orb" />
        </div>
        <div className="metric-card">
          <span className="metric-label">Hours mapped this week</span>
          <strong className="big num">{fmt(totalHours)}</strong>
          <span className="metric-foot">
            <Icon.briefcase /> {byCat.length} areas of the business mapped
          </span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Highest opportunity</span>
          <strong className="big" style={{ fontSize: 30 }}>
            {byCat[0].label}
          </strong>
          <span className="metric-foot">
            <Icon.target /> {fmt(byCat[0].hours)} could return
          </span>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Where time can come back</h3>
              <p>Estimated weekly hours by area of the business</p>
            </div>
            <span className="panel-tag">This week</span>
          </div>
          <div className="bars">
            {byCat.map(c => (
              <div className="bar-row" key={c.k}>
                <div className="bar-label">
                  <span>{c.label}</span>
                  <strong className="num">{fmt(c.hours)}</strong>
                </div>
                <div className="bar-track">
                  <span
                    className={`fill-${c.k}`}
                    style={{
                      width: `${Math.max(8, (c.hours / maxCat) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="panel-note">
            <Icon.zap /> These are estimates based on the curated Business Time
            Back task library, not a promise of replacement.
          </div>
        </section>

        <section className="panel simulator-panel">
          <div className="panel-head">
            <div>
              <h3>Plan your first move</h3>
              <p>Toggle work to model a focused change</p>
            </div>
            <Icon.reset />
          </div>
          <div className="simulation-total">
            <span>Scenario opportunity</span>
            <strong className="num">{fmt(selRec)}</strong>
          </div>
          <div className="simulation-list">
            {top5.map(t => (
              <button
                key={t.id}
                className={`sim-row${selected.has(t.id) ? " selected" : ""}`}
                onClick={() => onToggle(t.id)}
              >
                <span className="sim-check">
                  <Icon.check />
                </span>
                <span className="sim-name">
                  <strong>{t.name}</strong>
                  <small>
                    {CAT[t.cat]} · {fmt(t.hours)} / week
                  </small>
                </span>
                <span className="sim-hours">+{fmt(t.rec)}</span>
              </button>
            ))}
          </div>
          <button
            className="button primary wide"
            onClick={onSave}
            disabled={selected.size === 0}
          >
            {savedToast ? "Scenario saved" : "Save this scenario"}{" "}
            <Icon.arrow />
          </button>
        </section>
      </div>

      <section className="panel action-panel">
        <div className="panel-head">
          <div>
            <h3>A practical path forward</h3>
            <p>Start where the return is clear and the change is manageable.</p>
          </div>
          <span className="action-badge">
            <Icon.spark /> Recommended
          </span>
        </div>
        <div className="action-steps">
          <div className="action-step">
            <span className="idx">01</span>
            <div className="body">
              <strong>Map the everyday</strong>
              <p>
                Map your own week — or bring in anyone who helps you run the
                business.
              </p>
            </div>
            <button className="go">
              Explore <Icon.arrow />
            </button>
          </div>
          <div className="action-step">
            <span className="idx">02</span>
            <div className="body">
              <strong>Choose one workflow</strong>
              <p>
                {byCat[0].label} is your clearest starting point, with{" "}
                {fmt(byCat[0].hours)} of weekly opportunity.
              </p>
            </div>
            <button className="go">
              Explore <Icon.arrow />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* --------------------------------------------------------------- time map */

function TimeMapView({
  role,
  onRole,
  hours,
  onHours,
  mapToast,
  onSave,
}: {
  role: Role;
  onRole: (r: Role) => void;
  hours: Record<string, number>;
  onHours: (h: Record<string, number>) => void;
  mapToast: boolean;
  onSave: () => void;
}) {
  const lib = useMemo(() => LIBRARY.filter(t => t.role === role), [role]);
  const total = Object.values(hours).reduce((a, b) => a + (Number(b) || 0), 0);

  return (
    <div className="page task-page">
      <div className="page-head">
        <div>
          <div className="eyebrow">Map your week</div>
          <h1>Map your time</h1>
          <p>
            A quick estimate is enough. There are no right answers — just your
            working reality.
          </p>
        </div>
        <div className="map-total">
          <span>Mapped each week</span>
          <strong className="num">{fmt(total)}</strong>
        </div>
      </div>

      <div className="role-switcher">
        <span>My business is a</span>
        {ROLES.map(r => (
          <button
            key={r}
            className={role === r ? "selected" : ""}
            onClick={() => onRole(r)}
          >
            {r}
          </button>
        ))}
      </div>

      <section className="panel task-list-panel">
        <div className="panel-head">
          <div>
            <h3>Where does your week go?</h3>
            <p>
              Use the fields to estimate hours. Leave blank if you don't do a
              task.
            </p>
          </div>
          <span className="task-count">{lib.length} common tasks</span>
        </div>
        <div className="task-entries">
          {lib.map(t => (
            <div className="task-entry" key={t.id}>
              <div className="task-entry-copy">
                <span className={`cat-dot cat-${t.cat}`} />
                <div>
                  <strong>{t.name}</strong>
                  <p>{t.desc}</p>
                </div>
              </div>
              <div className="hours-input">
                <input
                  type="number"
                  min={0}
                  max={80}
                  step={0.5}
                  value={hours[t.id] ?? ""}
                  placeholder="0"
                  onChange={e => {
                    const next = { ...hours };
                    if (e.target.value === "") delete next[t.id];
                    else next[t.id] = Number(e.target.value);
                    onHours(next);
                  }}
                />
                <span>hrs / wk</span>
              </div>
            </div>
          ))}
        </div>
        <div className="task-footer">
          <span className="note">
            <Icon.shield /> Demo data — changes are not saved.
          </span>
          <button className="button primary" onClick={onSave}>
            {mapToast ? "Saved" : "Save my time map"} <Icon.check />
          </button>
        </div>
      </section>

      <div className="human-note">
        <Icon.target />
        <div>
          <strong>Business Time Back protects your highest-value work.</strong>
          <span>
            These estimates identify opportunities — the parts only you can do
            stay with you.
          </span>
        </div>
      </div>
    </div>
  );
}
