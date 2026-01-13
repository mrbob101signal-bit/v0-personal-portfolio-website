import { Mail, Phone, MapPin, Send, Linkedin, Github, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    value: "Tbong Khmum Province, Cambodia",
  },
  {
    icon: Mail,
    title: "Email",
    value: "chhinh007@gmail.com",
    href: "mailto:chhinh007@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "0884395053",
    href: "tel:0884395053",
  },
]

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/in/mr-chhinh", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/chhinh007", label: "GitHub" },
  { icon: Facebook, href: "https://facebook.com/pu.chhinh", label: "Facebook" },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 bg-secondary">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4">Contact Me</h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Let's talk about everything!</h3>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Feel free to reach out for collaboration, opportunities, or just a friendly chat. I'm always open to
              discussing new projects and creative ideas.
            </p>

            <div className="space-y-6 mb-10">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-accent flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                    {item.href ? (
                      <a href={item.href} className="text-muted-foreground hover:text-accent transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-bold text-foreground mb-4">Follow Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-card border border-border flex items-center justify-center text-muted-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border p-8">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                  placeholder="Your Name"
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:border-accent h-14"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:border-accent h-14"
                />
              </div>
              <Input
                placeholder="Subject"
                className="border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:border-accent h-14"
              />
              <Textarea
                placeholder="Your Message"
                rows={6}
                className="border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:border-accent resize-none"
              />
              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-14 font-semibold uppercase tracking-wider"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
