export type ExperienceItem = {
  id: number
  company: string
  role: string
  period: string
  duration?: string
  description?: string
  achievements?: string[]
  logo?: string
}

export const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "Sotatek",
    role: "Frontend Developer",
    period: "Apr 2022 — Present",
  },
  {
    id: 2,
    company: "VMO Holdings",
    role: "Frontend Developer",
    period: "Jan 2021 — Apr 2022",
  },
  {
    id: 3,
    company: "ITSOL Company",
    role: "Frontend Developer",
    period: "Apr 2019 — Dec 2020",
  },
]
