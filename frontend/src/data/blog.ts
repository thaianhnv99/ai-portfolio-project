// Nội dung bài là file MDX cùng tên với `id` trong src/content/ (vd. "ai-portfolio" → ai-portfolio.mdx),
// được render ở trang /articles/[id] (app/articles/[slug]/page.tsx). Mục "My Articles"
// (components/sections/Articles.tsx) hiển thị danh sách này theo đúng thứ tự khai báo.

export type BlogPostId = "astra-trade" | "ai-portfolio"

export type BlogPost = {
  /** Cũng là slug của URL và tên file MDX. */
  id: BlogPostId
  /** Nhãn loại bài. */
  label: string
  title: string
  summary: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "ai-portfolio",
    label: "Tutorial",
    title:
      "Hướng dẫn từ A-Z cách xây dựng trang web AI-Portfolio cá nhân kết nối Client-Server",
    summary:
      "Xây dựng portfolio có chatbot RAG: Next.js phía Client, FastAPI + Gemini phía Server, vector lưu trên Pinecone và câu trả lời được cache bằng Redis. API key chỉ nằm ở Server và câu trả lời được stream về trình duyệt.",
  },
  {
    id: "astra-trade",
    label: "Case study",
    title: "Astra Trade: Lessons from Building a Multi-Site FX Trading Front-End",
    summary:
      "One codebase builds three separate applications (user, admin and broker) of an FX trading and risk pricing platform, selected at build time.",
  },
]

export function getBlogPost(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id)
}
