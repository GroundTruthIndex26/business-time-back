/** Resolves route and asset paths for both the GitHub project preview and the custom domain. */
export const APP_ROOT =
  typeof window !== "undefined" &&
  window.location.hostname.endsWith("github.io")
    ? "/business-time-back/"
    : "/";

/** Router base for wouter: "" on the custom domain, "/business-time-back" on GitHub Pages. */
export const ROUTER_BASE = APP_ROOT === "/" ? "" : APP_ROOT.replace(/\/$/, "");

/** Prefix a site-absolute path ("/og.png") with the deploy root. */
export function asset(path: string): string {
  return `${APP_ROOT}${path.replace(/^\//, "")}`;
}
