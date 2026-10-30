import {
  isValidElement,
  memo,
  useMemo,
  type ComponentProps,
  type ReactNode,
} from "react";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { LANGUAGE_CLASS, highlightCode } from "@/lib/highlight";

interface ChatMarkdownProps {
  text: string;
}

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const content = useMemo(() => highlightCode(code, lang), [code, lang]);
  // Luôn có class `language-*` (kể cả khi không rõ ngôn ngữ) để theme Prism tô nền tối cho khối code
  const className = `language-${lang?.toLowerCase() ?? "none"}`;
  return (
    <pre className={className}>
      <code className={className}>{content}</code>
    </pre>
  );
}

// react-markdown dựng khối code thành <pre><code class="language-xxx">; lấy ngôn ngữ và nội dung
// từ <code> con rồi thay bằng CodeBlock. Code inline (không nằm trong <pre>) giữ nguyên.
function Pre({ children }: ComponentProps<"pre">) {
  if (isValidElement<{ className?: string; children?: ReactNode }>(children)) {
    const { className, children: code } = children.props;
    return (
      <CodeBlock
        code={String(code ?? "").replace(/\n$/, "")}
        lang={LANGUAGE_CLASS.exec(className ?? "")?.[1]}
      />
    );
  }
  return <pre>{children}</pre>;
}

// Mọi link mở tab mới, không để trang portfolio bị điều hướng đi mất
function Link({ href, children }: ComponentProps<"a">) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

// Bảng rộng thì cuộn ngang bên trong bong bóng thay vì làm tràn khung chat
function Table({ children }: ComponentProps<"table">) {
  return (
    <div className="cw-md-table">
      <table>{children}</table>
    </div>
  );
}

const components: Components = { a: Link, pre: Pre, table: Table };
const remarkPlugins = [remarkGfm];
// Không tải ảnh từ URL do AI sinh ra (ảnh còn dễ làm tràn bong bóng)
const disallowedElements = ["img"];

/** Render câu trả lời Markdown (GFM) của AI kèm tô màu cú pháp. HTML thô chỉ hiện như chữ, không bị thực thi. */
function ChatMarkdown({ text }: ChatMarkdownProps) {
  return (
    <div className="cw-md">
      <Markdown
        remarkPlugins={remarkPlugins}
        components={components}
        disallowedElements={disallowedElements}
      >
        {text}
      </Markdown>
    </div>
  );
}

// memo: lúc một tin đang chạy chữ, các tin cũ không bị parse lại Markdown ở mỗi nhịp 30ms
export default memo(ChatMarkdown);
