"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Linkedin, Github, Facebook } from "lucide-react"

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/in/mr-chhinh", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/chhinh007", label: "GitHub" },
  { icon: Facebook, href: "https://facebook.com/pu.chhinh", label: "Facebook" },
]

const roles = ["Web Designer", "PHP Developer", "IT Student"]

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const role = roles[currentRole]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentRole((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/professional-dark-office-workspace-with-computer-c.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-background/90" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div>
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4">Welcome to my portfolio</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-tight">
              Hi, I'm <span className="text-accent block mt-2">OEUN Chhinh</span>
            </h1>
            <div className="text-xl md:text-2xl text-muted-foreground mb-8 h-8">
              <span>{displayText}</span>
              <span className="animate-pulse text-accent">|</span>
            </div>
            <p className="text-muted-foreground max-w-lg mb-10 text-lg leading-relaxed">
              A passionate 3rd-year IT student at The University of Cambodia with hands-on experience in technical
              support and software development.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                href="#about"
                className="px-8 py-4 bg-accent text-accent-foreground font-semibold uppercase tracking-wider text-sm hover:bg-accent/90 transition-colors"
              >
                About Me
              </Link>
              <Link
                href="#contact"
                className="px-8 py-4 border-2 border-foreground/20 text-foreground font-semibold uppercase tracking-wider text-sm hover:border-accent hover:text-accent transition-colors"
              >
                Contact Me
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground uppercase tracking-wider">Follow Me</span>
              <div className="w-12 h-px bg-border" />
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
          </div>

          {/* Right - Image */}
          <div className="hidden lg:block relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute -inset-4 border-2 border-accent/30" />
              <div className="absolute -inset-8 border border-accent/10" />
              <img
                src="/professional-portrait-asian-male.jpg"
                alt="OEUN Chhinh"
                className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  )
}
