import { GraduationCap, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const education = [
  {
    icon: GraduationCap,
    institution: "The University of Cambodia",
    program: "Software Project Management",
    level: "Year 3",
    status: "Current",
  },
  {
    icon: Award,
    institution: "ETEC Institute",
    program: "C, C++, Web Design",
    level: "Certificate",
    status: "Completed",
  },
]

export function EducationSection() {
  return (
    <section id="education" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            <span className="text-accent">Education</span> Background
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic journey in Information Technology and Software Development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((item) => (
            <Card
              key={item.institution}
              className="bg-card border-border hover:border-accent/50 transition-all hover:shadow-lg"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-foreground">{item.institution}</CardTitle>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">{item.status}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Program</span>
                    <span className="text-foreground font-medium">{item.program}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Level</span>
                    <span className="text-foreground font-medium">{item.level}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
