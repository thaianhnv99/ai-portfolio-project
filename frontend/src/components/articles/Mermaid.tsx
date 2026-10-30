"use client"

import { useEffect, useId, useState } from "react"
import { useTheme } from "next-themes"

// Render ```mermaid trong bài viết thành SVG. Thư viện chỉ tải khi trang có diagram; trong lúc
// chờ (và khi lỗi) hiện nguyên mã nguồn để người đọc không thấy khung trống.
export function Mermaid({ chart }: { chart: string }) {
  const id = `mermaid-${useId().replace(/:/g, "")}`
  const { resolvedTheme } = useTheme()
  const [svg, setSvg] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { default: mermaid } = await import("mermaid")
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: resolvedTheme === "dark" ? "dark" : "default",
        })
        const { svg } = await mermaid.render(id, chart)
        if (!cancelled) setSvg(svg)
      } catch {
        if (!cancelled) setSvg(null)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [chart, id, resolvedTheme])

  if (!svg) {
    return (
      <pre className="my-6 overflow-x-auto rounded-xl border border-border/40 bg-muted/30 p-5 text-sm leading-relaxed text-muted-foreground">
        <code>{chart}</code>
      </pre>
    )
  }

  return (
    <div
      role="img"
      aria-label="Diagram"
      className="my-6 flex justify-center overflow-x-auto rounded-xl border border-border/40 bg-card p-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
