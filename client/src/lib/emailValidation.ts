/** Minimal, user-friendly validation for a practical email address before waitlist submission. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function getEmailValidationMessage(value: string) {
  const email = value.trim();
  if (!email) return "Enter your email address so we know where to send the launch note.";
  if (!EMAIL_PATTERN.test(email)) return "Enter a complete email address, for example your@email.com.";
  return null;
}
