export type EducationItem = {
  id: number
  institution: string
  degree: string
  field?: string
  period?: string
  logo?: string
}

export type CertificationItem = {
  id: number
  issuer: string
  title: string
  period: string
  url?: string
}

export const education: EducationItem[] = [
  {
    id: 1,
    institution: "FPT Polytechnic",
    degree: "Graduated with honors",
  },
]

export const certifications: CertificationItem[] = []
