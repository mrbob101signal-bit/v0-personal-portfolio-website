import { Linkedin, Github, Facebook, ArrowUp } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/in/mr-chhinh", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/chhinh007", label: "GitHub" },
  { icon: Facebook, href: "https://facebook.com/pu.chhinh", label: "Facebook" },
]

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Resume" },
  { href: "#contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="bg-card py-12 px-6 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <Link href="#home" className="text-3xl font-bold text-foreground mb-6">
            Chhinh<span className="text-accent">.</span>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-accent transition-colors uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex gap-4 mb-8">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} <span className="text-foreground font-medium">OEUN Chhinh</span>. All Rights
            Reserved.
          </p>
        </div>
      </div>

      {/* Back to Top */}
      <Link
        href="#home"
        className="fixed right-6 bottom-6 w-12 h-12 bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/90 transition-colors z-50"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Link>
    </footer>
  )
}
