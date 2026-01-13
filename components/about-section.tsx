import { Code, Briefcase, GraduationCap, Award } from "lucide-react"
import Image from "next/image"

const stats = [
  { icon: GraduationCap, value: "Year 3", label: "IT Student" },
  { icon: Briefcase, value: "1+", label: "Years Experience" },
  { icon: Award, value: "3", label: "Months Internship" },
  { icon: Code, value: "4+", label: "Technical Skills" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-secondary">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">About Me</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4">Know Me More</h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative">
              <Image
                src="/professional-young-asian-man-in-business-casual-sm.jpg"
                alt="OEUN Chhinh"
                width={500}
                height={600}
                className="w-full object-cover"
              />
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border-4 border-accent -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/10 -z-10" />
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              I'm <span className="text-accent">OEUN Chhinh</span>
            </h3>
            <p className="text-lg text-accent mb-6">Web Designer & IT Student</p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              I am a dedicated 3rd-year IT student at The University of Cambodia, originally from Tbong Khmum Province.
              My journey in technology began at ETEC Institute, where I studied C, C++, and Web Design, building a
              strong foundation for my career.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              With over a year of experience at DDD company and 3 months as an IT Support Intern at UC, I have developed
              practical skills in both technical support and professional collaboration. My career objective is to excel
              in Web Design, PHP, Laravel, and Java development.
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <span className="text-accent font-semibold">Name:</span>
                <span className="text-foreground ml-2">OEUN Chhinh</span>
              </div>
              <div>
                <span className="text-accent font-semibold">Email:</span>
                <span className="text-foreground ml-2">chhinh007@gmail.com</span>
              </div>
              <div>
                <span className="text-accent font-semibold">From:</span>
                <span className="text-foreground ml-2">Tbong Khmum, Cambodia</span>
              </div>
              <div>
                <span className="text-accent font-semibold">Phone:</span>
                <span className="text-foreground ml-2">0884395053</span>
              </div>
            </div>

            <a
              href="/resume.pdf"
              className="inline-block px-8 py-4 bg-accent text-accent-foreground font-semibold uppercase tracking-wider text-sm hover:bg-accent/90 transition-colors"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card p-8 text-center border border-border hover:border-accent transition-all group"
            >
              <stat.icon className="h-10 w-10 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
