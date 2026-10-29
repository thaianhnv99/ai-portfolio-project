"use client"

import { useRef } from "react"

const ITEMS = [
 "Building interfaces",
 "Attention to detail",
 "Reading the docs",
 "Always learning",
 "Clean code",
 "User-focused",
 "Refactoring legacy code",
 "Building side projects",
 "Open to work",
 "Frontend first",
]

const repeated = [...ITEMS, ...ITEMS]

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  const pause = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused"
  }

  const resume = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running"
  }

  return (
    <div
      className="relative overflow-hidden pb-23"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
  
      <div ref={trackRef} className="flex w-max animate-marquee">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-4 px-4 mt-1 text-xl font-bold
              text-muted-foreground/50 hover:text-emerald-400
              whitespace-nowrap transition-colors duration-150
              "
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
