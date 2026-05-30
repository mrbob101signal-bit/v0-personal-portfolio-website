import { connectDB, isMongoConfigured } from "@/lib/mongodb"
import About from "@/app/models/About"
import { getAbout } from "@/lib/portfolio-data"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const fallback = await getAbout()

  if (!isMongoConfigured()) {
    return NextResponse.json(fallback)
  }

  try {
    await connectDB()
    const about = await About.findOne().lean()

    if (!about) {
      return NextResponse.json(fallback)
    }

    return NextResponse.json({
      ...fallback,
      ...about,
      highlights: Array.isArray((about as any).highlights) ? (about as any).highlights : fallback.highlights,
    })
  } catch (error) {
    console.error("GET /api/portfolio/about failed, using fallback data:", error)
    return NextResponse.json(fallback)
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    console.log("PUT /api/portfolio/about", body)
    const about = await About.findOneAndUpdate({}, body, {
      upsert: true,
      new: true,
    })
    return NextResponse.json(about)
  } catch (error) {
    console.error("PUT /api/portfolio/about failed:", error)
    return NextResponse.json({ error: "Database is not available" }, { status: 503 })
  }
}
