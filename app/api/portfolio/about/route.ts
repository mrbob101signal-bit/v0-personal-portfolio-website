import { connectDB } from "@/lib/mongodb"
import About from "@/app/models/About"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  await connectDB()
  const about = await About.findOne()
  return NextResponse.json(about)
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
