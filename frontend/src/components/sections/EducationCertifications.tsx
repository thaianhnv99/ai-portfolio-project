"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { education, certifications } from "@/data/education"
import Image from "next/image"

// ─── Иконка внешней ссылки ────────────────────────────────────────────────────
function ExternalLinkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

// ─── Заголовок блока ──────────────────────────────────────────────────────────
function BlockHeader({ title, eyebrow }: { title: string; eyebrow: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-8 text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
        {title}
      </h2>
      <p className="mt-3 text-muted-foreground font-semibold text-xl leading-relaxed max-w-md mx-auto">
        {eyebrow}
      </p>
    </motion.div>
  )
}

// ─── Карточка образования ─────────────────────────────────────────────────────
function EducationCard({ item, index }: { item: (typeof education)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex gap-4 p-5 rounded-xl
        border border-border/40 bg-card
        hover:border-border transition-all duration-300"
    >
      {/* Иконка */}

      <div className="shrink-0 flex items-center justify-center size-10 rounded-lg overflow-hidden border border-border/40">
        {item.logo ? (
          <Image
           src={item.logo}
           alt={item.institution}
           width={40}
           height={40}
           className="h-full object-cover"
          />
        ) : (
          <span className="text-xs font-medium text-muted-foreground">
            {item.institution.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      {/* Контент */}
      <div className="flex-1 ">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-bold text-foreground leading-tight">
              {item.institution}
            </p>
            <p className="text-base text-muted-foreground mt-0.5">
              {item.field ? `${item.degree} · ${item.field}` : item.degree}
            </p>
          </div>
          {item.period && (
            <span className="shrink-0 text-base text-muted-foreground/60 mt-0.5">
              {item.period}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Карточка сертификата ─────────────────────────────────────────────────────
function CertCard({ item, index }: { item: (typeof certifications)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex gap-4 p-5 font-semibold rounded-xl
        border border-border/40 bg-card
        hover:border-border transition-all duration-300"
    >
      {/* Иконка */}
      <div className="shrink-0 flex items-center justify-center size-10 rounded-lg
        bg-muted/50 border border-border/40 text-muted-foreground
        group-hover:text-foreground transition-colors">
        <span className="text-xs font-medium">
          {item.issuer.slice(0, 2).toUpperCase()}
        </span>
      </div>

      {/* Контент */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-bold text-foreground leading-tight">
              {item.issuer}
            </p>
            <p className="text-base text-muted-foreground mt-0.5">
              {item.title}
            </p>
          </div>
          <span className="shrink-0 text-base text-muted-foreground/60 mt-0.5">
            {item.period}
          </span>
        </div>
      </div>

      {/* Ссылка на сертификат */}
      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View certificate"
          className="shrink-0 self-center flex items-center justify-center size-8 rounded-lg
            border border-border/40 text-muted-foreground
            hover:border-emerald-400/40 hover:text-emerald-400 hover:bg-muted/40
            transition-all duration-150"
        >
          <ExternalLinkIcon />
        </a>
      )}
    </motion.div>
  )
}

// ─── Секция Education ─────────────────────────────────────────────────────────
export function EducationSection() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <BlockHeader title="Education" eyebrow="Academic background" />
        <div className="flex flex-col gap-3">
          {education.map((item, index) => (
            <EducationCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Секция Certifications ────────────────────────────────────────────────────
export function CertificationsSection() {
  if (certifications.length === 0) return null

  return (
    <section id="certifications" className="py-24 px-6 pt-0">
      <div className="max-w-2xl mx-auto">
        <BlockHeader eyebrow="Certifications" title="Courses & certificates" />
        <div className="flex flex-col gap-3">
          {certifications.map((item, index) => (
            <CertCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
