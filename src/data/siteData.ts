export const EMAIL = "kahlerasse@gmail.com";
export const LINKEDIN =
  "https://www.linkedin.com/in/yacine-kahlerras-30248a1b2";
export const GITHUB = "https://github.com/yacineKahlerras";

export type Project = {
  title: string;
  year: string;
  blurb: string;
  stack: string[];
  url: string;
  image: string;
  /** tools this shipped with — drives the links in the stack graph */
  tools: string[];
};

export const projects: Project[] = [
  {
    title: "GameOn Management",
    year: "2026",
    blurb:
      "Offline-first management for a gaming lounge. Timed sessions on PCs and consoles, a snack POS, cash/card/debt checkout, and a per-PC lock agent. Runs with the internet completely unplugged: no cloud, no accounts, no fees. ~255 automated tests.",
    stack: ["React", "FastAPI", "SQLite", "PySide6"],
    url: "https://github.com/yacineKahlerras/gameon-management",
    image: "./images/projects/gameon-management.png",
    tools: ["React", "TypeScript", "FastAPI", "SQLite", "Python"],
  },
  {
    title: "Zayer Budgeting",
    year: "2026",
    blurb:
      "A fast, private, offline-first budgeting app for tracking money across wallets and currencies. Balances are derived from the ledger, never edited behind your back. No accounts, no sync, everything on-device. 184 tests passing.",
    stack: ["React Native", "Expo", "SQLite"],
    url: "https://github.com/yacineKahlerras/zayer-budgeting",
    image: "./images/projects/zayer-budgeting.png",
    tools: ["React Native", "TypeScript", "SQLite"],
  },
];

export type ToolGroup = "Frontend" | "Backend" | "Data" | "Infra" | "Language";

export type Tool = { name: string; group: ToolGroup; note: string };

export const tools: Tool[] = [
  {
    name: "Next.js",
    group: "Frontend",
    note: "App router and SSR, my default for new builds",
  },
  {
    name: "React",
    group: "Frontend",
    note: "Where most of my UI thinking lives",
  },
  {
    name: "React Native",
    group: "Frontend",
    note: "One codebase, both app stores",
  },
  {
    name: "Tailwind",
    group: "Frontend",
    note: "Styling without leaving the markup",
  },
  { name: "Node.js", group: "Backend", note: "Services, scripts and glue" },
  { name: "FastAPI", group: "Backend", note: "Python APIs with real speed" },
  { name: "Express", group: "Backend", note: "Small APIs, quickly" },
  {
    name: "SQLite",
    group: "Data",
    note: "Local-first storage that just works",
  },
  {
    name: "PostgreSQL",
    group: "Data",
    note: "When the data has real relationships",
  },
  {
    name: "Firebase",
    group: "Infra",
    note: "Auth, storage and hosting on client work",
  },
  {
    name: "Python",
    group: "Language",
    note: "Scripting, data wrangling, AI glue",
  },
  {
    name: "TypeScript",
    group: "Language",
    note: "Every new project starts typed",
  },
];

/** tools genuinely used together — these become the graph's edges */
export const toolEdges: [string, string][] = [
  ["React", "Next.js"],
  ["Next.js", "Tailwind"],
  ["Next.js", "Node.js"],
  ["Node.js", "Express"],
  ["Next.js", "Firebase"],
  ["Firebase", "Node.js"],
  ["Python", "Node.js"],
  ["React", "Tailwind"],
  ["FastAPI", "Python"],
  ["SQLite", "FastAPI"],
  ["React Native", "React"],
  ["TypeScript", "React"],
  ["TypeScript", "React Native"],
  ["TypeScript", "Node.js"],
  ["PostgreSQL", "Node.js"],
];

export const GROUP_COLORS: Record<ToolGroup, string> = {
  Frontend: "#7cffe8",
  Backend: "#4a9dff",
  Data: "#b98bff",
  Infra: "#ffc46e",
  Language: "#6ee7a8",
};

export const aboutNotes: { tag: string; body: string; big?: boolean }[] = [
  {
    tag: "The short version",
    body: "Startups come to me with a clear idea and nobody free to build it. I take it from a rough brief to something live.",
    big: true,
  },
  {
    tag: "On speed",
    body: "Something live in three weeks beats something perfect in three months. The useful feedback only starts once people can touch it.",
  },
  {
    tag: "On honesty",
    body: "If a feature is a bad idea I'll say so before I build it, not after you've paid for it.",
  },
  {
    tag: "On craft",
    body: "Pages that load before you notice. Forms that don't lose your work. If it works but feels bad, it isn't finished.",
  },
  {
    tag: "Off the clock",
    body: "Chess, gaming, long runs, and cooking things I have not earned the right to attempt.",
  },
];

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "About" },
];
