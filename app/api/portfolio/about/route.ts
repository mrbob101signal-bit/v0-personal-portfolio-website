import { connectDB } from "@/lib/mongodb"
import About from "@/app/models/About"
import { getAbout } from "@/lib/portfolio-data"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  await connectDB()
  const fallback = await getAbout()
  const about = await About.findOne().lean()
  if (!about) {
    return NextResponse.json(fallback)
  }
  return NextResponse.json({
    ...fallback,
    ...about,
    highlights: Array.isArray(about.highlights) ? about.highlights : fallback.highlights,
  })
}

export async function PUT(req: NextRequest) {
  await connectDB()
  const body = await req.json()
  console.log("PUT /api/portfolio/about", body)
  const about = await About.findOneAndUpdate({}, body, {
    upsert: true,
    new: true,
  })
  return NextResponse.json(about)
}
