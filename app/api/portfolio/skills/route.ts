import { NextRequest, NextResponse } from "next/server"
import { connectDB, isMongoConfigured } from "@/lib/mongodb"
import Skill from "@/app/models/Skill"
import { getSkills } from "@/lib/portfolio-data"

const legacyLevelMap: Record<string, number> = {
  Beginner: 50,
  Intermediate: 75,
  Advanced: 90,
  Expert: 100,
}

function toPercent(level: unknown) {
  const numericLevel = typeof level === "string" ? legacyLevelMap[level] ?? Number(level) : Number(level)
  if (!Number.isFinite(numericLevel)) return 0
  return Math.min(100, Math.max(0, numericLevel))
}

function normalizeSkill<T extends { level?: unknown }>(skill: T) {
  return {
    ...skill,
    level: toPercent(skill.level),
  }
}

export async function GET() {
  const fallback = (await getSkills()).map(normalizeSkill)

  if (!isMongoConfigured()) {
    return NextResponse.json(fallback)
  }

  try {
    await connectDB()
    const skills = await Skill.find().sort({ name: 1 }).lean()
    return NextResponse.json(skills.length > 0 ? skills.map(normalizeSkill) : fallback)
  } catch (error) {
    console.error("GET /api/portfolio/skills failed, using fallback data:", error)
    return NextResponse.json(fallback)
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = normalizeSkill(await req.json())
    const skill = await Skill.create(body)
    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    console.error("POST /api/portfolio/skills failed:", error)
    return NextResponse.json({ error: "Database is not available" }, { status: 503 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB()
    const body = normalizeSkill(await req.json())
    const id = body._id || body.id

    if (!id) {
      return NextResponse.json({ error: "Skill ID required" }, { status: 400 })
    }

    const skill = await Skill.findByIdAndUpdate(id, body, { new: true })
    return NextResponse.json(skill)
  } catch (error) {
    console.error("PUT /api/portfolio/skills failed:", error)
    return NextResponse.json({ error: "Database is not available" }, { status: 503 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) return NextResponse.json({ error: "Skill ID required" }, { status: 400 })

    await Skill.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE /api/portfolio/skills failed:", error)
    return NextResponse.json({ error: "Database is not available" }, { status: 503 })
  }
}
