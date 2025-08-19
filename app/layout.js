import './globals.css'

export const metadata = {
  title: 'Portfolio | Full‑Stack Developer',
  description: 'Dark, performant, single‑page portfolio built with Next.js and Tailwind',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}