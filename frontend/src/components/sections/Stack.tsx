"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { stack, type StackCategory, type StackItem } from "@/data/stack"

// ─── Один значок ─────────────────────────────────────────────────────────────
function StackIcon({ item, index }: { item: StackItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      title={item.name}
      className="group relative flex flex-col items-center gap-2 cursor-default"
    >
      <div
        className="flex items-center justify-center size-14 rounded-xl
          border border-border/40 bg-card
          transition-all duration-200
          group-hover:border-border group-hover:scale-110 group-hover:shadow-md"
        style={
          {
            "--brand": item.color,
          } as React.CSSProperties
        }
      >
        {item.icon ? (
          <i
            className={`${item.icon} colored text-3xl
            grayscale-0 opacity-100 md:grayscale md:opacity-40 md:group-hover:grayscale-0 md:group-hover:opacity-100
            transition-all duration-200`}
            aria-hidden="true"
          />
        ) : (
          <span
            className="text-lg font-semibold text-muted-foreground
            md:opacity-40 md:group-hover:opacity-100 transition-all duration-200"
            aria-hidden="true"
          >
            {item.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex max-w-28 flex-col items-center text-center">
        <span className="text-base text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
          {/* zero-width space sau "/" để tên dài như "JavaScript/TypeScript" xuống dòng thay vì tràn */}
          {item.name.replace(/\//g, "/​")}
        </span>
        <span className="text-sm text-muted-foreground/40">
          {item.years} {item.years === 1 ? "yr" : "yrs"}
        </span>
      </div>
    </motion.div>
  )
}

// ─── Группа ───────────────────────────────────────────────────────────────────
function StackGroup({ category, groupIndex }: { category: StackCategory; groupIndex: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: groupIndex * 0.08 }}
      className="flex flex-col gap-4"
    >
      <p className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground/50">
        {category.label}
      </p>
      <div className="flex flex-wrap gap-4">
        {category.items.map((item, i) => (
          <StackIcon key={item.name} item={item} index={i} />
        ))}
      </div>
    </motion.div>
  )
}

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
      Stack
      </h2>
      <p className="mt-3 text-muted-foreground font-semibold text-xl leading-relaxed max-w-md">
      Technologies & Tools
      </p>
    </motion.div>
  )
}

// ─── Главный экспорт ──────────────────────────────────────────────────────────
export function StackSection() {
  return (
    <>
      {/* Devicons CDN — подключаем один раз здесь */}
      {/* В реальном проекте лучше добавить в layout.tsx в <head> через next/head или metadata */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
      />

      <section id="stack" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <SectionHeader />
          <div className="flex flex-col gap-12">
            {stack.map((category, index) => (
              <StackGroup key={category.id} category={category} groupIndex={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
