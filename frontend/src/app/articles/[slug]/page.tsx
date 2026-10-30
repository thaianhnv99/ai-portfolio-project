import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Badge } from "@/components/ui/badge"
import { blogPosts, getBlogPost } from "@/data/blog"

type Props = { params: Promise<{ slug: string }> }

// Chỉ các bài khai báo trong data/blog.ts; slug khác trả 404.
export const dynamicParams = false

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost((await params).slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.summary,
    openGraph: { title: post.title, description: post.summary, type: "article" },
  }
}

export default async function ArticlePage({ params }: Props) {
  const post = getBlogPost((await params).slug)
  if (!post) notFound()

  const { default: Content } = await import(`@/content/${post.id}.mdx`)

  return (
    <>
      <Navbar />
      <main className="px-6 pt-28 pb-24">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/#articles"
            className="mb-8 flex w-fit items-center gap-2 text-base font-medium text-muted-foreground transition-colors hover:text-emerald-400"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to articles
          </Link>
          <Badge variant="outline" className="mb-4 border-emerald-400/30 text-emerald-400">
            {post.label}
          </Badge>
          <Content />
        </article>
      </main>
      <Footer />
    </>
  )
}
