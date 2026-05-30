import { NextRequest, NextResponse } from "next/server"
import { connectDB, isMongoConfigured } from "@/lib/mongodb"
import Experience from "@/app/models/Experience"
import { getExperience } from "@/lib/portfolio-data"

function normalizeExperience<T extends { description?: unknown }>(experience: T) {
  const legacyExperience = experience as any

  return {
    ...experience,
    title: legacyExperience.title ?? legacyExperience.role ?? "",
    company: legacyExperience.company ?? "",
    location: legacyExperience.location ?? "",
    duration: legacyExperience.duration ?? [legacyExperience.startDate, legacyExperience.endDate].filter(Boolean).join(" - "),
    description: Array.isArray(experience.description)
      ? experience.description
      : typeof experience.description === "string"
        ? [experience.description]
        : [],
  }
}

export async function GET() {
  const fallback = (await getExperience()).map(normalizeExperience)

  if (!isMongoConfigured()) {
    return NextResponse.json(fallback)
  }

  try {
    await connectDB()
    const experience = await Experience.find().sort({ startDate: -1 }).lean()
    return NextResponse.json(experience.length > 0 ? experience.map(normalizeExperience) : fallback)
  } catch (error) {
    console.error("GET /api/portfolio/experience failed, using fallback data:", error)
    return NextResponse.json(fallback)
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = normalizeExperience(await req.json())
    const experience = await Experience.create(body)
    return NextResponse.json(experience, { status: 201 })
  } catch (error) {
    console.error("POST /api/portfolio/experience failed:", error)
    return NextResponse.json({ error: "Database is not available" }, { status: 503 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB()
    const body = normalizeExperience(await req.json())
    const id = body._id || body.id

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }

    const experience = await Experience.findByIdAndUpdate(
      id,
      body,
      { new: true }
    )
    return NextResponse.json(experience)
  } catch (error) {
    console.error("PUT /api/portfolio/experience failed:", error)
    return NextResponse.json({ error: "Database is not available" }, { status: 503 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }

    await Experience.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE /api/portfolio/experience failed:", error)
    return NextResponse.json({ error: "Database is not available" }, { status: 503 })
  }
}
