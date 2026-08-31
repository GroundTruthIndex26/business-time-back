/**
 * Business Time Back — every word on the site lives here.
 *
 * Copy uses a tiny inline markup handled by <Rich> in components/Rich.tsx:
 *   [label](/path)  → link      **bold** → <strong>
 * Everything else is plain text. Edit freely; no JSX required.
 */

/* ------------------------------------------------------------------ brand */

export const BRAND = {
  name: "Business Time Back",
  parent: "Phronesis Labs, LLC",
  parentShort: "Phronesis Labs",
  parentUrl: "https://phronesislabs.net/",
  siblingProduct: "AI Job Risk Check",
  siblingProductUrl: "https://aijobriskcheck.com",
  email: "hello@phronesislabs.net",
  legalEmail: "hello@phronesislabs.net",
  origin: "https://businesstimeback.com",
  ogImage: "https://businesstimeback.com/og.png",
  updated: "Updated August 2026",
  copyright: "© 2026 Phronesis Labs, LLC",
};

export const NAV = [
  { href: "/how-it-works/", label: "How it works" },
  { href: "/business-time-back-vs-time-tracking/", label: "vs Time tracking" },
  { href: "/faq/", label: "FAQ" },
  { href: "/about/", label: "About" },
];

export const FOOTER_LINKS = [
  ...NAV,
  { href: "/privacy/", label: "Privacy" },
  { href: "/terms/", label: "Terms" },
];

/* ------------------------------------------------------- per-route <head> */

export type PageMeta = { title: string; description: string; path: string };

export const META: Record<string, PageMeta> = {
  home: {
    path: "/",
    title:
      "Business Time Back — Win Back Hours for Your Small Business, by Phronesis Labs",
    description:
      "Business Time Back helps small business owners see where their week actually goes — admin, inventory, customer service, marketing, fulfillment — and plan how to win back hours for growing the business.",
  },
  howItWorks: {
    path: "/how-it-works/",
    title: "How Business Time Back works: see where your week goes",
    description:
      "Business Time Back maps your week at the task level — admin, inventory, customer service, marketing, fulfillment — shows how many hours are recoverable, and helps you plan one high-value change. Here is the method, step by step.",
  },
  vsTimeTracking: {
    path: "/business-time-back-vs-time-tracking/",
    title: "Business Time Back vs. time tracking: what's the difference?",
    description:
      "A time tracker records how hours were spent. Business Time Back estimates where your week goes by task and turns that into a plan for recovering time. Here is how the two differ, and when to use which.",
  },
  faq: {
    path: "/faq/",
    title: "Business Time Back FAQ: time intelligence, privacy, and setup",
    description:
      "What Business Time Back is, how it differs from time tracking, how it treats privacy, how long setup takes, and who it is for.",
  },
  about: {
    path: "/about/",
    title: "Who makes Business Time Back? | Phronesis Labs",
    description:
      "Business Time Back is built by Phronesis Labs, LLC — a thought lab and idea incubator founded by Brooke Houck, PhD.",
  },
  privacy: {
    path: "/privacy/",
    title: "Privacy Policy | Business Time Back",
    description:
      "How Business Time Back, a product of Phronesis Labs, LLC, collects, uses, and protects your data — and the rights you have over it.",
  },
  terms: {
    path: "/terms/",
    title: "Terms of Service | Business Time Back",
    description:
      "The terms that govern your use of Business Time Back, a product of Phronesis Labs, LLC.",
  },
};

/* ------------------------------------------------------------------ home */

export const HOME = {
  hero: {
    crumbs: [
      { label: "Phronesis Labs", href: BRAND.parentUrl },
      { label: "Business Time Back" },
    ],
    title: "Win back hours for your small business",
    sub: "Business Time Back is a time-intelligence tool from Phronesis Labs for small business owners — running a shop, a local service business, an online store, or a digital service. It shows you where your week actually goes — admin, inventory, customer service, marketing, and fulfillment — and turns that into a concrete plan to win back hours for growing the business or serving customers directly.",
    cta: "Show me my opportunities",
  },

  what: {
    eyebrow: "What it is",
    heading: "What is Business Time Back?",
    lead: "Business Time Back is a time-intelligence tool from Phronesis Labs, built for small business owners — whether you run a shop, a local service business, an online store, or a digital service. It helps you see where your week actually goes, and turn that picture into a concrete plan to win back hours for the work that matters most.",
    body: [
      "It works from the task level up. Instead of guessing, you map a quick estimate of the hours you spend on the tasks that come with running a small business — admin and bookkeeping, inventory, customer service, marketing, and fulfillment. Those estimates roll up into a clear picture of how much time is recoverable, where the biggest opportunities are, and which single change is worth making first.",
      "The goal is more hours for growing the business and serving customers directly — not another productivity guilt trip. Recovered hours can go toward the work only you can do — sales, relationships, and the reason you started the business — rather than get swallowed by the operational side of running it. Whether that time becomes growth or a lighter week is your call; the tool just makes it visible.",
    ],
  },

  howItWorks: {
    eyebrow: "How it works",
    heading: "Three steps, from a rough estimate to a plan",
    cards: [
      {
        n: "01",
        title: "Map the everyday",
        body: "Estimate your weekly hours across the tasks that make up running the business — admin, inventory, customer service, marketing, and fulfillment. A rough estimate is enough — precision matters less than direction.",
      },
      {
        n: "02",
        title: "See what's recoverable",
        body: "Your time map rolls up into recoverable hours by area of the business, and ranks the areas with the biggest opportunity to win time back.",
      },
      {
        n: "03",
        title: "Plan one move",
        body: "Model a focused change on the highest-value area, and start where the return is clear and the change is manageable.",
      },
    ],
    footnote:
      "The estimates come from a curated task library and a workforce model — the same one behind Phronesis Labs' [AI Job Risk Check](https://aijobriskcheck.com) — not a promise that any specific hour disappears.",
  },

  beforeAfter: {
    eyebrow: "Transform your week",
    heading: "From stuck in operations to focused on growth",
    before: {
      title: "Before",
      stat: "40-50%",
      caption: "of your week lost to admin, inventory, and operations",
      points: [
        "Constant firefighting",
        "No time for strategic work",
        "Growth stalled by busywork",
        "Team management neglected",
      ],
    },
    after: {
      title: "After using Business Time Back",
      stat: "15-25%",
      caption: "time on operations with one focused change",
      points: [
        "Clear visibility into where hours go",
        "Prioritized, high-impact improvements",
        "5-10 hours/week recovered",
        "Time for growth and relationships",
      ],
    },
  },

  useCases: {
    eyebrow: "Who it's for",
    heading: "Any small business that loses hours to running itself",
    intro:
      "Business Time Back fits owners who wear every hat — physical or online. A few examples:",
    items: [
      {
        title: "Shop & retail owners",
        body: "Less time on stock counts and reordering, more time on the floor with customers.",
      },
      {
        title: "Local service businesses",
        body: "Less time on scheduling and invoicing, more time on the job that pays.",
      },
      {
        title: "Ecommerce sellers",
        body: "Less time on order-status messages and listing upkeep, more time growing the catalog.",
      },
      {
        title: "Digital service providers",
        body: "Less time on admin and status updates, more time on billable, high-value work.",
      },
      {
        title: "Cafés & restaurants",
        body: "Less time on supplier orders and scheduling, more time on the food and the room.",
      },
      {
        title: "Solo owners & small teams",
        body: "A clear picture of where the week actually goes — and one change worth making first.",
      },
    ],
  },

  limits: {
    eyebrow: "Honest limits",
    heading: "What it doesn't do",
    items: [
      {
        icon: "shield" as const,
        title: "It's not surveillance.",
        body: "Business Time Back works from your own self-reported estimates — not activity tracking, keystroke logging, or screen monitoring, even if you have people helping you run things.",
      },
      {
        icon: "target" as const,
        title: "Estimates are directional.",
        body: "They identify opportunities and rank them; they don't guarantee a specific number of hours saved.",
      },
      {
        icon: "spark" as const,
        title: "It won't replace judgment.",
        body: "The point is to protect the work only you can do — sales, relationships, and the parts of the business you built it for — and hand back the busywork.",
      },
    ],
  },

  testimonials: {
    eyebrow: "Social proof",
    heading: "What small business owners say",
    items: [
      {
        quote:
          "I recovered 8 hours a week just by seeing where my time actually goes. This paid for itself in two weeks.",
        initials: "MJ",
        name: "Maria Johnson",
        role: "Ecommerce Store Owner",
      },
      {
        quote:
          "Finally, a tool that doesn't just track time — it helps me win it back. Changed how I run my business.",
        initials: "DR",
        name: "David Rodriguez",
        role: "Local Service Business Owner",
      },
      {
        quote:
          "As someone who does everything, this gave me permission to stop doing 3 things that were costing me 10 hours a week.",
        initials: "SA",
        name: "Sarah Anderson",
        role: "Café Owner",
      },
    ],
    videoEyebrow: "See it in action",
    videoLabel:
      "[Video: Small business owner walks through their Business Time Back workspace and shares results]",
  },

  pricing: {
    eyebrow: "Simple pricing",
    heading: "Choose your plan",
    ctaLabel: "Join the pre-launch list",
    ctaNote: "Not on sale yet — join the list for 35% off at launch.",
    plans: [
      {
        name: "Starter",
        currency: "$",
        amount: "29",
        period: "/month",
        desc: "Perfect for solo owners just getting started",
        features: [
          "Full time mapping tool",
          "Recoverable hours analysis",
          "Email support",
          "3 business models included",
        ],
        featured: false,
        contact: false,
      },
      {
        name: "Professional",
        currency: "$",
        amount: "79",
        period: "/month",
        desc: "For growing small businesses and teams",
        features: [
          "Everything in Starter, plus:",
          "Team workspace (up to 5 people)",
          "Custom scenarios and modeling",
          "Priority support",
          "Monthly strategy calls",
        ],
        featured: true,
        badge: "Most Popular",
        contact: false,
      },
      {
        name: "Enterprise",
        customPrice: "Custom pricing",
        desc: "For complex organizations or custom needs",
        features: [
          "Everything in Professional, plus:",
          "Unlimited team members",
          "Custom integrations",
          "Dedicated support",
          "Custom data models",
        ],
        featured: false,
        contact: true,
        contactLabel: "Contact sales",
        contactNote: "Let's talk about your needs",
      },
    ],
    guarantee: {
      title: "Not on sale yet",
      body: [
        "**You can't buy Business Time Back today.** We're pre-launch, so the form below collects emails from people who want in — nothing more. No card, no charge, no trial clock running.",
        "**Everyone on the pre-launch list gets 35% off** when plans open, on whichever plan they choose.",
        "Once plans do go on sale, they carry a **30-day full refund**: if Business Time Back doesn't save you hours, we refund 100% of your first month.",
      ],
    },
  },

  demoGate: {
    heading: "See your opportunities in action",
    sub: "Explore a fully-populated sample workspace. No credit card needed.",
    placeholder: "your@email.com",
    button: "Access live demo",
    busyButton: "Launching demo...",
    note: "No credit card required • 35% off at launch for everyone on this list • Unsubscribe anytime",
  },

  securityBadges: [
    { icon: "shield" as const, label: "No Activity Tracking" },
    { icon: "lock" as const, label: "SSL Encrypted" },
    { icon: "trash" as const, label: "Delete Your Data Anytime" },
  ],

  comparison: {
    eyebrow: "How it compares",
    heading: "Business Time Back vs. time tracking",
    intro:
      'Time trackers record hours after the fact. Business Time Back estimates where hours go **by task** and shows what\'s recoverable. One answers "what happened," the other answers "what to change first."',
    columns: [
      "",
      "Time Intelligence\n(Business Time Back)",
      "Time Tracking\n(Toggl, Harvest, etc.)",
      "Activity Monitoring",
    ],
    rows: [
      [
        "Core question",
        "Where do hours go, and what should we change first?",
        "How many hours went to which client or task?",
        "What is each person doing right now?",
      ],
      [
        "Data source",
        "Quick self-estimates by task",
        "Manual logs or timers",
        "Screens, apps, keystrokes",
      ],
      [
        "Time frame",
        "Forward-looking: plan a change",
        "Backward-looking: record what happened",
        "Real-time surveillance",
      ],
      [
        "Best for",
        "Finding and recovering lost capacity",
        "Billing, timesheets, project costing",
        "(Not recommended)",
      ],
    ],
    advice: [
      {
        title: "When to use a time tracker",
        body: "You need billable hours, per-person timesheets, or project costing. Tools like Toggl or Harvest are built for this.",
      },
      {
        title: "When to use Business Time Back",
        body: "You want to see where your week goes and decide what to change — without installing timers or monitoring anyone. Many small business owners use both.",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Frequently asked questions",
    items: [
      {
        q: "What is Business Time Back?",
        a: "A time-intelligence tool from Phronesis Labs for small business owners. It shows you where your week goes across admin, inventory, customer service, marketing, and fulfillment, then helps you plan how to win back hours for growing the business.",
      },
      {
        q: "How is it different from time tracking?",
        a: "Time trackers record what already happened, often by monitoring activity. Business Time Back starts from your own quick self-estimates by task, and focuses on what time is recoverable and what single change to make first — not on surveilling anyone.",
      },
      {
        q: "Does it track me automatically?",
        a: "No. It uses self-reported estimates, not activity tracking, keystrokes, or screen monitoring — for you or for anyone helping you run the business.",
      },
      {
        q: 'What does "recoverable hours" mean?',
        a: "An estimate of the time spent on tasks that could be reduced or streamlined, based on a curated task library — not a promise those hours vanish. Whether recovered time becomes growth, a lighter week, or something else is your call.",
      },
      {
        q: "How accurate are the estimates?",
        a: "They're directional. A quick estimate is enough to surface where the biggest opportunities are; precision matters less than direction.",
      },
      {
        q: "Who makes it?",
        a: "Phronesis Labs, a thought lab and idea incubator founded by Brooke Houck, PhD, building on the same workforce model behind the AI Job Risk Check.",
      },
      {
        q: "What if I'm not satisfied?",
        a: "We offer a full 30-day refund guarantee. If Business Time Back doesn't help you find and plan for recoverable hours in your first month, we'll refund 100% of your subscription cost — no questions asked.",
      },
    ],
  },

  about: {
    eyebrow: "Who's behind it",
    heading: "Built by Phronesis Labs",
    body: [
      "Business Time Back is built by [Phronesis Labs, LLC](https://phronesislabs.net/) — a thought lab and idea incubator founded by Brooke Houck, PhD. It's built on the same workforce model behind the AI Job Risk Check, applied to how small business owners spend their week.",
      "Questions or ideas? [hello@phronesislabs.net](mailto:hello@phronesislabs.net)",
    ],
  },
};

/* ------------------------------------------------------------- subpages */

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "lead"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "steps"; items: { title: string; body: string }[] }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "faq"; items: { q: string; a: string; open?: boolean }[] }
  | { kind: "cta"; label: string; href: string };

export type ContentPage = {
  crumb: string;
  h1: string;
  blocks: Block[];
};

const TRY_CTA: Block = {
  kind: "cta",
  label: "Try Business Time Back →",
  href: "/",
};

export const HOW_IT_WORKS_PAGE: ContentPage = {
  crumb: "How it works",
  h1: "How does Business Time Back show where your week goes?",
  blocks: [
    {
      kind: "lead",
      text: "Business Time Back is a time-intelligence tool for small business owners. It works from the task level up: instead of guessing, you map a quick estimate of the hours you spend running the business, and those estimates roll up into a clear picture of what time is recoverable and what to change first.",
    },
    { kind: "h2", text: "The task-level approach" },
    {
      kind: "p",
      text: 'Most time data is either too coarse to act on ("I\'m just busy") or too invasive to trust (activity monitoring). Business Time Back sits in between. It asks you for rough, self-reported estimates of weekly time across the tasks that come with running a small business — admin, inventory, customer service, marketing, and fulfillment — and turns those into a clear picture. No timers, no keystroke logging, no screen capture.',
    },
    { kind: "h2", text: "Three steps, from a rough estimate to a plan" },
    {
      kind: "steps",
      items: [
        {
          title: "Map the everyday",
          body: "Estimate your weekly hours across the tasks that make up running the business. A rough estimate is enough — direction matters more than precision, and the whole thing takes a few minutes.",
        },
        {
          title: "See what's recoverable",
          body: "Your time map rolls up into recoverable hours by area of the business, and ranks the areas with the biggest opportunity — so you can see where the time actually goes, not where you assumed it did.",
        },
        {
          title: "Plan one move",
          body: "Model a focused change on the single highest-value area, and start where the return is clear and the change is manageable. One deliberate move beats a dozen vague intentions.",
        },
      ],
    },
    { kind: "h2", text: "What you see" },
    {
      kind: "p",
      text: "The estimates never surface as surveillance. They roll up into a clear picture: total recoverable hours, a breakdown by area of the business (admin, inventory, customer service, marketing, and fulfillment), and a ranked list of where a change would return the most time. The output is a decision aid, not a scorecard.",
    },
    { kind: "h2", text: "The model behind the numbers" },
    {
      kind: "p",
      text: "The estimates draw on a curated task library and the same workforce model behind Phronesis Labs' [AI Job Risk Check](https://aijobriskcheck.com), applied to how small business owners spend their week. The numbers are directional — they identify and rank opportunities. They are not a promise that any specific hour disappears; whether recovered time becomes growth, a lighter week, or something else is your call, not one the tool makes for you.",
    },
    { kind: "h2", text: "What it does not do" },
    {
      kind: "p",
      text: "It is not surveillance, and it does not track activity. It will not tell you a guaranteed number of hours saved, and it does not decide what to do with recovered time. For the full comparison, see [Business Time Back vs. time tracking](/business-time-back-vs-time-tracking/).",
    },
    TRY_CTA,
  ],
};

export const VS_TIME_TRACKING_PAGE: ContentPage = {
  crumb: "vs. Time tracking",
  h1: "Business Time Back vs. time tracking: what's the difference?",
  blocks: [
    {
      kind: "lead",
      text: 'Short version: a time tracker records how hours were spent, usually after the fact and often per person. Business Time Back estimates where your week goes by task and turns that into a plan for recovering time. One answers "what happened," the other answers "what to change first."',
    },
    {
      kind: "h2",
      text: 'Three different things people mean by "tracking time"',
    },
    {
      kind: "table",
      head: [
        "",
        "Time intelligence\n(Business Time Back)",
        "Time tracking\n(Toggl, Harvest, etc.)",
        "Activity monitoring",
      ],
      rows: [
        [
          "Core question",
          "Where do our hours go, and what should we change first?",
          "How many hours went to which client or task?",
          "What is each person doing right now?",
        ],
        [
          "Data source",
          "Quick self-estimates by task and role",
          "Manual logs or timers",
          "Screens, apps, keystrokes",
        ],
        [
          "Time frame",
          "Forward-looking: plan a change",
          "Backward-looking: record what happened",
          "Real-time surveillance",
        ],
        [
          "Unit",
          "Your week, by area of the business",
          "Per person, per project",
          "Per person, continuous",
        ],
        [
          "Best for",
          "Finding and recovering lost capacity",
          "Billing, timesheets, project costing",
          "(Not what we do)",
        ],
      ],
    },
    { kind: "h2", text: "When to use which" },
    {
      kind: "p",
      text: "**Use a time tracker** when you need billable hours, per-person timesheets, or project costing. That is what tools like Toggl or Harvest are built for.",
    },
    {
      kind: "p",
      text: "**Use Business Time Back** when you want to see where your week actually goes and decide what to change — without installing timers or monitoring anyone. It is a planning tool, not a timesheet. See [how it works](/how-it-works/).",
    },
    {
      kind: "p",
      text: "They are not mutually exclusive: plenty of small business owners keep a tracker for billing and use Business Time Back to find and recover lost capacity.",
    },
    { kind: "h2", text: "Why not just monitor activity?" },
    {
      kind: "p",
      text: "Activity-monitoring software promises precision but buys it with surveillance, and it changes behavior the moment people know it is on. Business Time Back deliberately trades that false precision for honest, directional estimates you're actually willing to give — because the goal is a plan you trust, not a scorecard that adds guilt to your week.",
    },
    TRY_CTA,
  ],
};

export const FAQ_PAGE: ContentPage = {
  crumb: "FAQ",
  h1: "Business Time Back — frequently asked questions",
  blocks: [
    {
      kind: "lead",
      text: "What it is, how it differs from time tracking, how it treats privacy, and who it is for.",
    },
    {
      kind: "faq",
      items: [
        {
          open: true,
          q: "What is Business Time Back?",
          a: "Business Time Back is a time-intelligence tool from Phronesis Labs for small business owners. It shows you where your week goes across admin, inventory, customer service, marketing, and fulfillment, then helps you plan how to win back hours for growing the business. It works from quick self-estimates, not activity monitoring.",
        },
        {
          q: "How is it different from time tracking?",
          a: "Time trackers record what already happened, often by monitoring activity or requiring you to log hours. Business Time Back starts from your own quick self-estimates by task, then focuses on what time is recoverable and which single change to make first. It is forward-looking planning, not a timesheet or a surveillance log. See [Business Time Back vs. time tracking](/business-time-back-vs-time-tracking/).",
        },
        {
          q: "Does Business Time Back track me automatically?",
          a: "No. It does not track activity, log keystrokes, or capture screens. It works entirely from self-reported estimates, whether that's just you or a couple of people helping you run the business.",
        },
        {
          q: "What does 'recoverable hours' mean?",
          a: "Recoverable hours are an estimate of time spent on tasks that could be reduced or streamlined, based on a curated task library and workforce model. It is a directional signal of opportunity, not a promise those hours vanish. Whether recovered time becomes growth, a lighter week, or something else is your call.",
        },
        {
          q: "How long does it take to set up?",
          a: "You answer a short set of estimates in a few minutes. There is no integration to install and no build step; you can get a first clear picture the same day.",
        },
        {
          q: "Is my data private?",
          a: "Business Time Back works from self-reported estimates rather than monitored activity, and the inputs roll up into a simple view for you. It is designed to inform a plan, not to profile you or anyone helping you.",
        },
        {
          q: "Who is it for?",
          a: "Small business owners who wear a lot of hats — running a shop, a local service business, an online store, or a digital service. It's most useful where admin, inventory, customer service, marketing, and fulfillment eat into the time you'd rather spend on customers and growth.",
        },
        {
          q: "Will it guarantee a number of hours saved?",
          a: "No. The estimates identify and rank opportunities; they do not guarantee a specific number of hours saved. The point is to show where a change would return the most time and to help you plan the first one.",
        },
        {
          q: "Who makes Business Time Back?",
          a: "Phronesis Labs, a thought lab and idea incubator founded by Brooke Houck, PhD, built on the same workforce model behind the AI Job Risk Check. Read more [about the maker](/about/).",
        },
      ],
    },
    TRY_CTA,
  ],
};

export const ABOUT_PAGE: ContentPage = {
  crumb: "About",
  h1: "Who makes Business Time Back?",
  blocks: [
    {
      kind: "lead",
      text: "Business Time Back is built by [Phronesis Labs, LLC](https://phronesislabs.net/) — a thought lab and idea incubator founded by Brooke Houck, PhD.",
    },
    { kind: "h2", text: "The maker" },
    {
      kind: "p",
      text: "Phronesis Labs builds tools that leave people better off. Its founder, Brooke Houck, PhD, is a researcher in educational measurement and assessment with a career spent building fair, transparent, defensible ways to judge professional competence and lead the responsible use of AI in regulated settings. Business Time Back applies that same discipline — honest measurement, agency over fear — to how small business owners spend their week.",
    },
    { kind: "h2", text: "The test every Phronesis Labs product has to pass" },
    {
      kind: "p",
      text: "Before anything gets built, it has to answer two questions with a yes: does it leave people better off, and does it make money without keeping people afraid, confused, or dependent? Business Time Back is built to hand small business owners a clearer picture and a plan — not to surveil anyone or add another guilt trip to an already full week.",
    },
    { kind: "h2", text: "Where it comes from" },
    {
      kind: "p",
      text: "Business Time Back is built on the same workforce model behind Phronesis Labs' [AI Job Risk Check](https://aijobriskcheck.com), applied to the task level so small business owners can see where their week goes and plan how to [win time back](/how-it-works/) for growing the business.",
    },
    { kind: "h2", text: "Contact" },
    {
      kind: "p",
      text: "Questions, feedback, or ideas? Email [hello@phronesislabs.net](mailto:hello@phronesislabs.net), or read more about the lab at [phronesislabs.net](https://phronesislabs.net/).",
    },
    TRY_CTA,
  ],
};

/* ------------------------------------------------------------ legal pages */

export const PRIVACY_PAGE: ContentPage = {
  crumb: "Privacy Policy",
  h1: "Privacy Policy",
  blocks: [
    { kind: "lead", text: "Last updated: July 28, 2026" },
    {
      kind: "p",
      text: 'Business Time Back is a product of Phronesis Labs, LLC ("we," "us," "our"). This Privacy Policy explains what data we collect, why we collect it, and what rights you have over it.',
    },
    {
      kind: "p",
      text: "We wrote this policy to be read, not skimmed. It's short on purpose.",
    },

    { kind: "h2", text: "Our Core Privacy Promise" },
    {
      kind: "p",
      text: "We believe in your right to privacy and your right to your own data. We will never sell or share your data with a third party. You have the right to request your own data for as long as we have it. You also have the right to delete it at any time.",
    },
    {
      kind: "p",
      text: "That's the part that matters most. The rest of this document explains how we live up to it.",
    },

    { kind: "h2", text: "What We Collect" },
    {
      kind: "p",
      text: "When you use Business Time Back, operated by Phronesis Labs, LLC, we collect only what's needed to provide the experience or respond to a request:",
    },
    {
      kind: "ul",
      items: [
        "Your email address, if you choose to give it to us to be notified at launch or to contact us about a team plan.",
        "Your role and task estimates, if you choose to provide them in a Business Time Back experience.",
        "Your results, including any opportunity map or change plan generated from the information you choose to provide.",
        "Payment information, if paid services are offered. Payment processing is handled by the relevant payment processor; we do not store card numbers.",
      ],
    },

    { kind: "h2", text: "Why We Collect It" },
    { kind: "p", text: "We use your data to:" },
    {
      kind: "ul",
      items: [
        "Provide and improve the Business Time Back experience",
        "Send you launch notifications or information you specifically request",
        "Respond to customer support inquiries",
        "Improve the product using aggregated, de-identified patterns, never your individual data tied to you",
      ],
    },
    {
      kind: "p",
      text: "That's it. We do not use your data for advertising, profiling, training models for resale, or any purpose unrelated to delivering the service you asked us to provide.",
    },

    { kind: "h2", text: "Who We Share It With" },
    {
      kind: "p",
      text: "Short answer: nobody, except the service providers we need to operate.",
    },
    {
      kind: "p",
      text: "The companies that help us run Business Time Back may have access to limited data only to do their job. We will identify applicable providers as part of the live service. None may sell your data, and we do not share it with anyone outside the providers needed to run the service.",
    },
    {
      kind: "p",
      text: "We will never sell your data. We will never give it to data brokers. We will never share it with advertisers. We will never trade it. If we are ever acquired or merged into another company, your data rights as described in this policy will transfer with the acquisition, and we will notify you in advance of any material change.",
    },

    { kind: "h2", text: "Your Rights" },
    { kind: "p", text: "You have the right to:" },
    {
      kind: "ul",
      items: [
        "Request a copy of your data at any time, for as long as we have it. Email us and we will send you everything we have about you within 30 days.",
        "Correct your data if any of it is wrong.",
        "Delete your data at any time. Email us and we will delete your account and all associated data within 30 days. Some information may remain in backup systems for a short additional period before being permanently purged.",
        "Opt out of future communications. Reply to any email we send you or email us directly.",
      ],
    },
    {
      kind: "p",
      text: "If you are a resident of California, the European Union, the United Kingdom, or another jurisdiction with specific privacy laws, you may have additional rights. Email us and we will honor them.",
    },

    { kind: "h2", text: "How Long We Keep It" },
    {
      kind: "p",
      text: "We keep your data as long as you have an account with us or as long as you want us to keep it. There is no automatic expiration. If you want it deleted, ask us and we will delete it.",
    },

    { kind: "h2", text: "Security" },
    {
      kind: "p",
      text: "We protect your data using industry-standard encryption in transit and at rest. We use trusted infrastructure providers that maintain appropriate security practices. No system is perfectly secure, and we cannot guarantee absolute protection against every possible threat. If we ever experience a data breach that affects you, we will notify you as required by applicable law.",
    },

    { kind: "h2", text: "Children" },
    {
      kind: "p",
      text: "Business Time Back is not directed at children under 18. We do not knowingly collect data from anyone under 18. If you believe a minor has provided us with information, please email us and we will delete it.",
    },

    { kind: "h2", text: "Changes to This Policy" },
    {
      kind: "p",
      text: 'If we change this policy, we will update the "Last updated" date at the top and email registered users about material changes before they take effect. Minor wording clarifications may be made without notice.',
    },

    { kind: "h2", text: "Questions" },
    {
      kind: "p",
      text: "If you have any questions about this policy or how we handle your data, email us at [hello@phronesislabs.net](mailto:hello@phronesislabs.net).",
    },
    {
      kind: "p",
      text: "Business Time Back is a product of Phronesis Labs, LLC, registered in North Carolina, United States.",
    },
    {
      kind: "p",
      text: "Read the related document: [Terms of Service](/terms/)",
    },
  ],
};

export const TERMS_PAGE: ContentPage = {
  crumb: "Terms of Service",
  h1: "Terms of Service",
  blocks: [
    { kind: "lead", text: "Last updated: August 5, 2026" },
    {
      kind: "p",
      text: 'Business Time Back is a product of Phronesis Labs, LLC ("we," "us," "our"). These Terms of Service govern your use of our website and services. By using Business Time Back, you agree to these terms.',
    },
    {
      kind: "p",
      text: "We tried to write these in plain English. If anything is unclear, email us.",
    },

    { kind: "h2", text: "What You Get" },
    {
      kind: "p",
      text: "Business Time Back offers an interactive demonstration and may offer team plans or related services. The scope, access, payment, and delivery terms for any paid service will be presented before you make a purchase. We will not convert a purchase into a subscription or charge you again unless we explicitly tell you and you actively agree.",
    },

    { kind: "h2", text: "What This Service Is (And Isn't)" },
    {
      kind: "p",
      text: "Business Time Back is a workforce time-intelligence tool. It uses self-reported task estimates to help teams see recurring work patterns and consider a focused workflow improvement.",
    },
    {
      kind: "p",
      text: "It is not employment monitoring, performance scoring, professional financial advice, or legal advice. It does not predict individual performance, guarantee time savings, or promise that any specific workflow change will produce a particular result.",
    },

    { kind: "h2", text: "Using the Service" },
    {
      kind: "p",
      text: "Business Time Back may allow you to explore an illustrative experience without creating an account or password. If you use the service, you confirm that you are at least 18 years old, that the information you provide is accurate to the best of your knowledge, and that you are using the service for yourself or on behalf of an organization with appropriate permission.",
    },

    { kind: "h2", text: "Payment" },
    {
      kind: "p",
      text: "Any payment terms for a Business Time Back service will be shown before checkout. If payment processing is made available, it may be handled by a third-party processor. If a payment fails or is reversed through a chargeback, fraud claim, or similar process, we may suspend access until the matter is resolved.",
    },

    { kind: "h2", text: "Refunds" },
    {
      kind: "p",
      text: "Any applicable refund terms will be shown before you buy a paid Business Time Back service. Contact us if you have a question about a purchase or a refund request.",
    },

    { kind: "h2", text: "Acceptable Use" },
    { kind: "p", text: "When you use Business Time Back, you agree not to:" },
    {
      kind: "ul",
      items: [
        "Use the service for any unlawful purpose",
        "Attempt to gain unauthorized access to our systems",
        "Scrape, copy, or republish our content without permission",
        "Use automated tools to interact with our service in ways that disrupt it",
        "Resell, redistribute, or use our content for commercial purposes without written permission",
        "Impersonate someone else when using the service",
      ],
    },
    {
      kind: "p",
      text: "We may suspend or terminate your access if you violate these terms.",
    },

    { kind: "h2", text: "Our Content" },
    {
      kind: "p",
      text: "The text, design, logos, methodology, and materials generated by Business Time Back are our intellectual property or that of our service providers. You may use materials supplied to you for your organization's internal planning. You may not republish, resell, or use them for unrelated commercial purposes without our written permission. You retain ownership of the information you provide; we have a limited license to use it solely to deliver the service, as described in our Privacy Policy.",
    },

    { kind: "h2", text: "Service Availability" },
    {
      kind: "p",
      text: "We try to keep Business Time Back available, but we cannot guarantee uninterrupted service. We may experience downtime for maintenance, updates, or unexpected technical issues. We are not liable for losses resulting from service interruptions.",
    },

    { kind: "h2", text: "Disclaimers and Limitations" },
    {
      kind: "p",
      text: "To the maximum extent permitted by law, Business Time Back and Phronesis Labs, LLC will not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost income, lost opportunities, or operational outcomes that result from your use of the service. Our total liability to you for any claim related to the service will not exceed the total amount you paid us in the twelve months before the claim.",
    },

    { kind: "h2", text: "Changes to These Terms" },
    {
      kind: "p",
      text: 'We may update these terms. If we make material changes, we will update the "Last updated" date and email users who have given us an email address before the changes take effect. Continued use of the service after the change means you accept the new terms.',
    },

    { kind: "h2", text: "Governing Law" },
    {
      kind: "p",
      text: "These terms are governed by the laws of the State of North Carolina, United States, without regard to its conflict of law principles. Any dispute will be resolved in the state or federal courts located in North Carolina.",
    },

    { kind: "h2", text: "Ending Your Relationship With Us" },
    {
      kind: "p",
      text: "You can stop using Business Time Back at any time. To delete your data, see our Privacy Policy or email us. We may terminate your access for violating these terms.",
    },

    { kind: "h2", text: "Questions" },
    {
      kind: "p",
      text: "If you have any questions about this agreement, email us at [hello@phronesislabs.net](mailto:hello@phronesislabs.net).",
    },
    {
      kind: "p",
      text: "Business Time Back is a product of Phronesis Labs, LLC, registered in North Carolina, United States.",
    },
    {
      kind: "p",
      text: "Read the related document: [Privacy Policy](/privacy/)",
    },
  ],
};
