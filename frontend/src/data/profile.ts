export type ProfileLink = {
  label: string
  href: string
}

export type Profile = {
  name: string
  role: string
  location: string
  yearsOfExperience: string
  tagline: string
  strengths: string[]
  /** Link CV để hiện nút "Download CV" ở Hero (vd. "/cv.pdf" đặt trong public/). Bỏ trống thì ẩn nút. */
  cvUrl?: string
  /** label: "GitHub" | "LinkedIn" | "WhatsApp" | "Email" — các nút ở mục Contact tự hiện theo đây. */
  links: ProfileLink[]
}

export type Language = {
  name: string
  level: string
}

export const profile: Profile = {
  name: "Neil Nguyen",
  role: "Frontend Developer",
  location: "Hanoi, Vietnam",
  yearsOfExperience: "5+",
  tagline:
    "Frontend Developer with 5+ years of experience building single-page applications with React, Next.js and Angular — from retail banking to blockchain and e-commerce.",
  strengths: [
    "Experienced with single-page applications using ReactJS, VueJS and Angular",
    "Experienced in web page design with HTML5 and CSS3",
    "Experienced with RESTful web service implementation and databases such as MySQL",
    "Hard-working and responsible for the tasks, and careful at work",
    "Good self-studying skills and proactive thinking",
    "Self-motivated, with a positive attitude and strong work ethic",
  ],
  links: [],
}

export const languages: Language[] = [
  { name: "Vietnamese", level: "Native language" },
  {
    name: "English",
    level: "Basic communication skills; good at reading and writing documents",
  },
]
