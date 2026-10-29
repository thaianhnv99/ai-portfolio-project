// Nội dung bài nằm trong src/content/ (chưa có mục Blog nào trên trang để hiển thị).

export type BlogPostId = "astra-trade" | "ai-portfolio"

export type BlogPost = {
  id: BlogPostId
  /** Nhãn loại bài. */
  label: string
  title: string
  summary: string
  /** File nguồn trong src/content/. */
  source: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "ai-portfolio",
    label: "Tutorial",
    title:
      "Hướng dẫn từ A-Z cách xây dựng trang web AI-Portfolio cá nhân kết nối Client-Server",
    summary:
      "Xây dựng portfolio có chatbot RAG: React + Vite phía Client, FastAPI + Gemini + FAISS phía Server. API key chỉ nằm ở Server và câu trả lời được stream về trình duyệt.",
    source: "huong-dan-xay-dung-ai-portfolio.md",
  },
  {
    id: "astra-trade",
    label: "Case study",
    // Phải khớp (không phân biệt hoa/thường) với dòng đầu của content/blog_nextjs.txt
    title: "Astra Trade: Lessons from Building a Multi-Site FX Trading Front-End",
    summary:
      "One codebase builds three separate applications (user, admin and broker) of an FX trading and risk pricing platform, selected at build time.",
    source: "blog_nextjs.txt",
  },
]
