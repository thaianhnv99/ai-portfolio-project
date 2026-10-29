export type StackItem = {
  name: string
  years: number
  icon?: string       // devicon class, напр. "devicon-react-original"; без иконки показываются инициалы
  color?: string      // фирменный цвет для hover
}

export type StackCategory = {
  id: string
  label: string
  items: StackItem[]
}

// Полный список devicon-классов: https://devicon.dev/
export const stack: StackCategory[] = [
  {
    id: "languages",
    label: "Languages",
    items: [
      { name: "HTML5/CSS3",            years: 5, icon: "devicon-html5-plain",       color: "#E34F26" },
      { name: "JavaScript/TypeScript", years: 5, icon: "devicon-typescript-plain",  color: "#3178C6" },
      { name: "Java",                  years: 1, icon: "devicon-java-plain",        color: "#ED8B00" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "ReactJS/Redux",             years: 5, icon: "devicon-react-original",    color: "#61DAFB" },
      { name: "NextJS",                    years: 3, icon: "devicon-nextjs-plain",      color: "#000000" },
      { name: "Angular",                   years: 3, icon: "devicon-angular-plain",     color: "#DD0031" },
      { name: "TailwindCSS",               years: 3, icon: "devicon-tailwindcss-plain", color: "#06B6D4" },
      { name: "VueJS/Vuex (Vue 2, Vue 3)", years: 2, icon: "devicon-vuejs-plain",       color: "#4FC08D" },
      { name: "React Native",              years: 1, icon: "devicon-react-original",    color: "#61DAFB" },
    ],
  },
  {
    id: "backend-database",
    label: "Backend & Database",
    items: [
      { name: "NestJS",     years: 1, icon: "devicon-nestjs-plain",           color: "#E0234E" },
      { name: "MySQL",      years: 1, icon: "devicon-mysql-plain",            color: "#4479A1" },
      { name: "SQL Server", years: 1, icon: "devicon-microsoftsqlserver-plain", color: "#CC2927" },
      { name: "MongoDB",    years: 1, icon: "devicon-mongodb-plain",          color: "#47A248" },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    items: [
      { name: "Docker",     years: 2, icon: "devicon-docker-plain",           color: "#2496ED" },
      { name: "CI/CD",      years: 2 },
      { name: "Kubernetes", years: 1, icon: "devicon-kubernetes-plain",       color: "#326CE5" },
      { name: "AWS",        years: 1, icon: "devicon-amazonwebservices-plain", color: "#FF9900" },
    ],
  },
  {
    id: "tools-methodology",
    label: "Tools & Methodology",
    items: [
      { name: "Agile/Scrum",    years: 5 },
      { name: "GitHub/GitLab",  years: 3, icon: "devicon-github-original", color: "#6e7681" },
      { name: "Writing scripts", years: 3 },
    ],
  },
]
