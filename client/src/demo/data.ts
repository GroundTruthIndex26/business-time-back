/**
 * Sample data for the landing-page demo workspace ("Rivertown Goods").
 * Ported verbatim from the live Business Time Back demo.
 */

export type CatKey =
  | "admin"
  | "inventory"
  | "service"
  | "marketing"
  | "fulfillment";

export const CAT: Record<CatKey, string> = {
  admin: "Admin & bookkeeping",
  inventory: "Inventory & ops",
  service: "Customer service",
  marketing: "Marketing",
  fulfillment: "Fulfillment & shipping",
};

export const ROLES = [
  "Shop & Retail",
  "Local Service",
  "Ecommerce",
  "Digital Service",
  "Café & Restaurant",
] as const;
export type Role = (typeof ROLES)[number];

export const fmt = (v: number) => `${v.toFixed(1)} hrs`;

export type LibraryTask = {
  id: string;
  role: Role;
  name: string;
  cat: CatKey;
  desc: string;
  rate: number;
};
export type TeamTask = {
  id: string;
  name: string;
  cat: CatKey;
  hours: number;
  rate: number;
  rec: number;
};

export const LIBRARY: LibraryTask[] = [
  {
    id: "l1",
    role: "Shop & Retail",
    name: "Bookkeeping & invoicing",
    cat: "admin",
    desc: "Recording sales, reconciling the register, and paying suppliers.",
    rate: 0.46,
  },
  {
    id: "l2",
    role: "Shop & Retail",
    name: "Stock counts & reordering",
    cat: "inventory",
    desc: "Counting inventory and placing reorders before you run out.",
    rate: 0.48,
  },
  {
    id: "l3",
    role: "Shop & Retail",
    name: "In-store & phone questions",
    cat: "service",
    desc: "Answering product questions and helping customers find what they need.",
    rate: 0.35,
  },
  {
    id: "l4",
    role: "Shop & Retail",
    name: "Social posts & promotions",
    cat: "marketing",
    desc: "Planning posts, promotions, and seasonal displays.",
    rate: 0.5,
  },
  {
    id: "l5",
    role: "Local Service",
    name: "Scheduling & invoicing",
    cat: "admin",
    desc: "Booking jobs, sending invoices, and following up on payment.",
    rate: 0.48,
  },
  {
    id: "l6",
    role: "Local Service",
    name: "Supply & equipment restocking",
    cat: "inventory",
    desc: "Ordering materials and keeping the van or shop stocked.",
    rate: 0.42,
  },
  {
    id: "l7",
    role: "Local Service",
    name: "Client calls & reminders",
    cat: "service",
    desc: "Confirming appointments and answering questions before the job.",
    rate: 0.4,
  },
  {
    id: "l8",
    role: "Local Service",
    name: "Local marketing & referrals",
    cat: "marketing",
    desc: "Posting jobs, asking for reviews, and following up on referrals.",
    rate: 0.45,
  },
  {
    id: "l9",
    role: "Ecommerce",
    name: "Bookkeeping & order reconciliation",
    cat: "admin",
    desc: "Reconciling payouts, fees, and order records.",
    rate: 0.45,
  },
  {
    id: "l10",
    role: "Ecommerce",
    name: "Stock counts & supplier reorders",
    cat: "inventory",
    desc: "Tracking stock levels and reordering from suppliers.",
    rate: 0.48,
  },
  {
    id: "l11",
    role: "Ecommerce",
    name: "Order-status emails & DMs",
    cat: "service",
    desc: 'Answering "where\'s my order" messages and routine questions.',
    rate: 0.55,
  },
  {
    id: "l12",
    role: "Ecommerce",
    name: "Listing updates & ad campaigns",
    cat: "marketing",
    desc: "Updating product listings and running promotions.",
    rate: 0.46,
  },
  {
    id: "l13",
    role: "Ecommerce",
    name: "Packing & shipping orders",
    cat: "fulfillment",
    desc: "Picking, packing, and getting orders out the door.",
    rate: 0.32,
  },
  {
    id: "l14",
    role: "Digital Service",
    name: "Invoicing & bookkeeping",
    cat: "admin",
    desc: "Sending invoices, tracking payments, and reconciling books.",
    rate: 0.5,
  },
  {
    id: "l15",
    role: "Digital Service",
    name: "Tools, files & subscription admin",
    cat: "inventory",
    desc: "Organizing files and managing the software that runs the business.",
    rate: 0.44,
  },
  {
    id: "l16",
    role: "Digital Service",
    name: "Client status updates",
    cat: "service",
    desc: "Check-ins, status emails, and answering routine client questions.",
    rate: 0.42,
  },
  {
    id: "l17",
    role: "Digital Service",
    name: "Proposals & outreach",
    cat: "marketing",
    desc: "Writing proposals and following up with prospective clients.",
    rate: 0.4,
  },
  {
    id: "l18",
    role: "Café & Restaurant",
    name: "Bookkeeping & supplier invoices",
    cat: "admin",
    desc: "Reconciling the till and paying supplier invoices.",
    rate: 0.46,
  },
  {
    id: "l19",
    role: "Café & Restaurant",
    name: "Supplier orders & stock counts",
    cat: "inventory",
    desc: "Ordering ingredients and counting stock before it runs low.",
    rate: 0.5,
  },
  {
    id: "l20",
    role: "Café & Restaurant",
    name: "Questions & reservations",
    cat: "service",
    desc: "Answering calls, messages, and taking reservations.",
    rate: 0.38,
  },
  {
    id: "l21",
    role: "Café & Restaurant",
    name: "Social posts & local promotions",
    cat: "marketing",
    desc: "Posting specials and keeping the page up to date.",
    rate: 0.46,
  },
  {
    id: "l22",
    role: "Café & Restaurant",
    name: "To-go & delivery packing",
    cat: "fulfillment",
    desc: "Packing takeout and delivery orders alongside the rest of service.",
    rate: 0.3,
  },
];

const TEAM_BASE: Omit<TeamTask, "rec">[] = [
  {
    id: "t1",
    name: "Bookkeeping & invoicing",
    cat: "admin",
    hours: 6,
    rate: 0.46,
  },
  {
    id: "t2",
    name: "Scheduling & staff coordination",
    cat: "admin",
    hours: 3,
    rate: 0.42,
  },
  {
    id: "t3",
    name: "Supplier orders & inventory counts",
    cat: "inventory",
    hours: 7,
    rate: 0.5,
  },
  {
    id: "t4",
    name: "Point-of-sale restocking",
    cat: "inventory",
    hours: 3,
    rate: 0.44,
  },
  {
    id: "t5",
    name: "Customer emails & DMs",
    cat: "service",
    hours: 5,
    rate: 0.55,
  },
  {
    id: "t6",
    name: "In-store & phone questions",
    cat: "service",
    hours: 4,
    rate: 0.35,
  },
  {
    id: "t7",
    name: "Returns & exchanges",
    cat: "service",
    hours: 2,
    rate: 0.38,
  },
  {
    id: "t8",
    name: "Social posts & promotions",
    cat: "marketing",
    hours: 4,
    rate: 0.48,
  },
  {
    id: "t9",
    name: "Ad campaigns & listing updates",
    cat: "marketing",
    hours: 3,
    rate: 0.45,
  },
  {
    id: "t10",
    name: "Packing & shipping online orders",
    cat: "fulfillment",
    hours: 6,
    rate: 0.32,
  },
];

export const TEAM: TeamTask[] = TEAM_BASE.map(t => ({
  ...t,
  rec: t.hours * t.rate,
}));

/** The signed-in demo viewer's own saved map = the Shop & Retail tasks. */
export const MY_SAVED: Record<string, number> = { l1: 8, l2: 3, l3: 2, l4: 4 };
