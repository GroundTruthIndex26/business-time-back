/** Business Time Back — route table for the marketing site. */
import { ReactElement } from "react";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ROUTER_BASE } from "./lib/sitePaths";
import About from "./pages/About";
import Faq from "./pages/Faq";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import VsTimeTracking from "./pages/VsTimeTracking";

/** Every content route, matched with and without the trailing slash. */
const ROUTES: [string, () => ReactElement][] = [
  ["/how-it-works", HowItWorks],
  ["/business-time-back-vs-time-tracking", VsTimeTracking],
  ["/faq", Faq],
  ["/about", About],
  ["/privacy", Privacy],
  ["/terms", Terms],
];

function Router() {
  return (
    <WouterRouter base={ROUTER_BASE}>
      <Switch>
        <Route path="/" component={Home} />
        {ROUTES.flatMap(([path, Component]) => [
          <Route key={path} path={path} component={Component} />,
          <Route key={`${path}/`} path={`${path}/`} component={Component} />,
        ])}
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
}
