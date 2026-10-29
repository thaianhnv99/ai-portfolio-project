import type { Metadata } from "next"
import { ThemeProvider } from "@/components/layout/ThemeProvider"
import { ScrollToTop } from "@/components/shared/ScrollToTop"
import ChatWidget from "@/components/chat/ChatWidget"
import { profile } from "@/data/profile"
import "./globals.css"

// Возвращаем метаданные на место — это важно для поиска и рекрутеров
export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
  keywords: ["Frontend", "React", "Next.js", "Angular", "TypeScript", "Portfolio"],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
    // url: "https://..." — добавь свой домен, когда выкатишь на прод
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Оставляем Devicon для иконок технологий */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      {/* Класс antialiased делает шрифты визуально более сглаженными и аккуратными */}
      <body className="antialiased">
        {/* Закрываем пропсы ThemeProvider нормально, без сокращений */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
        <ScrollToTop />
        <ChatWidget />
      </body>
    </html>
  )
}