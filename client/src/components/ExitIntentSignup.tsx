/** Presents the shared waitlist form once per desktop session when a visitor shows exit intent. */
import { useEffect, useState } from "react";
import { LaunchSignupDialog } from "./LaunchSignupDialog";

export const EXIT_INTENT_DELAY_MS = 12_000;
const EXIT_INTENT_STORAGE_KEY = "btb-exit-intent-presented";

export function shouldOpenExitSignup(
  event: Pick<MouseEvent, "clientY" | "relatedTarget">,
  isArmed: boolean,
  hasBeenPresented: boolean,
) {
  return isArmed && !hasBeenPresented && event.clientY <= 10 && !event.relatedTarget;
}

export function ExitIntentSignup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.sessionStorage.getItem(EXIT_INTENT_STORAGE_KEY)) return;

    let isArmed = false;
    let hasBeenPresented = false;
    const armTimer = window.setTimeout(() => {
      isArmed = true;
    }, EXIT_INTENT_DELAY_MS);

    const handleMouseOut = (event: MouseEvent) => {
      if (!shouldOpenExitSignup(event, isArmed, hasBeenPresented)) return;
      hasBeenPresented = true;
      window.sessionStorage.setItem(EXIT_INTENT_STORAGE_KEY, "true");
      setOpen(true);
    };

    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return <LaunchSignupDialog open={open} onOpenChange={setOpen} source="closing" className="exit-intent-trigger" />;
}
