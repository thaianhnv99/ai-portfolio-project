import type { MDXComponents } from "mdx/types"
import Link from "next/link"
import { isValidElement, type ComponentProps, type ReactNode } from "react"
import { LANGUAGE_CLASS, highlightCode } from "@/lib/highlight"
import { Mermaid } from "@/components/articles/Mermaid"

const linkClass =
  "font-medium text-emerald-600 dark:text-emerald-400 underline underline-offset-4 decoration-emerald-500/40 hover:decoration-current transition-colors"

// Link nội bộ (#anchor, /route) mở cùng tab; link ngoài mở tab mới.
function A({ href = "", children }: ComponentProps<"a">) {
  if (href.startsWith("#")) return <a href={href} className={linkClass}>{children}</a>
  if (href.startsWith("/")) return <Link href={href} className={linkClass}>{children}</Link>
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  )
}

// MDX dựng khối code thành <pre><code class="language-xxx">. Lấy ngôn ngữ + nội dung từ <code> con.
// Theme Prism không nằm trong @layer nên thắng utility thường; các class có `!` để ghi đè margin/bo góc/cỡ chữ.
function Pre({ children }: ComponentProps<"pre">) {
  if (isValidElement<{ className?: string; children?: ReactNode }>(children)) {
    const { className, children: code } = children.props
    const text = String(code ?? "").replace(/\n$/, "")
    const lang = LANGUAGE_CLASS.exec(className ?? "")?.[1]?.toLowerCase()
    if (lang === "mermaid") return <Mermaid chart={text} />
    const cls = `language-${lang ?? "none"}`
    return (
      <pre className={`${cls} my-6! rounded-xl! p-5! text-sm! leading-relaxed!`}>
        <code className={cls}>{highlightCode(text, lang)}</code>
      </pre>
    )
  }
  return <pre>{children}</pre>
}

// Bảng rộng cuộn ngang trong khung thay vì làm tràn trang
function Table({ children }: ComponentProps<"table">) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-border/50">
      <table className="w-full text-left text-base">{children}</table>
    </div>
  )
}

const components: MDXComponents = {
  h1: (p) => <h1 className="scroll-mt-24 mb-6 text-3xl md:text-4xl font-bold leading-tight tracking-tight text-foreground" {...p} />,
  h2: (p) => <h2 className="scroll-mt-24 mt-12 mb-4 border-b border-border/40 pb-2 text-2xl md:text-3xl font-bold tracking-tight text-foreground" {...p} />,
  h3: (p) => <h3 className="scroll-mt-24 mt-8 mb-3 text-xl md:text-2xl font-semibold text-foreground" {...p} />,
  h4: (p) => <h4 className="scroll-mt-24 mt-6 mb-2 text-lg font-semibold text-foreground" {...p} />,
  p: (p) => <p className="my-4 text-lg leading-relaxed text-foreground/80" {...p} />,
  strong: (p) => <strong className="font-semibold text-foreground" {...p} />,
  a: A,
  ul: (p) => <ul className="my-4 list-disc space-y-1.5 pl-6 text-lg text-foreground/80 marker:text-muted-foreground" {...p} />,
  ol: (p) => <ol className="my-4 list-decimal space-y-1.5 pl-6 text-lg text-foreground/80 marker:text-muted-foreground" {...p} />,
  li: (p) => <li className="leading-relaxed [&>ul]:my-2 [&>ol]:my-2" {...p} />,
  blockquote: (p) => <blockquote className="my-6 rounded-r-lg border-l-4 border-emerald-500/60 bg-muted/30 py-2 pl-5 pr-4 [&>p]:my-2" {...p} />,
  hr: () => <hr className="my-10 border-border/60" />,
  code: (p) => <code className="rounded-md bg-muted px-1.5 py-0.5 text-[0.875em] text-foreground [font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]" {...p} />,
  pre: Pre,
  table: Table,
  thead: (p) => <thead className="bg-muted/40" {...p} />,
  th: (p) => <th className="border-b border-border/50 px-4 py-2.5 font-semibold text-foreground" {...p} />,
  td: (p) => <td className="border-b border-border/30 px-4 py-2.5 align-top text-foreground/80" {...p} />,
}

export function useMDXComponents(): MDXComponents {
  return components
}
