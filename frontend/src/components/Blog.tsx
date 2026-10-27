import { lazy, Suspense, useState, type ComponentType } from 'react'
import { blogPosts, type BlogPostId } from '../data/portfolio'
import { markdownReadingMinutes, stripTitle } from '../lib/markdown'
import { parseArticle } from '../lib/parseArticle'
import astraRaw from '../content/blog_nextjs.txt?raw'
import aiPortfolioRaw from '../../huong-dan-xay-dung-ai-portfolio.md?raw'
import Section from './Section'

// react-markdown và mermaid khá nặng nên chỉ tải khi người xem mở bài Markdown
const MarkdownArticle = lazy(() => import('./MarkdownArticle'))

const astra = parseArticle(astraRaw)
const aiPortfolio = stripTitle(aiPortfolioRaw)

function AstraBody() {
  return (
    <div className="pf-post-prose">
      {astra.blocks.map((b, i) => {
        switch (b.type) {
          case 'heading':
            return <h4 key={i}>{b.text}</h4>
          case 'paragraph':
            return <p key={i}>{b.text}</p>
          case 'list': {
            const Tag = b.ordered ? 'ol' : 'ul'
            return (
              <Tag key={i}>
                {b.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </Tag>
            )
          }
        }
      })}
    </div>
  )
}

function AiPortfolioBody() {
  return (
    <Suspense fallback={<p className="pf-post-status">Đang tải bài viết…</p>}>
      <MarkdownArticle source={aiPortfolio} />
    </Suspense>
  )
}

const contents: Record<BlogPostId, { minutes: number; Body: ComponentType }> = {
  'astra-trade': { minutes: astra.readingMinutes, Body: AstraBody },
  'ai-portfolio': { minutes: markdownReadingMinutes(aiPortfolio), Body: AiPortfolioBody },
}

function Blog() {
  // Chỉ mở một bài một lúc để trang không biến thành bức tường chữ
  const [openId, setOpenId] = useState<BlogPostId | null>(null)

  return (
    <Section id="blog" title="Bài viết">
      <div className="pf-posts">
        {blogPosts.map((post) => {
          const { minutes, Body } = contents[post.id]
          const open = openId === post.id
          const panelId = `post-${post.id}`

          return (
            <article key={post.id} className="pf-article pf-post">
              <h3 className="pf-article-title">{post.title}</h3>
              <p className="pf-article-meta">
                {post.label} · {minutes} min read
              </p>
              <p className="pf-post-summary">{post.summary}</p>

              <button
                type="button"
                className="pf-btn pf-post-toggle"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : post.id)}
              >
                {open ? 'Thu gọn' : 'Đọc bài viết'}
              </button>

              <div id={panelId} className="pf-post-body" hidden={!open}>
                {open && <Body />}
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}

export default Blog
