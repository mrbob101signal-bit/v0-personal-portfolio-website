import { MapPin, Briefcase, GraduationCap, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const highlights = [
  {
    icon: MapPin,
    title: "Location",
    description: "From Tbong Khmum Province, Cambodia",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "3rd-year IT student at The University of Cambodia",
  },
  {
    icon: Briefcase,
    title: "Experience",
    description: "Former DDD employee (1+ year) & UC IT Support Intern (3 months)",
  },
  {
    icon: Target,
    title: "Focus",
    description: "Web Design, PHP, Laravel, and Java Development",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            About <span className="text-accent">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A dedicated IT student with hands-on experience in technical support and software development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              I am OEUN Chhinh, a passionate 3rd-year IT student at The University of Cambodia, originally from Tbong
              Khmum Province. My journey in technology began at ETEC Institute, where I studied C, C++, and Web Design,
              laying a strong foundation for my career.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With over a year of experience at DDD company and 3 months as an IT Support Intern at UC, I have developed
              practical skills in both technical support and professional collaboration. My career objective is to excel
              in Web Design, PHP, Laravel, and Java development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item) => (
              <Card key={item.title} className="bg-card border-border hover:border-accent/50 transition-colors">
                <CardContent className="p-4">
                  <item.icon className="h-8 w-8 text-accent mb-3" />
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
