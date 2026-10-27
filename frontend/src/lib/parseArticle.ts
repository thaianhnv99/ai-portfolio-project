export type ArticleBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }

export interface Article {
  /** Dòng đầu của file, giữ nguyên (thường viết hoa toàn bộ). */
  title: string
  blocks: ArticleBlock[]
  readingMinutes: number
}

const BULLET = /^-\s+/
const NUMBERED = /^\d+\.\s+/

// Dòng viết hoa toàn bộ (và không phải mục danh sách) là tiêu đề mục.
function isHeading(line: string) {
  return (
    line === line.toUpperCase() &&
    /[A-Z]/.test(line) &&
    !BULLET.test(line) &&
    !NUMBERED.test(line)
  )
}

// "HOW I SOLVED IT" -> "How I solved it"
function toSentenceCase(text: string) {
  const lower = text.charAt(0) + text.slice(1).toLowerCase()
  return lower.replace(/\bi\b/g, 'I')
}

/** Đọc file .txt thuần: dòng đầu là tiêu đề, dòng HOA là mục, "- " là gạch đầu dòng, "1. " là danh sách đánh số. */
export function parseArticle(raw: string): Article {
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)

  const [title = '', ...rest] = lines
  const blocks: ArticleBlock[] = []

  for (const line of rest) {
    const last = blocks[blocks.length - 1]

    if (isHeading(line)) {
      blocks.push({ type: 'heading', text: toSentenceCase(line) })
    } else if (BULLET.test(line) || NUMBERED.test(line)) {
      const ordered = NUMBERED.test(line)
      const item = line.replace(ordered ? NUMBERED : BULLET, '')
      if (last?.type === 'list' && last.ordered === ordered) last.items.push(item)
      else blocks.push({ type: 'list', ordered, items: [item] })
    } else {
      blocks.push({ type: 'paragraph', text: line })
    }
  }

  const words = rest.join(' ').split(/\s+/).length
  return { title, blocks, readingMinutes: Math.max(1, Math.round(words / 200)) }
}
