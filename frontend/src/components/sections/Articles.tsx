"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { blogPosts, type BlogPost } from "@/data/blog"
import { Badge } from "@/components/ui/badge"
import { ShowMoreButton } from "@/components/shared/ShowMoreButton"

// Hiển thị tối đa số bài này; nhiều hơn thì có nút "View More Articles".
const INITIAL_VISIBLE = 3

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

// ─── Карточка статьи ──────────────────────────────────────────────────────────
function ArticleCard({ post, index }: { post: BlogPost; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  const cardClass = `group flex flex-col h-full gap-4 p-6 rounded-xl
    border border-border/40 bg-card transition-all duration-300
    hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20`

  const body = (
    <>
      <Badge variant="outline" className="text-emerald-400 border-emerald-400/30">
        {post.label}
      </Badge>
      <h3 className="text-xl font-semibold text-foreground leading-snug">
        {post.title}
      </h3>
      <p className="text-base text-muted-foreground leading-relaxed">
        {post.summary}
      </p>
      <span className="mt-auto pt-4 border-t border-border/40 inline-flex items-center gap-2
        text-base font-medium text-muted-foreground group-hover:text-emerald-400 transition-colors">
        Read article
        <ArrowIcon />
      </span>
    </>
  )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % INITIAL_VISIBLE) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
    >
      <Link href={`/articles/${post.id}`} className={cardClass}>
        {body}
      </Link>
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
        My Articles
      </h2>
      <p className="mt-3 text-muted-foreground font-semibold text-xl leading-relaxed max-w-md mx-auto">
        Some latest blog to know about us.
      </p>
      <p className="mt-3 text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
        Hands-on write-ups from things I have built: a step-by-step guide to an AI portfolio with a
        RAG chatbot (Next.js, FastAPI, Gemini, Pinecone and Redis), and lessons from shipping a
        real-time FX trading front-end.
      </p>
    </motion.div>
  )
}

// ─── Главный экспорт ──────────────────────────────────────────────────────────
export function ArticlesSection() {
  const [showAll, setShowAll] = useState(false)

  const hasMore = blogPosts.length > INITIAL_VISIBLE
  const visiblePosts = showAll ? blogPosts : blogPosts.slice(0, INITIAL_VISIBLE)

  return (
    <section id="articles" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader />
        <div className="flex flex-wrap justify-center gap-6">
          {visiblePosts.map((post, index) => (
            <ArticleCard key={post.id} post={post} index={index} />
          ))}
        </div>
        {hasMore && !showAll && (
          <div className="mt-12">
            <ShowMoreButton label="View More Articles" onClick={() => setShowAll(true)} />
          </div>
        )}
      </div>
    </section>
  )
}
