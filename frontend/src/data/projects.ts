export type Project = {
  id: number
  title: string
  role: string
  teamSize: number
  description: string
  highlights: string[]
  tags: string[]
  github?: string
  demo?: string
  image?: string
}

// Thứ tự giữ nguyên như trong CV (CV không ghi dự án nào thuộc công ty nào).
export const projects: Project[] = [
  {
    id: 1,
    title: "Retail Banking Web",
    role: "Frontend Developer",
    teamSize: 15,
    description:
      "Core features for a retail banking application — money transfer, savings deposit, account lookup and customer transactions — built as modular widgets.",
    highlights: [
      "Developed and optimized modular widgets for essential banking services, such as opening deposits and viewing transaction history.",
      "Integrated with backend APIs to fetch and display customer financial data securely and efficiently.",
    ],
    tags: ["Angular 10", "Backbase", "TypeScript", "Jest"],
  },
  {
    id: 2,
    title: "SeaNet Ebank — Business Customers",
    role: "Frontend Developer",
    teamSize: 20,
    description:
      "Business banking utilities — transaction templates, card statement views and bill payment — for domestic and foreign transfers.",
    highlights: [
      "Led UI/UX enhancements that made the app 25% more user-friendly, reducing customer complaints.",
      "Delivered a fully responsive application across devices and browsers.",
    ],
    tags: ["Angular 8", "Bootstrap 4", "TypeScript"],
  },
  {
    id: 3,
    title: "State Treasury — SeABank",
    role: "Frontend Developer",
    teamSize: 15,
    description:
      "Web application to manage tax payments and administrative fines for state banking systems.",
    highlights: [
      "Built forms for creating, editing and printing tax returns and administrative sanctions.",
      "Improved system responsiveness and functionality, reducing error rates by 20%.",
    ],
    tags: ["Angular 8", "Bootstrap 4", "TypeScript"],
  },
  {
    id: 4,
    title: "HRSB — SeABank",
    role: "Frontend Developer",
    teamSize: 20,
    description: "Attendance and shift management system for employees.",
    highlights: [
      "Built the shift management module, monthly shift registrations with approvals, and a leave request function.",
      "Optimized the codebase for 30% better performance when loading and handling complex employee data.",
    ],
    tags: ["Angular 8", "Bootstrap 4", "TypeScript"],
  },
  {
    id: 5,
    title: "Toomic — Bridge",
    role: "Frontend Developer",
    teamSize: 10,
    description:
      "A blockchain-based application for NFT token transfer transactions between multiple networks (TOON, NFT).",
    highlights: [
      "Worked closely with Business Analysts to validate requirements and with backend teams to integrate APIs.",
      "Partnered with QA to resolve critical issues, improving product stability.",
    ],
    tags: ["React.js", "Material-UI", "TypeScript", "Redux", "Tailwind CSS"],
  },
  {
    id: 6,
    title: "CMS — Wesang Korea",
    role: "Frontend Developer",
    teamSize: 5,
    description:
      "Commerce Management System for a food ordering app in South Korea, managing categories, events (swimlanes) and schedules.",
    highlights: [
      "Built interfaces for managing categories and event swimlanes.",
      "Enhanced schedule management with real-time updates between the CMS and the user-facing app.",
    ],
    tags: ["ReactJS", "NextJS", "MUI", "TypeScript", "Tailwind CSS", "Axios", "React Query", "Redux Toolkit"],
  },
  {
    id: 7,
    title: "Payment Management System — Yogyo",
    role: "Frontend Developer",
    teamSize: 5,
    description:
      "Payment Management System for bill reconciliation and discrepancy detection between Yogyo's internal data and payment gateways such as Payco and KakaoPay.",
    highlights: [
      "Developed interfaces for billing and reconciliation records.",
      "Implemented data visualization to highlight mismatches and help the accounting team resolve discrepancies.",
    ],
    tags: ["NextJS", "ReactJS", "MUI", "Tailwind CSS", "Axios", "React Query", "Redux Toolkit"],
  },
  {
    id: 8,
    title: "Prediction Market",
    role: "Frontend Leader",
    teamSize: 20,
    description:
      "Decentralized prediction market, inspired by PolyMarket, where users trade on the outcomes of events.",
    highlights: [
      "Built trading features: buy/sell, portfolio management with P&L tracking, and deposit/withdrawal in USDC and USDT.",
      "Integrated the Polygon blockchain with an architecture prepared for Ethereum and Binance Smart Chain, and contributed to LP-token staking.",
    ],
    tags: ["ReactJS", "NextJS", "MUI", "Tailwind CSS", "TypeScript", "Redux", "Web3.js", "Ronin Waypoint"],
  },
  {
    id: 9,
    title: "Picasodocs",
    role: "Frontend Developer",
    teamSize: 10,
    description:
      "Web application with User and Admin portals for token issuance, airdrop, distribution and staking on the Optimism network.",
    highlights: [
      "Implemented token distribution, staking and user engagement features.",
      "Integrated multi-language support for 15+ countries.",
    ],
    tags: ["ReactJS", "Axios", "Tailwind CSS", "TypeScript", "Zustand"],
  },
  {
    id: 10,
    title: "Ecojardin",
    role: "Frontend Developer",
    teamSize: 6,
    description:
      "Website for Eco Jardin showcasing its products and services — spa, makeup, booking and education — with an Admin portal.",
    highlights: [
      "Built responsive User and Admin interfaces with an appointment booking flow via Gmail.",
      "Added English and Korean support for the user portal, and SEO optimization.",
    ],
    tags: ["ReactJS", "NextJS 15", "Turborepo", "Axios", "Tailwind CSS", "TypeScript", "Zustand"],
  },
  {
    id: 11,
    title: "Smiletoon — Comics",
    role: "Frontend Developer",
    teamSize: 10,
    description:
      "Online reading platform for web comics and novels, with payment, membership and an Admin portal.",
    highlights: [
      "Built the reading, payment and membership flows, plus multi-language support.",
      "Integrated an AI storytelling module that generates new story content automatically.",
    ],
    tags: ["ReactJS", "NextJS 15", "Axios", "Redux Toolkit", "Tailwind CSS", "TypeScript"],
  },
]
