/** Shared GitHub Pages waitlist dialog that calls a server-side Supabase Edge Function. */
import { getEmailValidationMessage } from "@/lib/emailValidation";
import { APP_ROOT } from "@/lib/sitePaths";
import { ArrowRight, Check, Mail, X } from "lucide-react";
import { FormEvent, ReactNode, useEffect, useId, useState } from "react";
import "@/waitlist.css";
import "@/waitlist-success.css";
import "@/waitlist-success-override.css";
import "@/waitlist-validation.css";
import "@/github-waitlist.css";

type WaitlistSource =
  | "header"
  | "hero"
  | "story"
  | "commercial"
  | "closing"
  | "pricing"
  | "comparison";
const FUNCTION_URL =
  "https://wmpttwpkybynwisdsljl.supabase.co/functions/v1/launch-waitlist";

export function LaunchSignupDialog({
  children,
  className,
  source,
  open: controlledOpen,
  onOpenChange,
}: {
  children?: ReactNode;
  className?: string;
  source: WaitlistSource;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const open = controlledOpen ?? uncontrolledOpen;
  const successIsNew =
    message ===
    "You’re on the list. We’ll let you know when Business Time Back launches.";

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDialogOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  function setDialogOpen(nextOpen: boolean) {
    if (controlledOpen === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
    if (!nextOpen) {
      setMessage(null);
      setEmail("");
      setValidationError(null);
      setIsSubmitting(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextValidationError = getEmailValidationMessage(email);
    if (nextValidationError) {
      setValidationError(nextValidationError);
      return;
    }
    setValidationError(null);
    setMessage(null);
    setIsSubmitting(true);
    try {
      const response = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok)
        throw new Error(
          result?.error ||
            "We couldn’t save your request. Please try again shortly."
        );
      setMessage(
        result?.isNew === false
          ? "You’re already on the list. We’ll be in touch at launch."
          : "You’re on the list. We’ll let you know when Business Time Back launches."
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "We couldn’t save your request. Please try again shortly."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {children && (
        <button
          className={className}
          type="button"
          onClick={() => setDialogOpen(true)}
        >
          {children}
        </button>
      )}
      {open && (
        <div
          className="waitlist-overlay"
          role="presentation"
          onMouseDown={() => setDialogOpen(false)}
        >
          <section
            className="waitlist-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${inputId}-title`}
            aria-describedby={`${inputId}-description`}
            onMouseDown={event => event.stopPropagation()}
          >
            <button
              className="waitlist-dialog__close"
              type="button"
              onClick={() => setDialogOpen(false)}
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div className="waitlist-dialog__header">
              <span className="waitlist-dialog__eyebrow">
                <Mail size={14} /> Launch notification
              </span>
              <h2 id={`${inputId}-title`}>
                Be first to know when better work is visible.
              </h2>
              <p id={`${inputId}-description`}>
                Leave your email and we’ll let you know when Business Time Back
                is ready to explore.
              </p>
            </div>
            {message && !isSubmitting && !message.startsWith("We couldn’t") ? (
              <div
                className="waitlist-dialog__success"
                role="status"
                aria-live="polite"
              >
                <div className="waitlist-success__mark" aria-hidden="true">
                  <span>
                    <Check size={27} strokeWidth={2.5} />
                  </span>
                  <i />
                  <b />
                </div>
                <div className="waitlist-success__copy">
                  <p className="waitlist-success__eyebrow">
                    Launch note reserved
                  </p>
                  <h3>
                    {successIsNew
                      ? "You’re on the list."
                      : "You’re already on the list."}
                  </h3>
                  <p>{message}</p>
                  <small>
                    Until then, you can keep exploring the example on this page.
                  </small>
                </div>
                <button
                  className="waitlist-success__return"
                  type="button"
                  onClick={() => setDialogOpen(false)}
                >
                  Back to the demo <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <form
                className="waitlist-dialog__form"
                onSubmit={submit}
                noValidate
              >
                <label htmlFor={inputId}>Work email</label>
                <input
                  id={inputId}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={event => {
                    const next = event.target.value;
                    setEmail(next);
                    if (validationError)
                      setValidationError(getEmailValidationMessage(next));
                  }}
                  onBlur={() =>
                    setValidationError(getEmailValidationMessage(email))
                  }
                  aria-invalid={Boolean(validationError)}
                  aria-describedby={validationError ? errorId : undefined}
                  disabled={isSubmitting}
                />
                {validationError && (
                  <p
                    id={errorId}
                    className="waitlist-dialog__error"
                    role="alert"
                  >
                    {validationError}
                  </p>
                )}
                {message && (
                  <p className="waitlist-dialog__error" role="alert">
                    {message}
                  </p>
                )}
                <button
                  className="waitlist-dialog__submit"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Saving my place…"
                  ) : (
                    <>
                      Claim my early access <ArrowRight size={16} />
                    </>
                  )}
                </button>
                <p className="waitlist-dialog__privacy">
                  No payment required to join. We will use this email only for
                  launch and relevant Business Time Back updates. No activity
                  tracking. <a href={`${APP_ROOT}privacy`}>Privacy policy</a>
                </p>
              </form>
            )}
          </section>
        </div>
      )}
    </>
  );
}
