import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Experience from "@/app/models/Experience"

export async function GET() {
  await connectDB()
  const experience = await Experience.find().sort({ startDate: -1 })
  return NextResponse.json(experience)
}

export async function POST(req: NextRequest) {
  await connectDB()
  const body = await req.json()
  const experience = await Experience.create(body)
  return NextResponse.json(experience, { status: 201 })
}

export async function PUT(req: NextRequest) {
  await connectDB()
  const body = await req.json()
  const experience = await Experience.findByIdAndUpdate(
    body._id,
    body,
    { new: true }
  )
  return NextResponse.json(experience)
}

export async function DELETE(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 })
  }

  await Experience.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
