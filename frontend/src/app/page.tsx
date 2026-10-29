import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/sections/Hero"
import { AboutSection } from "@/components/sections/About"
import { ExperienceSection } from "@/components/sections/Experience"
import { Marquee } from "@/components/shared/Marquee"

// Остальные секции добавляй по мере готовности:
import { StackSection } from "@/components/sections/Stack"
import { ProjectsSection } from "@/components/sections/Projects"
import { EducationSection, CertificationsSection } from "@/components/sections/EducationCertifications"
import { ContactSection } from "@/components/sections/Contact"

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* 1. Hero — первый экран */}
        <HeroSection />

        <div className="max-w-2xl mx-auto">
          <Marquee />
        </div>
        
        {/* 2. About — сильные стороны и языки */}
        <AboutSection />

        {/* 2.1. Stack — технологии */}
        <StackSection />

        {/* 3. Projects — проекты */}
        <ProjectsSection />

        {/* 4. Experience — опыт работы */}
        <ExperienceSection />

        {/* 5. Education — образование */}
        <EducationSection />

        {/* 6. Certifications — сертификаты */}
        <CertificationsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
