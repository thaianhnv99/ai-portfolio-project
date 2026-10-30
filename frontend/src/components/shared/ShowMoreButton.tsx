"use client"

import { motion } from "framer-motion"

// Nút "xem thêm" dùng chung cho Projects và Articles — cùng style với nút phụ ở Hero.
export function ShowMoreButton({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <div className="flex justify-center">
      <motion.button
        type="button"
        onClick={onClick}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg cursor-pointer
          border border-border/60 text-foreground text-base font-medium
          hover:bg-muted/60 hover:text-emerald-400 active:scale-[0.98] transition-all duration-150"
      >
        {label}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </motion.button>
    </div>
  )
}
