import { Briefcase, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const experiences = [
  {
    title: "IT Support Intern",
    company: "The University of Cambodia",
    duration: "3 Months",
    description:
      "Provided technical support to staff and students, troubleshot hardware and software issues, and maintained IT infrastructure.",
  },
  {
    title: "Employee",
    company: "DDD Company",
    duration: "1+ Year",
    description: "Gained valuable professional experience and developed technical skills in a corporate environment.",
  },
  {
    title: "Grab Food Delivery Partner",
    company: "Grab Cambodia",
    duration: "Ongoing",
    description:
      "Developed strong time management, customer service, and navigation skills while working independently.",
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Work <span className="text-accent">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional experiences that have shaped my skills and work ethic.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.title}
                className={`relative flex flex-col md:flex-row gap-4 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-4 border-background" />

                {/* Content */}
                <div className={`ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-8" : "md:pr-8 md:text-right"}`}>
                  <Card className="bg-card border-border hover:border-accent/50 transition-all hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? "" : "md:justify-end"}`}>
                        <Briefcase className="h-4 w-4 text-accent" />
                        <span className="text-sm font-medium text-accent">{exp.company}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{exp.title}</h3>
                      <div
                        className={`flex items-center gap-2 text-sm text-muted-foreground mb-3 ${index % 2 === 0 ? "" : "md:justify-end"}`}
                      >
                        <Calendar className="h-4 w-4" />
                        {exp.duration}
                      </div>
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
