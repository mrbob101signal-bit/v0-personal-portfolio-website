import { NextRequest, NextResponse } from "next/server"
import { connectDB, isMongoConfigured } from "@/lib/mongodb"
import Education from "@/app/models/Education"
import { getEducation } from "@/lib/portfolio-data"

function normalizeEducation(education: any) {
  return {
    ...education,
    institution: education.institution ?? education.school ?? "",
    program: education.program ?? education.degree ?? "",
    specialization: education.specialization ?? education.field ?? "",
    period: education.period ?? [education.startDate, education.endDate].filter(Boolean).join(" - "),
    status: education.status ?? "",
  }
}

export async function GET() {
  const fallback = (await getEducation()).map(normalizeEducation)

  if (!isMongoConfigured()) {
    return NextResponse.json(fallback)
  }

  try {
    await connectDB()
    const education = await Education.find().sort({ startDate: -1 }).lean()
    return NextResponse.json(education.length > 0 ? education.map(normalizeEducation) : fallback)
  } catch (error) {
    console.error("GET /api/portfolio/education failed, using fallback data:", error)
    return NextResponse.json(fallback)
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = normalizeEducation(await req.json())
    const education = await Education.create(body)
    return NextResponse.json(education, { status: 201 })
  } catch (error) {
    console.error("POST /api/portfolio/education failed:", error)
    return NextResponse.json({ error: "Database is not available" }, { status: 503 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB()
    const body = normalizeEducation(await req.json())
    const id = body._id || body.id

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }

    const education = await Education.findByIdAndUpdate(
      id,
      body,
      { new: true }
    )
    return NextResponse.json(education)
  } catch (error) {
    console.error("PUT /api/portfolio/education failed:", error)
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

    await Education.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE /api/portfolio/education failed:", error)
    return NextResponse.json({ error: "Database is not available" }, { status: 503 })
  }
}
