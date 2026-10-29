"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { profile, languages } from "@/data/profile"

// ─── Заголовок ────────────────────────────────────────────────────────────────
function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
        About
      </h2>
      <p className="mt-3 text-muted-foreground font-semibold text-xl leading-relaxed max-w-md">
        Strengths & languages
      </p>
    </motion.div>
  )
}

// ─── Главный экспорт ──────────────────────────────────────────────────────────
export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <SectionHeader />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-8"
        >
          <ul className="flex flex-col gap-3 p-5 rounded-xl border border-border/40 bg-card">
            {profile.strengths.map((strength) => (
              <li
                key={strength}
                className="flex items-start gap-2 text-base font-semibold text-muted-foreground"
              >
                <span className="mt-2 shrink-0 size-1 rounded-full bg-primary/60" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground/50">
              Languages
            </p>
            {languages.map((language) => (
              <div
                key={language.name}
                className="p-5 rounded-xl border border-border/40 bg-card
                  hover:border-border transition-all duration-300"
              >
                <p className="font-bold text-foreground leading-tight">{language.name}</p>
                <p className="text-base text-muted-foreground mt-0.5">{language.level}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
