import { connectDB } from "@/lib/mongodb";
import Project from "@/app/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const projects = await Project.find();
  return NextResponse.json(projects);
}
