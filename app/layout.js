import "./globals.css";

export const metadata = {
  title: "Manroop Singh | Portfolio",
  description: "SPA portfolio built with Next.js and Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-background text-foreground antialiased">
        {/* Global gradient background */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          {/* Aurora Teal/Lime palette */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#061a17] via-[#0a2a22] to-[#061a17]" />
          {/* Accent glows */}
          <div className="absolute -top-28 -left-24 h-[30rem] w-[30rem] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.28),transparent_62%)]" />
          <div className="absolute top-1/3 right-[-12rem] h-[26rem] w-[26rem] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.20),transparent_62%)]" />
          <div className="absolute bottom-[-12rem] left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.24),transparent_62%)]" />
        </div>
        {children}
      </body>
    </html>
  );
}
