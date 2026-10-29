import { profile } from "@/data/profile"

export function Footer() {
  return (
    <footer id="contact" className="border-t items-center text-center border-border/40 py-10 px-6">
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row justify-center gap-4">
        <p className="text-xl text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  )
}