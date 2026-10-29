"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { projects, type Project } from "@/data/projects"
import Image from "next/image"

const placeholderGradients = [
  "from-violet-500/20 via-purple-500/10 to-blue-500/20",
  "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
  "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
  "from-rose-500/20 via-pink-500/10 to-fuchsia-500/20",
]

function ExternalLinkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  )
}

// ─── Карточка ─────────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const gradient = placeholderGradients[index % placeholderGradients.length]

  return (
    <div className="group relative flex flex-col rounded-xl overflow-hidden
      border border-border/40 bg-card
      hover:border-border transition-colors duration-300 h-full">

      {/* Роль и размер команды + ссылки */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border/40">
        <span className="text-sm text-muted-foreground">
          {project.role} · Team of {project.teamSize}
        </span>
        <div className="flex items-center gap-1">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center size-7 rounded-md
                text-muted-foreground hover:text-emerald-400 hover:bg-muted/50
                transition-all duration-150"
            >
              <GithubIcon />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open project"
              className="flex items-center justify-center size-7 rounded-md
                text-muted-foreground hover:text-emerald-400 hover:bg-muted/50
                transition-all duration-150"
            >
              <ExternalLinkIcon />
            </a>
          )}
        </div>
      </div>

      {/* Превью */}
      <div className="relative flex-1 min-h-90 overflow-hidden bg-muted/20">
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} ...`} />
)}

        {/* Инициалы заглушка */}
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-semibold text-foreground/[0.06] select-none">
            {project.title.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
          </span>
        </div> */}

        {/* Оверлей при ховере (без превью-картинки показывается всегда) */}
        <div className={`absolute inset-0 bg-background/92 backdrop-blur-sm
          ${project.image ? "opacity-100 md:opacity-0 md:group-hover:opacity-100" : "opacity-100"}
          transition-opacity duration-300 flex flex-col overflow-y-auto px-5 py-5`}>
          <div className="my-auto flex flex-col gap-3">
            <div>
              <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
            </div>
            <ul className="flex flex-col gap-1.5">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                  <span className="mt-2 shrink-0 size-1 rounded-full bg-primary/60" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag}
                  className="text-[11px] px-2 py-0.5 rounded-full
                    border border-border/60 text-muted-foreground bg-muted/40">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Пара карточек — одна строка grid-а, она sticky ──────────────────────────
function ProjectRow({
  pair,
  rowIndex,
}: {
  pair: Project[]
  rowIndex: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  const topOffset = 80 + rowIndex * 20

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: rowIndex * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ top: topOffset, zIndex: rowIndex + 1 }}
      className="sm:sticky grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {pair.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={rowIndex * 2 + i} />
      ))}
      {/* Если нечётное количество — пустая ячейка */}
      {pair.length === 1 && <div />}
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
      className="mb-12 text-center"
    >
      <h2 className="text-3xl md:text-4xl text-center font-bold text-foreground tracking-tight">
      Projects
      </h2>
      <p className="mt-3 text-muted-foreground font-semibold text-xl leading-relaxed max-w-md mx-auto">
      Code, design, and problem-solving in practice.
      </p>
    </motion.div>
  )
}

// ─── Главный экспорт ──────────────────────────────────────────────────────────
export function ProjectsSection() {
  // Разбиваем проекты на пары (строки по 2)
  const rows: Project[][] = []
  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2))
  }

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader />
        <div className="flex flex-col gap-4 pb-24">
          {rows.map((pair, rowIndex) => (
            <ProjectRow key={rowIndex} pair={pair} rowIndex={rowIndex} />
          ))}
        </div>
      </div>
    </section>
  )
}