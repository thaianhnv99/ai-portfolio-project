import { useEffect, useId, useState } from 'react'

interface MermaidProps {
  chart: string
}

type Result = { svg: string } | { failed: true } | null

// Mermaid nặng (vài trăm KB) nên chỉ tải khi bài viết có sơ đồ được mở ra.
function Mermaid({ chart }: MermaidProps) {
  // useId trả về dạng ":r1:", mermaid cần id hợp lệ để gắn vào DOM
  const id = `mermaid-${useId().replace(/\W/g, '')}`
  const [result, setResult] = useState<Result>(null)

  useEffect(() => {
    let cancelled = false

    async function draw() {
      try {
        const { default: mermaid } = await import('mermaid')
        const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: dark ? 'dark' : 'default',
        })
        const { svg } = await mermaid.render(id, chart)
        if (!cancelled) setResult({ svg })
      } catch {
        // mermaid để lại phần tử báo lỗi ở cuối <body> khi vẽ thất bại
        document.getElementById(`d${id}`)?.remove()
        if (!cancelled) setResult({ failed: true })
      }
    }

    draw()
    return () => {
      cancelled = true
    }
  }, [chart, id])

  if (result && 'svg' in result) {
    return (
      <figure
        className="pf-md-diagram"
        role="img"
        aria-label="Sơ đồ minh hoạ"
        dangerouslySetInnerHTML={{ __html: result.svg }}
      />
    )
  }

  // Vẽ lỗi thì hiện lại mã nguồn sơ đồ để người đọc vẫn nắm được nội dung
  if (result) {
    return (
      <pre>
        <code>{chart}</code>
      </pre>
    )
  }

  return <div className="pf-md-diagram pf-md-diagram--loading">Đang vẽ sơ đồ…</div>
}

export default Mermaid
