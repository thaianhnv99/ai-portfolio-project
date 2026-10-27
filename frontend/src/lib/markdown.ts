/** Bỏ dòng tiêu đề `# ...` ở đầu file (tiêu đề đã được hiện ở thẻ bài viết). */
export function stripTitle(md: string) {
  return md.replace(/^\s*# .*\r?\n/, '').trimStart()
}

/** Ước lượng thời gian đọc (200 từ/phút), không tính code block. */
export function markdownReadingMinutes(md: string) {
  const text = md.replace(/```[\s\S]*?```/g, ' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}
