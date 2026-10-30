import { Fragment, type ReactNode } from "react";
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

export const LANGUAGE_CLASS = /language-(\S+)/;

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

/** Tô màu `code` theo `lang` thành React node; không rõ ngôn ngữ thì trả về nguyên văn. */
export function highlightCode(code: string, lang: string | undefined): ReactNode {
  const grammar = getGrammar(lang);
  return grammar ? renderTokens(Prism.tokenize(code, grammar)) : code;
}
