"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useScroll, useMotionValueEvent } from "framer-motion"
import { profile } from "@/data/profile"



const NAV_LINKS = [
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
]

// ─── Переключатель темы ───────────────────────────────────────────────────────
function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="size-9" />

  return (
    <button
    onClick={() => {
      const next = theme === "dark" ? "light" : "dark"
    
      if (!(document as any).startViewTransition) {
        setTheme(next)
        return
      }
    
      ;(document as any).startViewTransition(() => {
        document.documentElement.classList.remove("dark", "light")
        document.documentElement.classList.add(next)
        setTheme(next)
      })
    }}
      aria-label="Toggle theme"
      className="flex items-center justify-center size-9 rounded-lg cursor-pointer
        border border-border/40 text-muted-foreground
        hover:border-border hover:text-foreground hover:bg-muted/40
        transition-all duration-150"
    >
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  )
}

// ─── Бургер иконка ────────────────────────────────────────────────────────────
function BurgerIcon({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col justify-center gap-1.5 w-5 h-5">
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        className="block h-px w-full bg-foreground origin-center"
      />
      <motion.span
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="block h-px w-full bg-foreground"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2 }}
        className="block h-px w-full bg-foreground origin-center"
      />
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export function Navbar() {
  const [atTop, setAtTop] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { scrollY } = useScroll()
  const pathname = usePathname()
  const router = useRouter()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setAtTop(latest < 10)
  })

  // ─── Scroll spy ───────────────────────────────────────────────────────────
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection("#" + entry.target.id)
          }
        })
      },
      {
        rootMargin: "-40% 0px -55% 0px", // секция считается активной когда в центре экрана
        threshold: 0,
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    // Ngoài trang chủ (vd. trang bài viết) không có các section này: quay về trang chủ rồi cuộn tới đó
    if (pathname !== "/") {
      router.push(`/${href}`)
      return
    }
    setTimeout(() => {
      const el = document.querySelector(href)
      el?.scrollIntoView({ behavior: "smooth" })
    }, 300)
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-18
          flex items-center justify-between px-6
          transition-all duration-300
          ${atTop ? "bg-transparent" : "bg-background/80 backdrop-blur-md border-b border-border/40"}`}
      >
        {/* Логотип */}
        <button
            onClick={() => scrollTo("#hero")}
            className={`font-semibold text-base tracking-tight
              transition-all cursor-pointer
              ${atTop ? "text-emerald-400" : "text-foreground hover:text-emerald-400"}`}
          >
            {profile.name}
        </button>

        {/* Навигация десктоп */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeSection === href && !atTop
            return (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className={`relative px-3 py-1.5 text-lg rounded-md cursor-pointer
                  transition-all duration-150
                  ${isActive
                    ? "text-emerald-400"
                    : "text-muted-foreground hover:text-emerald-400 hover:bg-muted/50"
                  }`}
              >
                {label}

                {/* Изумрудная линия снизу активного пункта */}
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute bottom-0 left-3 right-3 h-px bg-emerald-400 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </nav>

        {/* Правая часть */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex md:hidden items-center justify-center size-9 rounded-lg cursor-pointer
              border border-border/40 text-muted-foreground
              hover:border-border hover:text-foreground hover:bg-muted/40
              transition-all duration-150"
          >
            <BurgerIcon open={menuOpen} />
          </button>
        </div>
      </header>

      {/* Мобильное меню */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col pt-14
              bg-background/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col px-6 py-8 gap-1">
              {NAV_LINKS.map(({ label, href }, i) => {
                const isActive = activeSection === href && !atTop 
                return (
                  <motion.button
                    key={href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => scrollTo(href)}
                    className={`text-left px-3 py-3 text-lg font-semibold rounded-lg
                      transition-all duration-150 cursor-pointer
                      ${isActive
                        ? "text-emerald-400 bg-emerald-400/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                  >
                    {label}
                  </motion.button>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}