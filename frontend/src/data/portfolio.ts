// Nội dung portfolio, lấy từ CV (backend/data). Sửa ở đây là trang tự đổi theo.

export interface ProfileLink {
  label: string
  href: string
}

export interface Profile {
  name: string
  role: string
  location: string
  yearsOfExperience: string
  tagline: string
  strengths: string[]
  /** Thêm email / GitHub / LinkedIn... vào đây, các nút sẽ tự hiện ra ở đầu trang. */
  links: ProfileLink[]
}

export interface Skill {
  name: string
  years: number
}

export interface SkillGroup {
  title: string
  skills: Skill[]
}

export interface Job {
  company: string
  role: string
  period: string
}

export interface Project {
  name: string
  role: string
  teamSize: number
  description: string
  highlights: string[]
  tech: string[]
}

export const profile: Profile = {
  name: 'Neil Nguyen',
  role: 'Frontend Developer',
  location: 'Hanoi, Vietnam',
  yearsOfExperience: '5+',
  tagline:
    'Frontend Developer with 5+ years of experience building single-page applications with React, Next.js and Angular — from retail banking to blockchain and e-commerce.',
  strengths: [
    'Experienced with single-page applications using ReactJS, VueJS and Angular',
    'Experienced in web page design with HTML5 and CSS3',
    'Experienced with RESTful web service implementation and databases such as MySQL',
    'Hard-working and responsible for the tasks, and careful at work',
    'Good self-studying skills and proactive thinking',
    'Self-motivated, with a positive attitude and strong work ethic',
  ],
  links: [],
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'HTML5/CSS3', years: 5 },
      { name: 'JavaScript/TypeScript', years: 5 },
      { name: 'Java', years: 1 },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'ReactJS/Redux', years: 5 },
      { name: 'NextJS', years: 3 },
      { name: 'Angular', years: 3 },
      { name: 'TailwindCSS', years: 3 },
      { name: 'VueJS/Vuex (Vue 2, Vue 3)', years: 2 },
      { name: 'React Native', years: 1 },
    ],
  },
  {
    title: 'Backend & Database',
    skills: [
      { name: 'NestJS', years: 1 },
      { name: 'MySQL', years: 1 },
      { name: 'SQL Server', years: 1 },
      { name: 'MongoDB', years: 1 },
    ],
  },
  {
    title: 'DevOps',
    skills: [
      { name: 'Docker', years: 2 },
      { name: 'CI/CD', years: 2 },
      { name: 'Kubernetes', years: 1 },
      { name: 'AWS', years: 1 },
    ],
  },
  {
    title: 'Tools & Methodology',
    skills: [
      { name: 'Agile/Scrum', years: 5 },
      { name: 'GitHub/GitLab', years: 3 },
      { name: 'Writing scripts', years: 3 },
    ],
  },
]

export const experience: Job[] = [
  { company: 'Sotatek', role: 'Frontend Developer', period: 'Apr 2022 – Present' },
  { company: 'VMO Holdings', role: 'Frontend Developer', period: 'Jan 2021 – Apr 2022' },
  { company: 'ITSOL Company', role: 'Frontend Developer', period: 'Apr 2019 – Dec 2020' },
]

export const education = 'Graduated with honors — FPT Polytechnic'

export const languages = [
  { name: 'Vietnamese', level: 'Native language' },
  {
    name: 'English',
    level: 'Basic communication skills; good at reading and writing documents',
  },
]

// Thứ tự giữ nguyên như trong CV (CV không ghi dự án nào thuộc công ty nào).
export const projects: Project[] = [
  {
    name: 'Retail Banking Web',
    role: 'Frontend Developer',
    teamSize: 15,
    description:
      'Core features for a retail banking application — money transfer, savings deposit, account lookup and customer transactions — built as modular widgets.',
    highlights: [
      'Developed and optimized modular widgets for essential banking services, such as opening deposits and viewing transaction history.',
      'Integrated with backend APIs to fetch and display customer financial data securely and efficiently.',
    ],
    tech: ['Angular 10', 'Backbase', 'TypeScript', 'Jest'],
  },
  {
    name: 'SeaNet Ebank — Business Customers',
    role: 'Frontend Developer',
    teamSize: 20,
    description:
      'Business banking utilities — transaction templates, card statement views and bill payment — for domestic and foreign transfers.',
    highlights: [
      'Led UI/UX enhancements that made the app 25% more user-friendly, reducing customer complaints.',
      'Delivered a fully responsive application across devices and browsers.',
    ],
    tech: ['Angular 8', 'Bootstrap 4', 'TypeScript'],
  },
  {
    name: 'State Treasury — SeABank',
    role: 'Frontend Developer',
    teamSize: 15,
    description:
      'Web application to manage tax payments and administrative fines for state banking systems.',
    highlights: [
      'Built forms for creating, editing and printing tax returns and administrative sanctions.',
      'Improved system responsiveness and functionality, reducing error rates by 20%.',
    ],
    tech: ['Angular 8', 'Bootstrap 4', 'TypeScript'],
  },
  {
    name: 'HRSB — SeABank',
    role: 'Frontend Developer',
    teamSize: 20,
    description: 'Attendance and shift management system for employees.',
    highlights: [
      'Built the shift management module, monthly shift registrations with approvals, and a leave request function.',
      'Optimized the codebase for 30% better performance when loading and handling complex employee data.',
    ],
    tech: ['Angular 8', 'Bootstrap 4', 'TypeScript'],
  },
  {
    name: 'Toomic — Bridge',
    role: 'Frontend Developer',
    teamSize: 10,
    description:
      'A blockchain-based application for NFT token transfer transactions between multiple networks (TOON, NFT).',
    highlights: [
      'Worked closely with Business Analysts to validate requirements and with backend teams to integrate APIs.',
      'Partnered with QA to resolve critical issues, improving product stability.',
    ],
    tech: ['React.js', 'Material-UI', 'TypeScript', 'Redux', 'Tailwind CSS'],
  },
  {
    name: 'CMS — Wesang Korea',
    role: 'Frontend Developer',
    teamSize: 5,
    description:
      'Commerce Management System for a food ordering app in South Korea, managing categories, events (swimlanes) and schedules.',
    highlights: [
      'Built interfaces for managing categories and event swimlanes.',
      'Enhanced schedule management with real-time updates between the CMS and the user-facing app.',
    ],
    tech: ['ReactJS', 'NextJS', 'MUI', 'TypeScript', 'Tailwind CSS', 'Axios', 'React Query', 'Redux Toolkit'],
  },
  {
    name: 'Payment Management System — Yogyo',
    role: 'Frontend Developer',
    teamSize: 5,
    description:
      "Payment Management System for bill reconciliation and discrepancy detection between Yogyo's internal data and payment gateways such as Payco and KakaoPay.",
    highlights: [
      'Developed interfaces for billing and reconciliation records.',
      'Implemented data visualization to highlight mismatches and help the accounting team resolve discrepancies.',
    ],
    tech: ['NextJS', 'ReactJS', 'MUI', 'Tailwind CSS', 'Axios', 'React Query', 'Redux Toolkit'],
  },
  {
    name: 'Prediction Market',
    role: 'Frontend Leader',
    teamSize: 20,
    description:
      'Decentralized prediction market, inspired by PolyMarket, where users trade on the outcomes of events.',
    highlights: [
      'Built trading features: buy/sell, portfolio management with P&L tracking, and deposit/withdrawal in USDC and USDT.',
      'Integrated the Polygon blockchain with an architecture prepared for Ethereum and Binance Smart Chain, and contributed to LP-token staking.',
    ],
    tech: ['ReactJS', 'NextJS', 'MUI', 'Tailwind CSS', 'TypeScript', 'Redux', 'Web3.js', 'Ronin Waypoint'],
  },
  {
    name: 'Picasodocs',
    role: 'Frontend Developer',
    teamSize: 10,
    description:
      'Web application with User and Admin portals for token issuance, airdrop, distribution and staking on the Optimism network.',
    highlights: [
      'Implemented token distribution, staking and user engagement features.',
      'Integrated multi-language support for 15+ countries.',
    ],
    tech: ['ReactJS', 'Axios', 'Tailwind CSS', 'TypeScript', 'Zustand'],
  },
  {
    name: 'Ecojardin',
    role: 'Frontend Developer',
    teamSize: 6,
    description:
      'Website for Eco Jardin showcasing its products and services — spa, makeup, booking and education — with an Admin portal.',
    highlights: [
      'Built responsive User and Admin interfaces with an appointment booking flow via Gmail.',
      'Added English and Korean support for the user portal, and SEO optimization.',
    ],
    tech: ['ReactJS', 'NextJS 15', 'Turborepo', 'Axios', 'Tailwind CSS', 'TypeScript', 'Zustand'],
  },
  {
    name: 'Smiletoon — Comics',
    role: 'Frontend Developer',
    teamSize: 10,
    description:
      'Online reading platform for web comics and novels, with payment, membership and an Admin portal.',
    highlights: [
      'Built the reading, payment and membership flows, plus multi-language support.',
      'Integrated an AI storytelling module that generates new story content automatically.',
    ],
    tech: ['ReactJS', 'NextJS 15', 'Axios', 'Redux Toolkit', 'Tailwind CSS', 'TypeScript'],
  },
]

export type BlogPostId = 'astra-trade' | 'ai-portfolio'

export interface BlogPost {
  id: BlogPostId
  /** Nhãn loại bài hiện cạnh thời gian đọc. */
  label: string
  title: string
  summary: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 'ai-portfolio',
    label: 'Tutorial',
    title:
      'Hướng dẫn từ A-Z cách xây dựng trang web AI-Portfolio cá nhân kết nối Client-Server',
    summary:
      'Xây dựng portfolio có chatbot RAG: React + Vite phía Client, FastAPI + Gemini + FAISS phía Server. API key chỉ nằm ở Server và câu trả lời được stream về trình duyệt.',
  },
  {
    id: 'astra-trade',
    label: 'Case study',
    // Phải khớp (không phân biệt hoa/thường) với dòng đầu của content/blog_nextjs.txt
    title: 'Astra Trade: Lessons from Building a Multi-Site FX Trading Front-End',
    summary:
      'One codebase builds three separate applications (user, admin and broker) of an FX trading and risk pricing platform, selected at build time.',
  },
]
