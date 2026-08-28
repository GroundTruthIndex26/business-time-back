/** Resolves static asset and route paths for both the GitHub project preview and custom domain. */
export const APP_ROOT = typeof window !== "undefined" && window.location.hostname.endsWith("github.io") ? "/business-time-back/" : "/";
export const ASSET_PATH = `${APP_ROOT}assets/`;
