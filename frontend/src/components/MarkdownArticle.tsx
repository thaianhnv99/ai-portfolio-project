import { isValidElement, type ComponentProps, type ReactNode } from 'react'
import Markdown, { type Components } from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import Mermaid from './Mermaid'

interface MarkdownArticleProps {
  source: string
}

// Tiêu đề thẻ bài viết đã là <h3>, nên các cấp trong Markdown hạ xuống một bậc
// (## -> h4, ### -> h5, #### -> h6). `id` do rehype-slug sinh ra để mục lục nhảy được tới mục.
function heading(Tag: 'h4' | 'h5' | 'h6') {
  return function Heading({ id, children }: ComponentProps<'h2'>) {
    return <Tag id={id}>{children}</Tag>
  }
}

// Link ngoài mở tab mới; link neo (#...) của mục lục giữ nguyên trong trang
function Link({ href, children }: ComponentProps<'a'>) {
  if (href?.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return <a href={href}>{children}</a>
}

// Bảng rộng thì cuộn ngang bên trong khung thay vì làm tràn cả trang
function Table({ children }: ComponentProps<'table'>) {
  return (
    <div className="pf-md-table">
      <table>{children}</table>
    </div>
  )
}

// ```mermaid -> vẽ thành sơ đồ; các code block khác giữ nguyên
function Pre({ children }: ComponentProps<'pre'>) {
  if (isValidElement<{ className?: string; children?: ReactNode }>(children)) {
    const { className, children: code } = children.props
    if (className === 'language-mermaid') {
      return <Mermaid chart={String(code).trim()} />
    }
  }
  return <pre>{children}</pre>
}

const components: Components = {
  h2: heading('h4'),
  h3: heading('h5'),
  h4: heading('h6'),
  a: Link,
  table: Table,
  pre: Pre,
}

const remarkPlugins = [remarkGfm]
const rehypePlugins = [rehypeSlug]

/** Render nội dung Markdown (GFM: bảng, danh sách...) thành bài viết. HTML thô trong file bị bỏ qua. */
function MarkdownArticle({ source }: MarkdownArticleProps) {
  return (
    <div className="pf-md">
      <Markdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={components}
      >
        {source}
      </Markdown>
    </div>
  )
}

export default MarkdownArticle
