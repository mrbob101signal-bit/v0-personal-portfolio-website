import { Briefcase, Calendar, MapPin } from "lucide-react"

const experiences = [
  {
    title: "IT Support Intern",
    company: "The University of Cambodia",
    location: "Phnom Penh",
    duration: "3 Months",
    description: [
      "Provided technical support to staff and students",
      "Troubleshot hardware and software issues",
      "Maintained IT infrastructure and equipment",
      "Assisted in network administration tasks",
    ],
  },
  {
    title: "Employee",
    company: "DDD Company",
    location: "Cambodia",
    duration: "1+ Year",
    description: [
      "Gained valuable professional experience",
      "Developed technical skills in a corporate environment",
      "Collaborated with team members on various projects",
      "Enhanced problem-solving abilities",
    ],
  },
  {
    title: "Food Delivery Partner",
    company: "Grab Cambodia",
    location: "Cambodia",
    duration: "Ongoing",
    description: [
      "Developed strong time management skills",
      "Enhanced customer service abilities",
      "Improved navigation and route optimization",
      "Maintained high customer satisfaction ratings",
    ],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 bg-secondary/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium tracking-widest uppercase text-accent mb-3">Experience</h2>
          <p className="text-3xl md:text-4xl font-bold text-foreground">My Work History</p>
        </div>

        <div className="relative pl-8 border-l-2 border-accent/30 space-y-12">
          {experiences.map((exp, index) => (
            <div key={exp.title} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[41px] top-0 w-4 h-4 bg-accent rounded-full border-4 border-background" />

              <div className="bg-card p-6 border border-border hover:border-accent hover:shadow-lg transition-all">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="flex items-center gap-2 text-accent font-medium">
                    <Briefcase className="h-4 w-4" />
                    {exp.company}
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4" />
                    {exp.location}
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4" />
                    {exp.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4">{exp.title}</h3>

                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-accent mt-1.5 w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
