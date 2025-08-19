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
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b0d12] via-[#0a0f1c] to-[#0b0d12]" />
          <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_60%)]" />
          <div className="absolute top-1/2 -translate-y-1/2 right-[-10rem] h-[24rem] w-[24rem] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.16),transparent_60%)]" />
          <div className="absolute bottom-[-10rem] left-1/2 -translate-x-1/2 h-[30rem] w-[30rem] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.12),transparent_60%)]" />
        </div>
        {children}
      </body>
    </html>
  )
}