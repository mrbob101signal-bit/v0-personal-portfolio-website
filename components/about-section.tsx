import { Briefcase, GraduationCap, Target, Award } from "lucide-react"
import Image from "next/image"

const highlights = [
  { icon: GraduationCap, value: "Year 3", label: "IT Student at UC" },
  { icon: Briefcase, value: "1+ Year", label: "Work Experience" },
  { icon: Award, value: "3 Months", label: "UC Internship" },
  { icon: Target, value: "4+", label: "Technical Skills" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium tracking-widest uppercase text-accent mb-3">About Me</h2>
          <p className="text-3xl md:text-4xl font-bold text-foreground">Know Me More</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left - Image */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden">
                <Image src="/professional-young-asian-man-in-business-casual-sm.jpg" alt="OEUN Chhinh" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent -z-10" />
            </div>
          </div>

          {/* Right - Content */}
          <div className="lg:col-span-7">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              I'm <span className="text-accent">OEUN Chhinh</span>,
            </h3>
            <p className="text-lg text-muted-foreground mb-6">a Web Designer & IT Student</p>

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

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">Name:</span>
                <span className="text-muted-foreground">OEUN Chhinh</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">Email:</span>
                <span className="text-muted-foreground">chhinh007@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">From:</span>
                <span className="text-muted-foreground">Tbong Khmum, Cambodia</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">Phone:</span>
                <span className="text-muted-foreground">0884395053</span>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="text-center p-6 border border-border hover:border-accent transition-colors group"
            >
              <item.icon className="h-8 w-8 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-foreground mb-1">{item.value}</div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
