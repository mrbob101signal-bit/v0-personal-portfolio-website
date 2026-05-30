"use client"

import { useEffect, useState } from "react"
import { Code, Users, CheckCircle } from "lucide-react"
import { Skill } from "@/lib/types/portfolio"

const legacyLevelMap: Record<string, number> = {
  Beginner: 50,
  Intermediate: 75,
  Advanced: 90,
  Expert: 100,
}

function getSkillPercent(level: Skill["level"] | string) {
  const numericLevel = typeof level === "number" ? level : legacyLevelMap[level] ?? Number(level)
  if (!Number.isFinite(numericLevel)) return 0
  return Math.min(100, Math.max(0, numericLevel))
}

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/portfolio/skills", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setSkills(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch skills data:", error)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>

  const technicalSkillGroups = skills.reduce<Record<string, Skill[]>>((groups, skill) => {
    const category = skill.category?.trim() || "Other"
    groups[category] = [...(groups[category] || []), skill]
    return groups
  }, {})
  const softSkills = ["Teamwork & Collaboration", "Clear Communication", "Professional Relations", "Time Management", "Problem Solving", "Adaptability"]

  return (
    <section id="skills" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium tracking-widest uppercase text-accent mb-3">What I Know</h2>
          <p className="text-3xl md:text-4xl font-bold text-foreground">My Skills</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Technical Skills */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Code className="h-6 w-6 text-accent" />
              <h3 className="text-xl font-bold text-foreground">Technical Skills</h3>
            </div>
            <div className="space-y-8">
              {skills.length === 0 && (
                <p className="text-muted-foreground">No technical skills have been added yet.</p>
              )}

              {Object.entries(technicalSkillGroups).map(([category, categorySkills]) => (
                <div key={category} className="space-y-5">
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    {category}
                  </h4>

                  <div className="space-y-6">
                    {categorySkills.map((skill) => {
                      const skillPercent = getSkillPercent(skill.level)
                      const skillId = skill._id || skill.id || skill.name

                      return (
                        <div key={skillId}>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium text-foreground">{skill.name}</span>
                            <span className="text-accent font-semibold">{skillPercent}%</span>
                          </div>
                          <div className="w-full h-2 bg-muted overflow-hidden">
                            <div
                              className="h-full bg-accent transition-all duration-700"
                              style={{ width: `${skillPercent}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Users className="h-6 w-6 text-accent" />
              <h3 className="text-xl font-bold text-foreground">Soft Skills</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {softSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-3 p-4 border border-border hover:border-accent transition-colors group"
                >
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
