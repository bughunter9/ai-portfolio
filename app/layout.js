import './globals.css'

export const metadata = {
  title: 'Portfolio | Full‑Stack Developer',
  description: 'Dark, performant, single‑page portfolio built with Next.js and Tailwind',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-background text-foreground antialiased">
        {/* Global gradient background */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          {/* Vibrant dark gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#0b1530] to-[#050816]" />
          {/* Accent glows */}
          <div className="absolute -top-28 -left-24 h-[30rem] w-[30rem] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.28),transparent_62%)]" />
          <div className="absolute top-1/3 right-[-12rem] h-[26rem] w-[26rem] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.24),transparent_62%)]" />
          <div className="absolute bottom-[-12rem] left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.18),transparent_62%)]" />
        </div>
        {children}
      </body>
    </html>
  )
}