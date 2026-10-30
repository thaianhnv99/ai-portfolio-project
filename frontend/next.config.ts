import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
  // 1. Thêm dòng này để Next.js nhận diện file .md và .mdx là một Trang (Page)
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    // Turbopack chỉ nhận plugin dạng chuỗi (tên package), không nhận hàm đã import.
    remarkPlugins: ["remark-gfm"], // bảng, ~~gạch~~, task list
    rehypePlugins: ["rehype-slug"], // gắn id cho heading để mục lục #anchor trong bài hoạt động
  },
});

export default withMDX(nextConfig);
