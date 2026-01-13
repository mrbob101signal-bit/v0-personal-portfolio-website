const technicalSkills = [
  { name: "PHP", level: 85 },
  { name: "Laravel", level: 80 },
  { name: "Web Design (HTML/CSS/JS)", level: 90 },
  { name: "Java (Basic)", level: 65 },
  { name: "C/C++", level: 72 },
]

const softSkills = [
  "Teamwork & Collaboration",
  "Clear Communication",
  "Professional Relations",
  "Time Management",
  "Problem Solving",
  "Adaptability",
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 bg-secondary">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">My Expertise</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4">My Skills</h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Technical Skills */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="w-12 h-1 bg-accent" />
              Technical Skills
            </h3>
            <div className="space-y-6">
              {technicalSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-3">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="text-accent font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-card overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="w-12 h-1 bg-accent" />
              Soft Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {softSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-4 p-5 bg-card border border-border hover:border-accent transition-colors group"
                >
                  <span className="w-3 h-3 bg-accent flex-shrink-0" />
                  <span className="text-foreground font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
