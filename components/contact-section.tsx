import { Mail, Phone, Linkedin, Github, Facebook } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "chhinh007@gmail.com",
    href: "mailto:chhinh007@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "0884395053",
    href: "tel:0884395053",
  },
]

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    name: "Mr Chhinh",
    href: "https://linkedin.com/in/mr-chhinh",
  },
  {
    icon: Facebook,
    label: "Facebook",
    name: "Pu Chhinh",
    href: "https://facebook.com/pu.chhinh",
  },
  {
    icon: Github,
    label: "GitHub",
    name: "chhinh007",
    href: "https://github.com/chhinh007",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Get In <span className="text-accent">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feel free to reach out for collaboration, opportunities, or just a friendly chat!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Information */}
          <Card className="bg-card border-border">
            <CardContent className="p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-accent/10 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                </a>
              ))}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="bg-card border-border">
            <CardContent className="p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Connect With Me</h3>
              <div className="space-y-4">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-accent/10 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <item.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-foreground">{item.name}</p>
                    </div>
                  </a>
                ))}
              </div>
              <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <a href="mailto:chhinh007@gmail.com">Send Me a Message</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
