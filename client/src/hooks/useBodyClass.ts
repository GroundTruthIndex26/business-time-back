import { useEffect } from "react";

/**
 * Applies the stylesheet scope for a route. The build stamps the same class
 * onto each pre-rendered page, so this only matters for client-side navigation.
 */
export function useBodyClass(className: "page-home" | "page-doc") {
  useEffect(() => {
    const other = className === "page-home" ? "page-doc" : "page-home";
    document.body.classList.remove(other);
    document.body.classList.add(className);
  }, [className]);
}
