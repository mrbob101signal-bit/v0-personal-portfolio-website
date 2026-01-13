import { GraduationCap, Briefcase } from "lucide-react"

const education = [
  {
    title: "Bachelor of Information Technology",
    organization: "The University of Cambodia",
    period: "2023 - Present",
    description: "Specializing in Software Project Management. Currently in Year 3.",
  },
  {
    title: "Certificate Program",
    organization: "ETEC Institute",
    period: "Completed",
    description: "Studied C, C++, and Web Design fundamentals.",
  },
]

const experience = [
  {
    title: "IT Support Intern",
    organization: "The University of Cambodia",
    period: "3 Months",
    description: "Provided technical support, troubleshot hardware/software issues, maintained IT infrastructure.",
  },
  {
    title: "Employee",
    organization: "DDD Company",
    period: "1+ Year",
    description: "Gained professional experience, developed technical skills, collaborated on various projects.",
  },
  {
    title: "Food Delivery Partner",
    organization: "Grab Cambodia",
    period: "Ongoing",
    description: "Developed time management and customer service skills with high satisfaction ratings.",
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">My Journey</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4">Resume</h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-accent flex items-center justify-center">
                <GraduationCap className="h-7 w-7 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Education</h3>
            </div>

            <div className="space-y-6 border-l-2 border-border pl-8 relative">
              {education.map((item, index) => (
                <div key={item.title} className="relative">
                  <div className="absolute -left-[41px] top-0 w-4 h-4 bg-accent" />
                  <div className="bg-card p-6 border border-border hover:border-accent transition-colors">
                    <span className="text-accent text-sm font-medium">{item.period}</span>
                    <h4 className="text-lg font-bold text-foreground mt-2">{item.title}</h4>
                    <p className="text-accent/80 text-sm mt-1">{item.organization}</p>
                    <p className="text-muted-foreground mt-3">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-accent flex items-center justify-center">
                <Briefcase className="h-7 w-7 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Experience</h3>
            </div>

            <div className="space-y-6 border-l-2 border-border pl-8 relative">
              {experience.map((item, index) => (
                <div key={item.title} className="relative">
                  <div className="absolute -left-[41px] top-0 w-4 h-4 bg-accent" />
                  <div className="bg-card p-6 border border-border hover:border-accent transition-colors">
                    <span className="text-accent text-sm font-medium">{item.period}</span>
                    <h4 className="text-lg font-bold text-foreground mt-2">{item.title}</h4>
                    <p className="text-accent/80 text-sm mt-1">{item.organization}</p>
                    <p className="text-muted-foreground mt-3">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
