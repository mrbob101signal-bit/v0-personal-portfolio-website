import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Education from "@/app/models/Education"

export async function GET() {
  await connectDB()
  const education = await Education.find().sort({ startDate: -1 })
  return NextResponse.json(education)
}

export async function POST(req: NextRequest) {
  await connectDB()
  const body = await req.json()
  const education = await Education.create(body)
  return NextResponse.json(education, { status: 201 })
}

export async function PUT(req: NextRequest) {
  await connectDB()
  const body = await req.json()
  const education = await Education.findByIdAndUpdate(
    body._id,
    body,
    { new: true }
  )
  return NextResponse.json(education)
}

export async function DELETE(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 })
  }

  await Education.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
