"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { profile } from "@/data/profile";

// Форма включается только когда заданы все три переменные (см. .env.example)
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

type EmailJsConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
};

const EMAILJS_CONFIG: EmailJsConfig | null =
  EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY
    ? {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        publicKey: EMAILJS_PUBLIC_KEY,
      }
    : null;

const MAX_MESSAGE_LENGTH = 300;

const BRANDS = [
  {
    label: "GitHub",
    color: "#6e7681",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    color: "#0A66C2",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    color: "#25D366",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Email",
    color: "#EA4335",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    ),
  },
];

// Ссылки берутся из profile.links (label: GitHub | LinkedIn | WhatsApp | Email)
const LINKS = BRANDS.flatMap((brand) => {
  const href = profile.links.find((link) => link.label === brand.label)?.href;
  return href ? [{ ...brand, href }] : [];
});

// ─── Форма ────────────────────────────────────────────────────────────────────
function ContactForm({ config }: { config: EmailJsConfig }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async () => {
    if (!name || !email || !message) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }

    setErrorMsg("");
    setStatus("sending");

    try {
      await emailjs.send(
        config.serviceId,
        config.templateId,
        { from_name: name, from_email: email, message },
        config.publicKey,
      );
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-lg text-base
    bg-muted/30 border border-border/40 text-foreground
    placeholder:text-muted-foreground/40
    focus:outline-none focus:border-border focus:bg-muted/50
    transition-all duration-150`;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Имя */}
      <div className="flex flex-col gap-1.5">
        <label className="text-lg font-medium text-muted-foreground">
          Name <span className="text-muted-foreground/50">*</span>
        </label>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-lg font-medium text-muted-foreground">
          E-mail <span className="text-muted-foreground/50">*</span>
        </label>
        <input
          type="email"
          placeholder="Your e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Сообщение */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-lg font-medium text-muted-foreground">
            Message <span className="text-muted-foreground/50">*</span>
          </label>
          <span className="text-base text-muted-foreground/40">
            {message.length} / {MAX_MESSAGE_LENGTH}
          </span>
        </div>
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => {
            if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
              setMessage(e.target.value);
            }
          }}
          rows={5}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Кнопка отправки */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={status === "sending" || !name || !email || !message}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
            bg-foreground text-background text-lg font-medium
            hover:opacity-90 active:scale-[0.98]
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-150 cursor-pointer"
        >
          {status === "sending" ? (
            <>
              <svg
                className="animate-spin"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Sending...
            </>
          ) : (
            <>Send Message</>
          )}
        </button>
      </div>

      {/* Статус */}
      {errorMsg && (
        <p className="text-base text-red-500 text-center">{errorMsg}</p>
      )}
      {status === "success" && (
        <p className="text-base text-emerald-500 text-center">
          Message sent! I'll get back to you soon.
        </p>
      )}
      {status === "error" && !errorMsg && (
        <p className="text-base text-red-500 text-center">
          Something went wrong. Try again or reach out directly.
        </p>
      )}
    </div>
  );
}

// ─── Главный компонент ────────────────────────────────────────────────────────
export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-8"
        >
          {/* Заголовок */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Contact
            </h2>
            <p className="mt-3 text-muted-foreground font-semibold text-lg leading-relaxed max-w-sm mx-auto">
              Whether it's a{" "}
              <span className="text-emerald-400">job opportunity</span>, a{" "}
              <span className="text-emerald-400">project</span>, or just a
              conversation, feel free to reach out.
            </p>
          </div>

          {/* Форма */}
          {EMAILJS_CONFIG && (
            <div className="w-full text-left">
              <ContactForm config={EMAILJS_CONFIG} />
            </div>
          )}

          {/* Иконки соцсетей */}
          <div className="flex items-center gap-3">
            {LINKS.map(({ label, href, color, icon }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                whileHover={{ y: -3 }}
                style={{ "--brand-color": color } as React.CSSProperties}
                className="flex items-center justify-center size-12 rounded-xl
                  border border-border/40
                  text-[var(--brand-color)] md:text-muted-foreground
                  hover:border-border hover:bg-muted/30
                  hover:text-[var(--brand-color)]
                  transition-colors duration-200"
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
