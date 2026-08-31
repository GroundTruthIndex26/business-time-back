/** Better Work, Visible: keep the product landing page warm, light, and human-centered. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { ReactElement } from "react";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./legal.css";
import "./github-pages.css";
import { APP_ROOT } from "./lib/sitePaths";
import Home from "./pages/Home";
import { AboutPage, FaqPage, HowItWorksPage, VsTimeTrackingPage } from "./pages/Doc";
import { PrivacyPage, TermsPage } from "./pages/Legal";

/** Content routes, matched with and without the trailing slash. */
const ROUTES: [string, () => ReactElement][] = [
  ["/how-it-works", HowItWorksPage],
  ["/business-time-back-vs-time-tracking", VsTimeTrackingPage],
  ["/faq", FaqPage],
  ["/about", AboutPage],
  ["/privacy", PrivacyPage],
  ["/terms", TermsPage],
];

function Router() {
  const base = APP_ROOT === "/" ? "" : APP_ROOT.replace(/\/$/, "");
  return (
    <WouterRouter base={base}>
      <Switch>
        <Route path="/" component={Home} />
        {ROUTES.flatMap(([path, Component]) => [
          <Route key={path} path={path} component={Component} />,
          <Route key={`${path}/`} path={`${path}/`} component={Component} />,
        ])}
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
