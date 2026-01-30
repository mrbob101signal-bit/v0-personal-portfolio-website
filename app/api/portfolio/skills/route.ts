import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Skill from "@/app/models/Skill"

export async function GET() {
  await connectDB()
  const skills = await Skill.find().sort({ name: 1 })
  return NextResponse.json(skills)
}

export async function POST(req: NextRequest) {
  await connectDB()
  const body = await req.json()
  const skill = await Skill.create(body)
  return NextResponse.json(skill, { status: 201 })
}

export async function PUT(req: NextRequest) {
  await connectDB()
  const body = await req.json()
  const skill = await Skill.findByIdAndUpdate(body._id, body, { new: true })
  return NextResponse.json(skill)
}

export async function DELETE(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) return NextResponse.json({ error: "Skill ID required" }, { status: 400 })

  await Skill.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
