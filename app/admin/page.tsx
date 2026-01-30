"use client"

import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getSession, logout } from "@/lib/auth-context"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("about")
  const [about, setAbout] = useState<any>(null)
  const [experience, setExperience] = useState<any[]>([])
  const [education, setEducation] = useState<any[]>([])
  const [skills, setSkills] = useState<any[]>([])
  const [newExperience, setNewExperience] = useState<any>({
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
  })
  const [newEducation, setNewEducation] = useState<any>({
    institution: "The University of Cambodia",
    program: "Bachelor of Information Technology",
    specialization: "Software Project Management",
    period: "2023 - Present",
    status: "Current",
  })
  const [newSkill, setNewSkill] = useState<any>({
    name: "JavaScript",
    category: "Frontend",
    level: "Advanced",
  })
  const [loading, setLoading] = useState(false)
  const [session, setSession] = useState<any>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userSession = getSession()
    if (!userSession) {
      router.push("/login")
      return
    }

    if (userSession.role !== "admin") {
      router.push("/portfolio-view")
      return
    }

    setSession(userSession)
    setIsAuthorized(true)
    loadAllData()
  }, [router])

  const loadAllData = async () => {
    try {
      const [aboutRes, expRes, eduRes, skillRes] = await Promise.all([
        fetch("/api/portfolio/about"),
        fetch("/api/portfolio/experience"),
        fetch("/api/portfolio/education"),
        fetch("/api/portfolio/skills"),
      ])

      setAbout(await aboutRes.json())
      setExperience(await expRes.json())
      setEducation(await eduRes.json())
      setSkills(await skillRes.json())
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }

  const handleUpdateAbout = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/portfolio/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(about),
      })
      if (res.ok) {
        const updatedAbout = await res.json()
        setAbout(updatedAbout)
        alert("About section updated successfully!")
      } else {
        alert("Error: " + res.statusText)
      }
    } catch (error) {
      console.error("Error updating about data:", error)
      alert("Error updating about data: " + error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateExperience = async (exp: any) => {
    setLoading(true)
    try {
      const res = await fetch("/api/portfolio/experience", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exp),
      })
      if (res.ok) {
        alert("Experience updated successfully!")
        setEditingId(null)
        loadAllData()
      }
    } catch (error) {
      console.error("Error updating experience:", error)
      alert("Error updating experience")
    } finally {
      setLoading(false)
    }
  }

  const handleAddExperience = async () => {
    // prevent adding empty entries
    if (!newExperience.title || !newExperience.company) {
      alert("Please provide at least a title and company for the experience.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/portfolio/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newExperience,
          description: newExperience.description?.filter((line: string) => line.trim().length > 0) || [],
        }),
      })
      if (res.ok) {
        alert("Experience added successfully!")
        setNewExperience({ title: "", company: "", location: "", duration: "", description: [] })
        loadAllData()
      } else {
        const err = await res.text()
        console.error("Add experience failed:", err)
        alert("Failed to add experience")
      }
    } catch (error) {
      console.error("Error adding experience:", error)
      alert("Error adding experience")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteExperience = async (expId: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return

    setLoading(true)
    try {
      const res = await fetch(`/api/portfolio/experience?id=${expId}`, {
        method: "DELETE",
      })

      if (res.ok) {
        alert("Experience deleted successfully!")
        loadAllData()
      } else {
        const err = await res.json()
        alert(err.error || "Failed to delete experience")
      }
    } catch (error) {
      console.error("Error deleting experience:", error)
      alert("Error deleting experience")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateEducation = async (edu: any) => {
    setLoading(true)
    try {
      const res = await fetch("/api/portfolio/education", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(edu),
      })
      if (res.ok) {
        alert("Education updated successfully!")
        setEditingId(null)
        loadAllData()
      }
    } catch (error) {
      console.error("Error updating education:", error)
      alert("Error updating education")
    } finally {
      setLoading(false)
    }
  }

  const handleAddEducation = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/portfolio/education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEducation),
      })
      if (res.ok) {
        alert("Education added successfully!")
        setNewEducation({
          institution: "",
          program: "",
          specialization: "",
          period: "",
          status: "Current",
        })
        loadAllData()
      }
    } catch (error) {
      console.error("Error adding education:", error)
      alert("Error adding education")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEducation = async (eduId: string) => {
    if (!confirm("Are you sure you want to delete this education?")) return

    setLoading(true)
    try {
      const res = await fetch(`/api/portfolio/education?id=${eduId}`, {
        method: "DELETE",
      })

      if (res.ok) {
        alert("Education deleted successfully!")
        loadAllData()
      } else {
        const err = await res.json()
        alert(err.error || "Failed to delete education")
      }
    } catch (error) {
      console.error("Error deleting education:", error)
      alert("Error deleting education")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSkill = async (skillId: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return

    setLoading(true)
    try {
      const res = await fetch(`/api/portfolio/skills?id=${skillId}`, {
        method: "DELETE",
      })

      if (res.ok) {
        alert("Skill deleted successfully!")
        loadAllData()
      } else {
        const err = await res.json()
        alert(err.error || "Failed to delete skill")
      }
    } catch (error) {
      console.error("Error deleting skill:", error)
      alert("Error deleting skill")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateSkill = async (skill: any) => {
    setLoading(true)
    try {
      const res = await fetch("/api/portfolio/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skill),
      })
      if (res.ok) {
        alert("Skill updated successfully!")
        setEditingId(null)
        loadAllData()
      }
    } catch (error) {
      console.error("Error updating skill:", error)
      alert("Error updating skill")
    } finally {
      setLoading(false)
    }
  }

  const handleAddSkill = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/portfolio/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSkill),
      })
      if (res.ok) {
        alert("Skill added successfully!")
        setNewSkill({
          name: "",
          category: "",
          level: "",
        })
        loadAllData()
      }
    } catch (error) {
      console.error("Error adding skill:", error)
      alert("Error adding skill")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (!isAuthorized || !session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Admin Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <p className="text-muted-foreground">
                Logged in as:{" "}
                <span className="font-medium text-accent">{session.email}</span>
              </p>
              <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm font-medium">
                ✓ Admin
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => router.push("/messages")}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              📧 Messages
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </Button>
          </div>
        </div>

        <p className="text-muted-foreground mb-8">Manage your portfolio content</p>

        <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg mb-8">
          <p className="text-sm text-green-300">
            ✓ You have admin access. You can edit and manage all portfolio content.
          </p>
        </div>

        <div className="flex gap-4 mb-8 flex-wrap">
          <Button
            onClick={() => setActiveTab("about")}
            className={activeTab === "about" ? "bg-accent text-white" : "bg-secondary text-gray-700"}
          >
            About
          </Button>
          <Button
            onClick={() => setActiveTab("experience")}
            className={activeTab === "experience" ? "bg-accent text-white" : "bg-secondary text-gray-700"}
          >
            Experience
          </Button>
          <Button
            onClick={() => setActiveTab("education")}
            className={activeTab === "education" ? "bg-accent text-white" : "bg-secondary text-gray-700"}
          >
            Education
          </Button>
          <Button
            onClick={() => setActiveTab("skills")}
            className={activeTab === "skills" ? "bg-accent text-white" : "bg-secondary text-gray-700"}
          >
            Skills
          </Button>
        </div>

        {activeTab === "about" && (
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">About Section</h2>
            <p className="text-muted-foreground mb-6">Update your personal information</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input
                  value={about?.name || ""}
                  onChange={(e) => setAbout({ ...about, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={about?.title || ""}
                  onChange={(e) => setAbout({ ...about, title: e.target.value })}
                  placeholder="Your title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <Input
                  value={about?.bio || ""}
                  onChange={(e) => setAbout({ ...about, bio: e.target.value })}
                  placeholder="Short bio"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Detailed Bio</label>
                <Textarea
                  value={about?.detailedBio || ""}
                  onChange={(e) => setAbout({ ...about, detailedBio: e.target.value })}
                  placeholder="Detailed biography"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Additional Info</label>
                <Textarea
                  value={about?.additionalInfo || ""}
                  onChange={(e) => setAbout({ ...about, additionalInfo: e.target.value })}
                  placeholder="Additional information"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    value={about?.email || ""}
                    onChange={(e) => setAbout({ ...about, email: e.target.value })}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input
                    value={about?.phone || ""}
                    onChange={(e) => setAbout({ ...about, phone: e.target.value })}
                    placeholder="Phone"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  value={about?.location || ""}
                  onChange={(e) => setAbout({ ...about, location: e.target.value })}
                  placeholder="Location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <Input
                  value={about?.image || ""}
                  onChange={(e) => setAbout({ ...about, image: e.target.value })}
                  placeholder="Image URL"
                />
              </div>

              <Button
                onClick={handleUpdateAbout}
                disabled={loading}
                className="w-full bg-accent hover:bg-accent/90 text-white"
              >
                {loading ? "Updating..." : "Update About"}
              </Button>
            </div>
          </div>
        )}

        {activeTab === "experience" && (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">Experience</h2>
              </div>

              <div className="border border-border rounded-lg p-6 bg-secondary/30 mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Add New Experience</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input
                      value={newExperience.title}
                      onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                      placeholder="Job title"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Company</label>
                      <Input
                        value={newExperience.company}
                        onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <Input
                        value={newExperience.location}
                        onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Duration</label>
                    <Input
                      value={newExperience.duration}
                      onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                      placeholder="e.g. 3 Months"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description (each line is a bullet point)</label>
                    <Textarea
                      value={newExperience.description?.join("\n") || ""}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          description: e.target.value.split("\n"),
                        })
                      }
                      rows={4}
                      placeholder="Add bullet points, one per line"
                    />
                  </div>

                  <Button
                    onClick={handleAddExperience}
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-600 text-white w-full"
                  >
                    {loading ? "Adding..." : "Add Experience"}
                  </Button>
                </div>
              </div>

              {experience.length === 0 ? (
                <p className="text-muted-foreground">No experience entries yet.</p>
              ) : (
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id} className="border border-border rounded-lg p-6 bg-secondary/50">
                      {editingId === exp.id ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Title</label>
                            <Input
                              value={exp.title}
                              onChange={(e) => {
                                const updated = experience.map((x) =>
                                  x.id === exp.id ? { ...x, title: e.target.value } : x
                                )
                                setExperience(updated)
                              }}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Company</label>
                              <Input
                                value={exp.company}
                                onChange={(e) => {
                                  const updated = experience.map((x) =>
                                    x.id === exp.id ? { ...x, company: e.target.value } : x
                                  )
                                  setExperience(updated)
                                }}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Location</label>
                              <Input
                                value={exp.location}
                                onChange={(e) => {
                                  const updated = experience.map((x) =>
                                    x.id === exp.id ? { ...x, location: e.target.value } : x
                                  )
                                  setExperience(updated)
                                }}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Duration</label>
                            <Input
                              value={exp.duration}
                              onChange={(e) => {
                                const updated = experience.map((x) =>
                                  x.id === exp.id ? { ...x, duration: e.target.value } : x
                                )
                                setExperience(updated)
                              }}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Description (each line is a bullet point)</label>
                            <Textarea
                              value={exp.description?.join("\n") || ""}
                              onChange={(e) => {
                                const updated = experience.map((x) =>
                                  x.id === exp.id ? { ...x, description: e.target.value.split("\n") } : x
                                )
                                setExperience(updated)
                              }}
                              rows={4}
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleUpdateExperience(exp)}
                              disabled={loading}
                              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                            >
                              {loading ? "Saving..." : "Save"}
                            </Button>
                            <Button
                              onClick={() => setEditingId(null)}
                              className="flex-1 bg-secondary hover:bg-secondary/80"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-foreground">{exp.title}</h3>
                              <p className="text-accent font-medium">{exp.company}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => setEditingId(exp.id)}
                                className="bg-accent hover:bg-accent/90 text-white"
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() => handleDeleteExperience(exp.id)}
                                disabled={loading}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{exp.location} • {exp.duration}</p>
                          <ul className="text-sm text-foreground space-y-1">
                            {exp.description?.map((desc: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, i: Key | null | undefined) => (
                              <li key={i}>• {desc}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "education" && (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">Education</h2>
              </div>

              <div className="border border-border rounded-lg p-6 bg-secondary/30 mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Add New Education</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Institution</label>
                    <Input
                      value={newEducation.institution}
                      onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                      placeholder="Institution name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Program</label>
                    <Input
                      value={newEducation.program}
                      onChange={(e) => setNewEducation({ ...newEducation, program: e.target.value })}
                      placeholder="Program"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Specialization</label>
                    <Input
                      value={newEducation.specialization}
                      onChange={(e) =>
                        setNewEducation({ ...newEducation, specialization: e.target.value })
                      }
                      placeholder="Specialization"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Period</label>
                      <Input
                        value={newEducation.period}
                        onChange={(e) => setNewEducation({ ...newEducation, period: e.target.value })}
                        placeholder="e.g. 2023 - Present"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <Input
                        value={newEducation.status}
                        onChange={(e) => setNewEducation({ ...newEducation, status: e.target.value })}
                        placeholder="Current"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleAddEducation}
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-600 text-white w-full"
                  >
                    {loading ? "Adding..." : "Add Education"}
                  </Button>
                </div>
              </div>

              {education.length === 0 ? (
                <p className="text-muted-foreground">No education entries yet.</p>
              ) : (
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu._id || edu.id} className="border border-border rounded-lg p-6 bg-secondary/50">
                      {editingId === (edu._id || edu.id) ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Institution</label>
                            <Input
                              value={edu.institution}
                              onChange={(e) => {
                                const updated = education.map((x) =>
                                  x.id === edu.id ? { ...x, institution: e.target.value } : x
                                )
                                setEducation(updated)
                              }}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Program</label>
                            <Input
                              value={edu.program}
                              onChange={(e) => {
                                const updated = education.map((x) =>
                                  x.id === edu.id ? { ...x, program: e.target.value } : x
                                )
                                setEducation(updated)
                              }}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Specialization</label>
                            <Input
                              value={edu.specialization}
                              onChange={(e) => {
                                const updated = education.map((x) =>
                                  x.id === edu.id ? { ...x, specialization: e.target.value } : x
                                )
                                setEducation(updated)
                              }}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Period</label>
                              <Input
                                value={edu.period}
                                onChange={(e) => {
                                  const updated = education.map((x) =>
                                    x.id === edu.id ? { ...x, period: e.target.value } : x
                                  )
                                  setEducation(updated)
                                }}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Status</label>
                              <Input
                                value={edu.status}
                                onChange={(e) => {
                                  const updated = education.map((x) =>
                                    x.id === edu.id ? { ...x, status: e.target.value } : x
                                  )
                                  setEducation(updated)
                                }}
                              />
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleUpdateEducation(edu)}
                              disabled={loading}
                              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                            >
                              {loading ? "Saving..." : "Save"}
                            </Button>
                            <Button
                              onClick={() => setEditingId(null)}
                              className="flex-1 bg-secondary hover:bg-secondary/80"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-foreground">{edu.program}</h3>
                              <p className="text-accent font-medium">{edu.institution}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => setEditingId(edu._id || edu.id)}
                                className="bg-accent hover:bg-accent/90 text-white"
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() => handleDeleteEducation(edu._id || edu.id)}
                                disabled={loading}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{edu.specialization}</p>
                          <p className="text-sm text-foreground">{edu.period} • {edu.status}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">Skills</h2>
              </div>

              <div className="border border-border rounded-lg p-6 bg-secondary/30 mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Add New Skill</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Skill Name</label>
                    <Input
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      placeholder="e.g., JavaScript"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <Input
                        value={newSkill.category}
                        onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                        placeholder="e.g., Frontend"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Level</label>
                      <Input
                        value={newSkill.level}
                        onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                        placeholder="e.g., Advanced"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleAddSkill}
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-600 text-white w-full"
                  >
                    {loading ? "Adding..." : "Add Skill"}
                  </Button>
                </div>
              </div>

              {skills.length === 0 ? (
                <p className="text-muted-foreground">No skills yet. Click "Add Skill" to add one.</p>
              ) : (
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="border border-border rounded-lg p-6 bg-secondary/50">
                      {editingId === skill.id ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Skill Name</label>
                            <Input
                              value={skill.name}
                              onChange={(e) => {
                                const updated = skills.map((s) =>
                                  s.id === skill.id ? { ...s, name: e.target.value } : s
                                )
                                setSkills(updated)
                              }}
                              placeholder="e.g., JavaScript"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Category</label>
                              <Input
                                value={skill.category}
                                onChange={(e) => {
                                  const updated = skills.map((s) =>
                                    s.id === skill.id ? { ...s, category: e.target.value } : s
                                  )
                                  setSkills(updated)
                                }}
                                placeholder="e.g., Frontend"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Level</label>
                              <Input
                                value={skill.level}
                                onChange={(e) => {
                                  const updated = skills.map((s) =>
                                    s.id === skill.id ? { ...s, level: e.target.value } : s
                                  )
                                  setSkills(updated)
                                }}
                                placeholder="e.g., Advanced"
                              />
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleUpdateSkill(skill)}
                              disabled={loading}
                              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                            >
                              {loading ? "Saving..." : "Save"}
                            </Button>
                            <Button
                              onClick={() => setEditingId(null)}
                              className="flex-1 bg-secondary hover:bg-secondary/80"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-foreground text-lg">{skill.name}</p>
                            <p className="text-sm text-muted-foreground">{skill.category} • {skill.level}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => setEditingId(skill.id)}
                              className="bg-accent hover:bg-accent/90 text-white"
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteSkill(skill.id)}
                              disabled={loading}
                              className="bg-red-500 hover:bg-red-600 text-white"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-secondary rounded-lg border border-border">
          <h3 className="text-sm font-medium mb-2">How to use the admin panel:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Use the tabs above to switch between different sections</li>
            <li>• Edit the information directly in the form fields</li>
            <li>• Click the update button to save your changes</li>
            <li>• Changes are saved to the JSON data file</li>
            <li>• The portfolio website will automatically reflect your updates</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
