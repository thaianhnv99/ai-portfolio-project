import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react'
import './ChatWidget.css'

// Backend FastAPI: POST { message } -> stream text/plain (chữ đổ về dần)
const API_URL = 'http://127.0.0.1:8000/api/chat'
// Chỉ áp dụng lúc chờ server bắt đầu trả lời (token đầu tiên của Gemini có thể mất vài chục giây)
const REQUEST_TIMEOUT_MS = 60_000
const WINDOW_ID = 'chat-widget-window'

// Gemini sinh chữ nhanh hơn tốc độ đọc (cả câu trả lời có thể về trong ~1s) nên chữ được
// hiện dần theo nhịp gõ: tối thiểu 2 ký tự mỗi 30ms (~65 ký tự/giây), phần chưa hiện càng
// nhiều thì gõ càng nhanh (mỗi nhịp lộ ra 1/30 phần còn lại) để câu dài không bị kéo lê thê.
const TYPE_TICK_MS = 30
const TYPE_MIN_CHARS = 2
const TYPE_CATCHUP = 30

type Role = 'user' | 'ai'

interface ChatMessage {
  id: number
  role: Role
  text: string
  isError?: boolean
}

interface ChatRequest {
  message: string
}

const GREETING: ChatMessage = {
  id: 0,
  role: 'ai',
  text: 'Xin chào! Hãy đặt câu hỏi, mình sẽ trả lời dựa trên dữ liệu trong portfolio này.',
}

class HttpError extends Error {
  status: number
  detail?: string

  constructor(status: number, detail?: string) {
    super(`HTTP ${status}`)
    this.status = status
    this.detail = detail
  }
}

// FastAPI trả lỗi dạng { detail: "..." } (422 thì detail là mảng -> bỏ qua)
async function readErrorDetail(res: Response): Promise<string | undefined> {
  try {
    const data = (await res.json()) as { detail?: unknown }
    return typeof data.detail === 'string' ? data.detail : undefined
  } catch {
    return undefined
  }
}

function describeError(err: unknown): string {
  if (err instanceof DOMException && err.name === 'AbortError') {
    return 'Server phản hồi quá lâu. Vui lòng thử lại.'
  }
  if (err instanceof HttpError) {
    return err.detail
      ? `Server báo lỗi ${err.status}: ${err.detail}`
      : `Server báo lỗi ${err.status}. Vui lòng thử lại.`
  }
  if (err instanceof TypeError) {
    // fetch ném TypeError khi mất kết nối / bị chặn CORS
    return 'Không kết nối được tới backend. Hãy kiểm tra server đang chạy và đã bật CORS.'
  }
  return 'Đã có lỗi xảy ra. Vui lòng thử lại.'
}

// Hiện dần `target` theo nhịp gõ, độc lập với tốc độ chunk đổ về từ server
function createTypewriter(onText: (text: string) => void) {
  let target = ''
  let shown = 0
  let ended = false
  let onDone: (() => void) | undefined

  const timer = window.setInterval(() => {
    const backlog = target.length - shown
    if (backlog > 0) {
      shown += Math.min(backlog, Math.max(TYPE_MIN_CHARS, Math.ceil(backlog / TYPE_CATCHUP)))
      onText(target.slice(0, shown))
    } else if (ended) {
      window.clearInterval(timer)
      onDone?.()
    }
  }, TYPE_TICK_MS)

  return {
    push(text: string) {
      target = text
    },
    // Báo đã nhận đủ chữ; promise xong khi đã gõ hết
    finish() {
      ended = true
      return new Promise<void>((resolve) => {
        onDone = resolve
      })
    },
    // Dừng ngay (khi lỗi hoặc hủy); an toàn khi gọi nhiều lần
    cancel() {
      window.clearInterval(timer)
    },
  }
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.9 8.9 0 0 1-3.6-.8L3 21l1.9-5.1A8.4 8.4 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const nextId = useRef(1)
  const wasOpen = useRef(false)
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Đóng kết nối đang stream khi component bị gỡ
  useEffect(() => () => abortRef.current?.abort(), [])

  // Cuộn xuống tin mới nhất (độ mượt do CSS `scroll-behavior` quyết định)
  useEffect(() => {
    const el = messagesRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, loading, open])

  // Mở -> focus ô nhập; đóng -> trả focus về bong bóng
  useEffect(() => {
    if (open) inputRef.current?.focus()
    else if (wasOpen.current) launcherRef.current?.focus()
    wasOpen.current = open
  }, [open])

  function addMessage(role: Role, text: string, isError = false) {
    const id = nextId.current++
    setMessages((prev) => [...prev, { id, role, text, isError }])
    return id
  }

  function updateMessageText(id: number, text: string) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, text } : m)))
  }

  function removeMessage(id: number) {
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault() // Enter trong ô input cũng đi qua đây
    const message = input.trim()
    if (!message || loading) return

    addMessage('user', message)
    setInput('')
    setLoading(true)

    const controller = new AbortController()
    abortRef.current = controller
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
    let aiId: number | null = null
    let reply = ''
    let typer: ReturnType<typeof createTypewriter> | null = null

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message } satisfies ChatRequest),
        signal: controller.signal,
      })
      // Đã có phản hồi -> hết giai đoạn chờ, không để timeout cắt ngang lúc đang stream
      window.clearTimeout(timeoutId)

      if (!res.ok) throw new HttpError(res.status, await readErrorDetail(res))
      if (!res.body) throw new Error('Response không có body để stream.')

      // Tạo bong bóng AI rỗng rồi nối chữ vào đó mỗi khi có chunk mới
      const id = addMessage('ai', '')
      aiId = id
      typer = createTypewriter((text) => updateMessageText(id, text))
      const reader = res.body.getReader()
      // stream: true để ký tự tiếng Việt (nhiều byte) bị cắt giữa 2 chunk vẫn ghép đúng
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        reply += decoder.decode(value, { stream: true })
        typer.push(reply)
      }
      reply += decoder.decode()
      typer.push(reply)
      await typer.finish() // chờ gõ nốt phần còn lại rồi mới mở lại ô nhập

      if (!reply.trim()) throw new Error('Server trả về câu trả lời rỗng.')
    } catch (err) {
      typer?.cancel()
      // Giữ lại toàn bộ phần đã nhận được; chỉ bỏ bong bóng nếu nó vẫn trống
      if (aiId !== null) {
        if (reply.trim()) updateMessageText(aiId, reply)
        else removeMessage(aiId)
      }
      addMessage('ai', describeError(err), true)
    } finally {
      typer?.cancel()
      window.clearTimeout(timeoutId)
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  function handleWindowKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') setOpen(false)
  }

  return (
    <div className="cw" data-open={open}>
      <button
        ref={launcherRef}
        type="button"
        className="cw-launcher"
        aria-label={open ? 'Đóng khung chat' : 'Mở khung chat với AI'}
        aria-expanded={open}
        aria-controls={WINDOW_ID}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <ChevronDownIcon /> : <ChatIcon />}
      </button>

      <div
        id={WINDOW_ID}
        className="cw-window"
        role="dialog"
        aria-labelledby="chat-widget-title"
        data-open={open}
        inert={!open}
        onKeyDown={handleWindowKeyDown}
      >
        <header className="cw-header">
          <div className="cw-avatar" aria-hidden="true">
            AI
          </div>
          <div id="chat-widget-title" className="cw-title">
            AI Assistant
          </div>
          <button
            type="button"
            className="cw-close"
            aria-label="Đóng"
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </button>
        </header>

        <div
          ref={messagesRef}
          className="cw-messages"
          role="log"
          aria-live="polite"
          aria-busy={loading}
        >
          {messages.map((m) => (
            <div key={m.id} className={`cw-row cw-row--${m.role}`}>
              <div
                className={`cw-bubble cw-bubble--${m.role}${m.isError ? ' cw-bubble--error' : ''}`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* Tin cuối vẫn là của user = chưa có token nào về; có chữ chạy rồi thì ẩn "đang suy nghĩ" */}
          {loading && messages[messages.length - 1]?.role === 'user' && (
            <div className="cw-row cw-row--ai">
              <div className="cw-bubble cw-bubble--ai cw-typing">
                <span>AI đang suy nghĩ</span>
                <span className="cw-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            </div>
          )}
        </div>

        <form className="cw-form" onSubmit={handleSubmit}>
          <label className="cw-sr-only" htmlFor="chat-widget-input">
            Câu hỏi của bạn
          </label>
          <input
            id="chat-widget-input"
            ref={inputRef}
            className="cw-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập câu hỏi của bạn..."
            autoComplete="off"
          />
          <button
            type="submit"
            className="cw-send"
            disabled={!input.trim() || loading}
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatWidget
