import {
  Fragment,
  isValidElement,
  memo,
  useMemo,
  type ComponentProps,
  type ReactNode,
} from "react";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import Prism from "prismjs";
import type { TokenStream } from "prismjs";
// Lõi Prism đã có sẵn markup (HTML), css, clike, javascript. Thứ tự import quan trọng
// vì có phụ thuộc: tsx cần jsx và typescript.
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-python";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism-tomorrow.css";

// Prism tự gọi highlightAll() sau khi tải để tô màu mọi `code.language-*` trong trang, tức là
// ghi đè DOM đang do React quản lý (cả code block ở blog) và sẽ gây lỗi khi React cập nhật.
// Ở đây việc tô màu do component tự làm nên phải tắt.
Prism.manual = true;

interface ChatMarkdownProps {
  text: string;
}

const LANGUAGE_CLASS = /language-(\S+)/;

function getGrammar(lang: string | undefined) {
  if (!lang) return undefined;
  const name = lang.toLowerCase();
  // `languages` còn chứa hàm tiện ích (extend, insertBefore, DFS) và thừa kế Object.prototype,
  // nên ```extend hay ```constructor không được coi là ngôn ngữ.
  const grammar = Object.hasOwn(Prism.languages, name)
    ? Prism.languages[name]
    : undefined;
  return typeof grammar === "object" ? grammar : undefined;
}

// Dựng token của Prism thành React element thay vì chèn HTML (không dùng innerHTML
// cho nội dung do AI sinh ra)
function renderTokens(stream: TokenStream): ReactNode {
  if (typeof stream === "string") return stream;
  if (Array.isArray(stream)) {
    return stream.map((token, i) => (
      <Fragment key={i}>{renderTokens(token)}</Fragment>
    ));
  }
  const aliases = Array.isArray(stream.alias)
    ? stream.alias
    : stream.alias
      ? [stream.alias]
      : [];
  return (
    <span className={["token", stream.type, ...aliases].join(" ")}>
      {renderTokens(stream.content)}
    </span>
  );
}

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const grammar = getGrammar(lang);
  const tokens = useMemo(
    () => (grammar ? Prism.tokenize(code, grammar) : null),
    [code, grammar],
  );
  // Luôn có class `language-*` (kể cả khi không rõ ngôn ngữ) để theme Prism tô nền tối cho khối code
  const className = `language-${lang?.toLowerCase() ?? "none"}`;
  return (
    <pre className={className}>
      <code className={className}>{tokens ? renderTokens(tokens) : code}</code>
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
