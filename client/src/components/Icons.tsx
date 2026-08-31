/** Inline SVG icon set, matched to the live Business Time Back markup. */
import { SVGProps } from "react";

const stroke: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const Icon = {
  clock: (p: SVGProps<SVGSVGElement>) => (
    <svg {...stroke} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  arrow: (p: SVGProps<SVGSVGElement>) => (
    <svg {...stroke} {...p}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  eye: (p: SVGProps<SVGSVGElement>) => (
    <svg {...stroke} {...p}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  shield: (p: SVGProps<SVGSVGElement>) => (
    <svg {...stroke} {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  dash: (p: SVGProps<SVGSVGElement>) => (
    <svg {...stroke} {...p}>
      <rect x="3" y="3" width="7" height="9" />
      <rect x="14" y="3" width="7" height="5" />
      <rect x="14" y="12" width="7" height="9" />
      <rect x="3" y="16" width="7" height="5" />
    </svg>
  ),
  users: (p: SVGProps<SVGSVGElement>) => (
    <svg {...stroke} {...p}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
    </svg>
  ),
  chevron: (p: SVGProps<SVGSVGElement>) => (
    <svg {...stroke} {...p}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  ),
  spark: (p: SVGProps<SVGSVGElement>) => (
    <svg {...stroke} {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" />
    </svg>
  ),
  logout: (p: SVGProps<SVGSVGElement>) => (
    <svg {...stroke} {...p}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  ),
  menu: (p: SVGProps<SVGSVGElement>) => (
    <svg {...stroke} {...p}>
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  ),
  file: (p: SVGProps<SVGSVGElement>) => (
    <svg {...stroke} {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M9 13h6M9 17h4" />
    </svg>
  ),
  trend: (p: SVGProps<SVGSVGElement>) => (
    <svg {...stroke} {...p}>
      <path d="m3 17 6-6 4 4 8-8M21 7h-6M21 7v6" />
    </svg>
  ),
  target: (p: SVGProps<SVGSVGElement>) => (
    <svg {...stroke} {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  ),
  reset: (p: SVGProps<SVGSVGElement>) => (
    <svg {...stroke} {...p}>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  ),
  zap: (p: SVGProps<SVGSVGElement>) => (
    <svg {...stroke} {...p}>
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  ),
  check: (p: SVGProps<SVGSVGElement>) => (
    <svg {...stroke} strokeWidth={3} {...p}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  briefcase: (p: SVGProps<SVGSVGElement>) => (
    <svg {...stroke} {...p}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  info: (p: SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      {...p}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  /** Solid shield used by the trust badges under the demo gate. */
  shieldSolid: (p: SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...p}>
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
    </svg>
  ),
};

export type IconName = keyof typeof Icon;

/** The wordmark badge used in the page header and demo chrome. */
export function BrandMark(props: SVGProps<SVGSVGElement>) {
  return <Icon.clock {...props} />;
}
