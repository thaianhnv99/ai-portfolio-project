"use client"

import { motion } from "framer-motion"
import { RippleBackground } from "@/components/shared/RippleBackground"
import { profile } from "@/data/profile"

// ─── Анимации ─────────────────────────────────────────────────────────────────
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

// ─── Главный компонент ────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-4 overflow-hidden"
    >
      <RippleBackground />

      {/* Контент поверх canvas */}
      <div className="relative z-10 max-w-2xl mx-auto w-full px-4 text-center md:text-left">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >

          <motion.div variants={item} className="flex items-center gap-2 justify-center md:justify-start">
            <span className="flex items-center gap-1.5 text-base text-muted-foreground border border-border/50 rounded-full px-3 py-1">
              <span className="relative flex size-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-1.5 bg-green-500" />
              </span>
              Available for work
            </span>
            
          </motion.div>

          {/* Имя */}
          <motion.div variants={item}>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground leading-none">
              {profile.name}
            </h1>
          </motion.div>

          {/* Должность */}
          <motion.div variants={item}>
            <p className="text-4xl sm:text-3xl font-bold text-emerald-400 tracking-tight">
              {profile.role}
            </p>
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-2">
            <div className="max-w-sm mx-auto md:mx-0">
              <p className="text-lg font-semibold leading-relaxed">
                Based in {profile.location}.
              </p>
              <p className="text-base text-muted-foreground/80 mt-3">
                {profile.tagline}
              </p>
            </div>
          </motion.div>
      
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2"
          >
            <a
              href={ "#contact" }
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                bg-foreground text-background text-base font-medium
                hover:opacity-90 active:scale-[0.98] transition-all duration-150"
            >
              <MessageIcon />
              Contact me
            </a>

            {profile.cvUrl && (
              <a
                href={profile.cvUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                  border border-border/60 text-foreground text-base font-medium
                  hover:bg-muted/60 hover:text-emerald-400 active:scale-[0.98] transition-all duration-150"
              >
                <DownloadIcon />
                Download CV
              </a>
            )}
          </motion.div>

          {/* Соцсети */}
          <motion.div
            variants={item}
            className="flex items-center gap-3 pt-1"
          >
          </motion.div>
        </motion.div>
      </div>

      {/* Скролл-хинт снизу */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-border/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
