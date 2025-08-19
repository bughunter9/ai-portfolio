'use client'

import { useEffect, useMemo, useRef } from 'react'
import { portfolio } from '@/lib/portfolio.config'
import { ArrowRight, Github, Linkedin, Mail, Phone, Twitter, ExternalLink } from 'lucide-react'
import Link from 'next/link'

// Lightweight parallax and reveal engine
function useParallaxAndReveal() {
  const rafRef = useRef(0)
  const listenersRef = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const parallaxItems = document.querySelectorAll('[data-parallax]')
        const revealItems = document.querySelectorAll('[data-reveal]')
        const scrollY = window.scrollY
        const vh = window.innerHeight

        parallaxItems.forEach((el) => {
          const speed = parseFloat(el.getAttribute('data-parallax') || '0.2')
          const offset = (scrollY * speed)
          el.style.transform = `translate3d(0, ${offset}px, 0)`
        })

        revealItems.forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.top < vh * 0.9) {
            el.classList.add('opacity-100', 'translate-y-0')
          }
        })
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
      listenersRef.current = []
    }
  }, [])
}

const Section = ({ id, title, children }) => {
  return (
    <section id={id} className="container py-20 sm:py-28">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
        <div className="h-px w-1/2 bg-gradient-to-r from-primary/50 to-transparent" />
      </div>
      {children}
    </section>
  )
}

export default function App() {
  useParallaxAndReveal()

  const social = useMemo(() => ([
    { href: portfolio.contact.github, label: 'GitHub', icon: Github },
    { href: portfolio.contact.linkedin, label: 'LinkedIn', icon: Linkedin },
    { href: portfolio.contact.twitter, label: 'Twitter', icon: Twitter },
    { href: `mailto:${portfolio.contact.email}`, label: 'Email', icon: Mail },
    { href: `tel:${portfolio.contact.phone}`, label: 'Phone', icon: Phone },
  ].filter(s => !!s.href)), [])

  return (
    <main className="relative overflow-x-clip">
      {/* Hero */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center">
        {/* Background effects */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40">
          <div data-parallax="0.12" className="absolute -top-32 -left-32 h-80 w-80 rounded-full blur-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
          <div data-parallax="0.18" className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl bg-gradient-to-tr from-purple-500/20 via-fuchsia-400/10 to-transparent" />
          <div data-parallax="0.08" className="absolute top-1/3 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full blur-3xl bg-gradient-to-br from-cyan-400/10 to-transparent" />
        </div>

        <div className="container relative z-10 grid gap-8 md:grid-cols-12 items-center">
          <div className="md:col-span-7" data-reveal>
            <p className="text-sm uppercase tracking-widest text-muted-foreground">{portfolio.meta.title}</p>
            <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              {portfolio.meta.name}
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl">{portfolio.meta.tagline}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {social.map((s) => {
                const Icon = s.icon
                return (
                  <Link key={s.label} href={s.href || '#'} target="_blank" className="group inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-3 py-2 text-sm hover:bg-card transition-colors">
                    <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span>{s.label}</span>
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="md:col-span-5" data-reveal>
            <div className="relative aspect-square w-full max-w-[420px] mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-border/50 to-transparent" />
              <div className="absolute inset-1 rounded-2xl bg-card/60 backdrop-blur border border-border" />
              <div className="absolute inset-0 -z-10" aria-hidden>
                {/* Morphing blob */}
                <svg className="h-full w-full" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.25" />
                    </linearGradient>
                  </defs>
                  <path>
                    <animate attributeName="d" dur="12s" repeatCount="indefinite" values="
                      M300,80 C380,80 500,160 500,300 C500,420 420,520 300,520 C160,520 100,420 100,300 C100,160 220,80 300,80 Z;
                      M300,100 C420,60 520,200 520,300 C520,420 420,520 300,520 C180,520 80,420 80,300 C80,180 180,120 300,100 Z;
                      M300,80 C380,80 500,160 500,300 C500,420 420,520 300,520 C160,520 100,420 100,300 C100,160 220,80 300,80 Z
                    " />
                  </path>
                  <path fill="url(#g1)" opacity="0.6">
                    <animate attributeName="d" dur="12s" repeatCount="indefinite" values="
                      M300,80 C380,80 500,160 500,300 C500,420 420,520 300,520 C160,520 100,420 100,300 C100,160 220,80 300,80 Z;
                      M280,120 C420,80 520,200 520,320 C520,420 420,520 300,520 C180,520 100,440 100,320 C100,200 160,120 280,120 Z;
                      M300,80 C380,80 500,160 500,300 C500,420 420,520 300,520 C160,520 100,420 100,300 C100,160 220,80 300,80 Z
                    " />
                  </path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="h-12 w-7 rounded-full border border-border/60 flex items-start justify-center p-1">
            <div className="h-2 w-2 rounded-full bg-foreground animate-bounce" />
          </div>
        </div>
      </section>

      {/* Skills */}
      &lt;Section id="skills" title="Skills"&gt;
        &lt;div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"&gt;
          {portfolio.skills?.map((s, i) =&gt; (
            &lt;div key={s.name + i} data-reveal className="opacity-0 translate-y-6 transition-all duration-700" style={{ transitionDelay: `${i * 60}ms` }}&gt;
              &lt;div className="group rounded-lg border bg-card/60 backdrop-blur px-4 py-5 hover:bg-card/80 transition-colors"&gt;
                &lt;div className="flex items-center justify-between"&gt;
                  &lt;p className="font-medium"&gt;{s.name}&lt;/p&gt;
                  &lt;span className="text-xs text-muted-foreground"&gt;{s.level}%&lt;/span&gt;
                &lt;/div&gt;
                &lt;div className="mt-3 h-2 w-full rounded-full bg-muted"&gt;
                  &lt;div className="h-2 rounded-full bg-primary" style={{ width: `${s.level}%` }} /&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          ))}
        &lt;/div&gt;
      &lt;/Section&gt;

      {/* Experience */}
      &lt;Section id="experience" title="Experience"&gt;
        &lt;div className="grid gap-6"&gt;
          {portfolio.experience?.map((e, i) =&gt; (
            &lt;div key={e.company + i} data-reveal className="opacity-0 translate-y-6 transition-all duration-700" style={{ transitionDelay: `${i * 80}ms` }}&gt;
              &lt;div className="rounded-lg border bg-card/60 backdrop-blur p-5"&gt;
                &lt;div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"&gt;
                  &lt;div&gt;
                    &lt;p className="text-lg font-semibold"&gt;{e.role}&lt;/p&gt;
                    &lt;p className="text-muted-foreground"&gt;{e.company}&lt;/p&gt;
                  &lt;/div&gt;
                  &lt;p className="text-sm text-muted-foreground"&gt;{e.period}&lt;/p&gt;
                &lt;/div&gt;
                &lt;p className="mt-3 text-sm text-muted-foreground"&gt;{e.summary}&lt;/p&gt;
                &lt;ul className="mt-3 grid gap-2 sm:grid-cols-2"&gt;
                  {e.highlights?.map((h, hi) =&gt; (
                    &lt;li key={hi} className="text-sm flex items-start gap-2"&gt;
                      &lt;span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" /&gt;
                      &lt;span&gt;{h}&lt;/span&gt;
                    &lt;/li&gt;
                  ))}
                &lt;/ul&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          ))}
        &lt;/div&gt;
      &lt;/Section&gt;

      {/* Projects */}
      &lt;Section id="projects" title="Projects"&gt;
        &lt;div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"&gt;
          {portfolio.projects?.map((p, i) =&gt; (
            &lt;div key={p.name + i} data-reveal className="opacity-0 translate-y-6 transition-all duration-700" style={{ transitionDelay: `${i * 90}ms` }}&gt;
              &lt;div className="group relative overflow-hidden rounded-lg border bg-card/60 backdrop-blur"&gt;
                &lt;div className="p-5"&gt;
                  &lt;h3 className="text-lg font-semibold"&gt;{p.name}&lt;/h3&gt;
                  &lt;p className="mt-2 text-sm text-muted-foreground"&gt;{p.description}&lt;/p&gt;
                  &lt;div className="mt-3 flex flex-wrap gap-2"&gt;
                    {p.tech?.map((t, ti) =&gt; (
                      &lt;span key={ti} className="rounded-md border border-border/60 bg-secondary/20 px-2 py-1 text-xs text-muted-foreground"&gt;{t}&lt;/span&gt;
                    ))}
                  &lt;/div&gt;
                &lt;/div&gt;
                &lt;div className="flex items-center justify-between px-5 pb-5"&gt;
                  &lt;Link href={p.link || '#'} target="_blank" className="inline-flex items-center gap-2 text-sm text-primary hover:underline"&gt;
                    View Project &lt;ExternalLink className="h-4 w-4" /&gt;
                  &lt;/Link&gt;
                &lt;/div&gt;
                &lt;div aria-hidden className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-2xl transition-transform duration-500 group-hover:translate-y-4" /&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          ))}
        &lt;/div&gt;
      &lt;/Section&gt;

      {/* Education */}
      &lt;Section id="education" title="Education"&gt;
        &lt;div className="grid gap-4 sm:grid-cols-2"&gt;
          {portfolio.education?.map((ed, i) =&gt; (
            &lt;div key={ed.school + i} data-reveal className="opacity-0 translate-y-6 transition-all duration-700" style={{ transitionDelay: `${i * 70}ms` }}&gt;
              &lt;div className="rounded-lg border bg-card/60 backdrop-blur p-5"&gt;
                &lt;p className="text-lg font-semibold"&gt;{ed.school}&lt;/p&gt;
                &lt;p className="text-sm text-muted-foreground"&gt;{ed.degree}&lt;/p&gt;
                &lt;p className="text-xs text-muted-foreground mt-1"&gt;{ed.period}&lt;/p&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          ))}
        &lt;/div&gt;
      &lt;/Section&gt;

      {/* Contact */}
      &lt;Section id="contact" title="Contact"&gt;
        &lt;div className="grid gap-6 md:grid-cols-2"&gt;
          &lt;div data-reveal className="opacity-0 translate-y-6 transition-all duration-700"&gt;
            &lt;p className="text-muted-foreground"&gt;
              I’m open to interesting freelance and full‑time opportunities. Reach me via email or phone, or read my thoughts on Medium.
            &lt;/p&gt;
            &lt;div className="mt-5 flex flex-wrap items-center gap-3"&gt;
              &lt;Link href={`mailto:${portfolio.contact.email}`} className="rounded-md border bg-card/60 px-3 py-2 text-sm hover:bg-card transition-colors inline-flex items-center gap-2"&gt;
                &lt;Mail className="h-4 w-4" /&gt; {portfolio.contact.email}
              &lt;/Link&gt;
              &lt;Link href={`tel:${portfolio.contact.phone}`} className="rounded-md border bg-card/60 px-3 py-2 text-sm hover:bg-card transition-colors inline-flex items-center gap-2"&gt;
                &lt;Phone className="h-4 w-4" /&gt; {portfolio.contact.phone}
              &lt;/Link&gt;
              &lt;Link href={portfolio.contact.medium} target="_blank" className="rounded-md border bg-card/60 px-3 py-2 text-sm hover:bg-card transition-colors inline-flex items-center gap-2"&gt;
                Medium &lt;ExternalLink className="h-4 w-4" /&gt;
              &lt;/Link&gt;
            &lt;/div&gt;
          &lt;/div&gt;

          &lt;div className="relative" aria-hidden&gt;
            &lt;div data-parallax="0.1" className="absolute -top-10 right-10 h-40 w-40 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 blur-2xl" /&gt;
            &lt;div className="aspect-video rounded-xl border bg-card/50 backdrop-blur" /&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/Section&gt;

      {/* Footer */}
      &lt;footer className="pb-12"&gt;
        &lt;div className="container text-center text-xs text-muted-foreground"&gt;
          © {new Date().getFullYear()} {portfolio.meta.name}. Built with Next.js and Tailwind.
        &lt;/div&gt;
      &lt;/footer&gt;
    &lt;/main&gt;
  )
}