export const portfolio = {
  meta: {
    name: "Your Name",
    title: "Full‑Stack Developer (Frontend‑heavy)",
    tagline: "I design and build performant web apps with delightful UX",
    location: "City, Country",
    resumeUrl: "#",
  },
  contact: {
    email: "you@example.com",
    phone: "+1 234 567 890",
    medium: "https://medium.com/@yourhandle",
    github: "https://github.com/yourhandle",
    linkedin: "https://www.linkedin.com/in/yourhandle/",
    twitter: "https://twitter.com/yourhandle",
  },
  skills: [
    { name: "JavaScript / TypeScript", level: 90 },
    { name: "React / Next.js", level: 90 },
    { name: "Tailwind CSS / shadcn/ui", level: 85 },
    { name: "Node.js / Express", level: 80 },
    { name: "MongoDB / SQL", level: 75 },
    { name: "Testing (Jest/RTL)", level: 70 },
    { name: "CI/CD & DevOps", level: 65 },
  ],
  experience: [
    {
      company: "Acme Inc.",
      role: "Senior Frontend Engineer",
      period: "2023 — Present",
      summary: "Led the frontend architecture for a multi-tenant SaaS with design system and performance budget.",
      highlights: [
        "Shipped SSR+ISR Next.js app & cut TTFB by 40%",
        "Built component library with shadcn/ui and tokens",
        "Introduced automated a11y checks & Lighthouse gating",
      ],
    },
    {
      company: "Globex",
      role: "Full‑Stack Engineer",
      period: "2021 — 2023",
      summary: "Developed feature-rich dashboards and backend APIs with Node and MongoDB.",
      highlights: [
        "Implemented data virtualization for 100k+ rows",
        "Reduced bundle by 30% via code‑splitting",
        "Designed RBAC and caching strategy",
      ],
    },
  ],
  projects: [
    {
      name: "Design System Boilerplate",
      description: "Composable tokens + primitives starter kit using Tailwind and shadcn/ui.",
      tech: ["Next.js", "Tailwind", "Radix"],
      link: "https://github.com/yourhandle/design-system-starter",
    },
    {
      name: "Analytics Dashboard",
      description: "Real‑time charts, widgets, and alerts with WebSockets.",
      tech: ["Next.js", "Recharts", "Socket"],
      link: "https://github.com/yourhandle/analytics-dashboard",
    },
    {
      name: "Content Platform",
      description: "MDX publishing pipeline with image optimization and search.",
      tech: ["Next.js", "MDX", "Algolia"],
      link: "https://github.com/yourhandle/content-platform",
    },
  ],
  education: [
    {
      school: "University of Somewhere",
      degree: "B.Tech in Computer Science",
      period: "2016 — 2020",
    },
  ],
};