"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { portfolio } from "@/lib/portfolio.config";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  Twitter,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

// Lightweight parallax and reveal engine
function useParallaxAndReveal() {
  const rafRef = useRef(0);
  const listenersRef = useRef([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      const revealItems = document.querySelectorAll("[data-reveal]");
      revealItems.forEach((el) =>
        el.classList.add("opacity-100", "translate-y-0")
      );
      return;
    }

    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const parallaxItems = document.querySelectorAll("[data-parallax]");
        const revealItems = document.querySelectorAll("[data-reveal]");
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        parallaxItems.forEach((el) => {
          const speed = parseFloat(el.getAttribute("data-parallax") || "0.2");
          const offset = scrollY * speed;
          el.style.transform = `translate3d(0, ${offset}px, 0)`;
        });

        revealItems.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < vh * 0.9) {
            el.classList.add("opacity-100", "translate-y-0");
          }
        });
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
      listenersRef.current = [];
    };
  }, []);
}

const Section = ({ id, title, children }) => {
  return (
    <section id={id} className="container py-20 sm:py-28 scroll-mt-24">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          {title}
        </h2>
        <div className="h-px w-1/2 bg-gradient-to-r from-cyan-400/50 via-fuchsia-400/40 to-orange-400/0" />
      </div>
      {children}
    </section>
  );
};

const NavLink = ({ href, children }) => {
  return (
    <a
      href={href}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
    </a>
  );
};

export default function App() {
  const [open, setOpen] = useState(false);
  useParallaxAndReveal();

  const social = useMemo(
    () =>
      [
        { href: portfolio.contact.github, label: "GitHub", icon: Github },
        { href: portfolio.contact.linkedin, label: "LinkedIn", icon: Linkedin },
        { href: portfolio.contact.medium, label: "Medium", icon: Twitter },
        {
          href: `mailto:${portfolio.contact.email}`,
          label: "Email",
          icon: Mail,
        },
        { href: `tel:${portfolio.contact.phone}`, label: "Phone", icon: Phone },
      ].filter((s) => !!s.href),
    []
  );

  return (
    <main id="top" className="relative overflow-x-clip">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <a href="#top" className="font-semibold tracking-tight">
            {portfolio.meta.name}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-8 w-8 items-center justify-center rounded-md border bg-card/60 hover:bg-card"
            aria-label="Toggle Menu"
          >
            <span className="sr-only">Toggle Menu</span>
            <div className="relative h-3.5 w-4">
              <span
                className="absolute inset-x-0 top-0 h-0.5 bg-foreground transition-all"
                style={{
                  transform: open
                    ? "translateY(6px) rotate(45deg)"
                    : "translateY(0) rotate(0)",
                }}
              />
              <span
                className="absolute inset-x-0 top-1/2 h-0.5 bg-foreground transition-opacity"
                style={{ opacity: open ? 0 : 1, transform: "translateY(-50%)" }}
              />
              <span
                className="absolute inset-x-0 bottom-0 h-0.5 bg-foreground transition-all"
                style={{
                  transform: open
                    ? "translateY(-6px) rotate(-45deg)"
                    : "translateY(0) rotate(0)",
                }}
              />
            </div>
          </button>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#achievements">Achievements</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#education">Education</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>
          <a
            href={`mailto:${portfolio.contact.email}`}
            className="text-sm rounded-md border bg-card/60 px-3 py-1.5 hover:bg-card transition-colors"
          >
            Let’s talk
          </a>
        </div>
      </header>

      {/* Mobile Sheet */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-64 border-l bg-background p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="h-8 w-8 inline-flex items-center justify-center rounded-md border bg-card/60 hover:bg-card"
              >
                ✕
              </button>
            </div>
            <nav className="mt-6 grid gap-4">
              <a
                href="#skills"
                onClick={() => setOpen(false)}
                className="text-sm"
              >
                Skills
              </a>
              <a
                href="#experience"
                onClick={() => setOpen(false)}
                className="text-sm"
              >
                Experience
              </a>
              <a
                href="#achievements"
                onClick={() => setOpen(false)}
                className="text-sm"
              >
                Achievements
              </a>
              <a
                href="#projects"
                onClick={() => setOpen(false)}
                className="text-sm"
              >
                Projects
              </a>
              <a
                href="#education"
                onClick={() => setOpen(false)}
                className="text-sm"
              >
                Education
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="text-sm"
              >
                Contact
              </a>
            </nav>
            <a
              href={`mailto:${portfolio.contact.email}`}
              className="mt-6 inline-flex rounded-md border bg-card/60 px-3 py-2 text-sm hover:bg-card"
            >
              Let’s talk
            </a>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center">
        {/* Background effects */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
        >
          <div
            data-parallax="0.12"
            className="absolute -top-32 -left-32 h-80 w-80 rounded-full blur-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent"
          />
          <div
            data-parallax="0.18"
            className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl bg-gradient-to-tr from-purple-500/20 via-fuchsia-400/10 to-transparent"
          />
          <div
            data-parallax="0.08"
            className="absolute top-1/3 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full blur-3xl bg-gradient-to-br from-cyan-400/10 to-transparent"
          />
        </div>

        <div className="container relative z-10 grid gap-8 md:grid-cols-1 items-center">
          {/* Super-light grid overlay mask */}
          <div
            aria-hidden
            className="pointer-events-none absolute -z-10 inset-0"
          >
            <div className="h-full w-full [mask-image:radial-gradient(circle_at_center,black_30%,transparent_70%)] opacity-[0.06]">
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                {[...Array(40)].map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={i * 40}
                    y1="0"
                    x2={i * 40}
                    y2="100%"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-white"
                  />
                ))}
                {[...Array(20)].map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="0"
                    y1={i * 40}
                    x2="100%"
                    y2={i * 40}
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-white"
                  />
                ))}
              </svg>
            </div>
          </div>
          <div className="flex flex-col items-center" data-reveal>
            <p className="text-sm uppercase tracking-widest text-muted-foreground">
              {portfolio.meta.title}
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.25)]">
                {portfolio.meta.name}
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {portfolio.meta.tagline}
              </span>
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {social.map((s) => {
                const Icon = s.icon;
                return (
                  <Link
                    key={s.label}
                    href={s.href || "#"}
                    target="_blank"
                    className="group inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-3 py-2 text-sm hover:bg-card transition-colors"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span>{s.label}</span>
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                );
              })}
            </div>
            <div className="mt-4">
              <Link
                href={portfolio.meta.resumeUrl || "#"}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 backdrop-blur px-4 py-2 text-sm hover:bg-white/20 transition-colors"
              >
                See my resume <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* <div className="md:col-span-5" data-reveal>
            <div className="relative w-full h-full max-w-[420px] mx-auto">
                <Image src={"/manOnTable.svg"} alt="bbbbbbbbbbbbbb" height={600} width={600} />
            </div>
          </div> */}
        </div>
      </section>

      {/* Skills */}
      <Section id="skills" title="Skills">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.skills?.map((s, i) => (
            <div
              key={s.name + i}
              data-reveal
              className="opacity-0 translate-y-6 transition-all duration-700"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="group rounded-lg border border-white/10 bg-white/5 backdrop-blur-md px-4 py-5 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{s.name}</p>
                  <span className="text-xs text-muted-foreground">
                    {s.level}%
                  </span>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience">
        <div className="grid gap-6">
          {portfolio.experience?.map((e, i) => (
            <div
              key={e.company + i}
              data-reveal
              className="opacity-0 translate-y-6 transition-all duration-700"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">{e.role}</p>
                    <p className="text-muted-foreground">{e.company}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{e.period}</p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {e.summary}
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {e.highlights?.map((h, hi) => (
                    <li key={hi} className="text-sm flex items-start gap-2">
                      <span>{"- " + h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Achievements & Certifications */}
      <Section id="achievements" title="Achievements & Certifications">
        <div className="grid gap-5 md:grid-cols-2">
          <div
            className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-5"
            data-reveal
          >
            <p className="font-semibold">Achievements</p>
            <ul className="mt-3 grid gap-2">
              {portfolio.achievements?.map((a, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  <a
                    href={a.link || "#"}
                    target="_blank"
                    className="hover:underline"
                  >
                    {a.title}{" "}
                    <span className="text-muted-foreground">
                      — {a.by} ({a.year})
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-5"
            data-reveal
          >
            <p className="font-semibold">Certifications</p>
            <ul className="mt-3 grid gap-2">
              {portfolio.certifications?.map((c, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  <a
                    href={c.link || "#"}
                    target="_blank"
                    className="hover:underline"
                  >
                    {c.name}{" "}
                    <span className="text-muted-foreground">
                      — {c.issuedBy} ({c.year})
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.projects?.map((p, i) => (
            <div
              key={p.name + i}
              data-reveal
              className="opacity-0 translate-y-6 transition-all duration-700"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors">
                <div className="p-5 min-h-32">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {p.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech?.map((t, ti) => (
                      <span
                        key={ti}
                        className="rounded-md border border-border/60 bg-secondary/20 px-2 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 pb-5">
                  <Link
                    href={p.link || "#"}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    View Project <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-2xl transition-transform duration-500 group-hover:translate-y-4"
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section id="education" title="Education">
        <div className="grid gap-4 sm:grid-cols-2">
          {portfolio.education?.map((ed, i) => (
            <div
              key={ed.school + i}
              data-reveal
              className="opacity-0 translate-y-6 transition-all duration-700"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-5">
                <p className="text-lg font-semibold">{ed.school}</p>
                <p className="text-sm text-muted-foreground">{ed.degree}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {ed.period}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <div className="grid gap-6 md:grid-cols-1">
          <div
            data-reveal
            className="opacity-0 translate-y-6 transition-all duration-700"
          >
            <p className="text-muted-foreground">
              I’m open to interesting freelance and full‑time opportunities.
              Reach me via email or phone, or read my thoughts on Medium.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href={`mailto:${portfolio.contact.email}`}
                className="rounded-md border bg-card/60 px-3 py-2 text-sm hover:bg-card transition-colors inline-flex items-center gap-2"
              >
                <Mail className="h-4 w-4" /> {portfolio.contact.email}
              </Link>
              <Link
                href={`tel:${portfolio.contact.phone}`}
                className="rounded-md border bg-card/60 px-3 py-2 text-sm hover:bg-card transition-colors inline-flex items-center gap-2"
              >
                <Phone className="h-4 w-4" /> {portfolio.contact.phone}
              </Link>
              <Link
                href={portfolio.contact.medium}
                target="_blank"
                className="rounded-md border bg-card/60 px-3 py-2 text-sm hover:bg-card transition-colors inline-flex items-center gap-2"
              >
                Medium <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* <div className="relative" aria-hidden>
            <div className="absolute -top-10 right-10 h-40 w-40 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 blur-2xl" />
            <Image src={"/contactMailDark.svg"} alt="bbbb" height="600" width="500" />
          </div> */}
        </div>
      </Section>

      {/* Footer */}
      <footer className="pb-12">
        <div className="container text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {portfolio.meta.name}. Built with Next.js
          and Tailwind.
        </div>
      </footer>
    </main>
  );
}
