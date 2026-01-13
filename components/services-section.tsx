import { Code, Layout, Server, Database, Smartphone, Wrench } from "lucide-react"

const services = [
  {
    icon: Layout,
    title: "Web Design",
    description: "Creating beautiful, responsive websites with modern design principles and user-centric approach.",
  },
  {
    icon: Code,
    title: "PHP Development",
    description: "Building robust backend solutions using PHP and Laravel framework for scalable applications.",
  },
  {
    icon: Database,
    title: "Database Management",
    description: "Designing and managing databases to ensure data integrity and optimal performance.",
  },
  {
    icon: Wrench,
    title: "IT Support",
    description: "Providing technical support and troubleshooting for hardware and software issues.",
  },
  {
    icon: Server,
    title: "Backend Development",
    description: "Developing server-side logic and APIs using Java and modern backend technologies.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Ensuring websites work flawlessly across all devices and screen sizes.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">What I Do</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4">My Services</h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-6" />
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card p-8 border border-border hover:border-accent transition-all duration-300 relative overflow-hidden"
            >
              {/* Number */}
              <span className="absolute top-4 right-4 text-6xl font-bold text-border/50 group-hover:text-accent/20 transition-colors">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div className="w-16 h-16 bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                <service.icon className="h-8 w-8 text-accent group-hover:text-accent-foreground transition-colors" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
