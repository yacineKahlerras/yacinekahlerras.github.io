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
    title: "Trending Content",
    year: "2024",
    blurb:
      "News aggregator pulling live Google News headlines, categorised and tunable by region and article volume. Stripe for payments, Firebase Auth for accounts.",
    stack: ["Next.js", "Stripe", "Firebase"],
    url: "https://trendingcontent.com/",
    image: "./images/projects/trending-content.png",
    tools: ["Next.js", "React", "Node.js", "Firebase"],
  },
  {
    title: "Radio Stations AI",
    year: "2024",
    blurb:
      "Generates scripts with GPT, converts them to speech, and compiles the audio into playlists stored securely in Firebase.",
    stack: ["Next.js", "GPT", "Tailwind"],
    url: "https://radiostation.ai/news",
    image: "./images/projects/radiostation.png",
    tools: ["Next.js", "Tailwind", "Node.js", "Firebase", "Python"],
  },
];

export type ToolGroup =
  | "Frontend"
  | "Backend"
  | "Data"
  | "Infra"
  | "Language";

export type Tool = { name: string; group: ToolGroup; note: string };

export const tools: Tool[] = [
  { name: "Next.js", group: "Frontend", note: "App router and SSR — my default for new builds" },
  { name: "React", group: "Frontend", note: "Where most of my UI thinking lives" },
  { name: "Tailwind", group: "Frontend", note: "Styling without leaving the markup" },
  { name: "Node.js", group: "Backend", note: "Services, scripts and glue" },
  { name: "NestJS", group: "Backend", note: "When a project needs real structure" },
  { name: "Express", group: "Backend", note: "Small APIs, quickly" },
  { name: "MongoDB", group: "Data", note: "Document stores and fast iteration" },
  { name: "PostgreSQL", group: "Data", note: "When the data has real relationships" },
  { name: "Firebase", group: "Infra", note: "Auth, storage and hosting on client work" },
  { name: "Python", group: "Language", note: "Scripting, data wrangling, AI glue" },
];

/** tools genuinely used together — these become the graph's edges */
export const toolEdges: [string, string][] = [
  ["React", "Next.js"],
  ["Next.js", "Tailwind"],
  ["Next.js", "Node.js"],
  ["Node.js", "Express"],
  ["Node.js", "NestJS"],
  ["Express", "MongoDB"],
  ["NestJS", "PostgreSQL"],
  ["Next.js", "Firebase"],
  ["Firebase", "Node.js"],
  ["Python", "Node.js"],
  ["React", "Tailwind"],
  ["MongoDB", "Node.js"],
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
