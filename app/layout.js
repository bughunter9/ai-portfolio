import './globals.css'
import { ThemeProvider } from 'next-themes'

export const metadata = {
  title: 'Portfolio | Full‑Stack Developer',
  description: 'Dark, performant, single‑page portfolio built with Next.js and Tailwind',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}