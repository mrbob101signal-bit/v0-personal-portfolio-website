import { NextRequest, NextResponse } from "next/server";
import { connectDB, isMongoConfigured } from "@/lib/mongodb";
import { getProjects } from "@/lib/portfolio-data";
import Project from "@/app/models/Project";

export async function GET() {
  const fallback = await getProjects();

  if (!isMongoConfigured()) {
    return NextResponse.json(fallback);
  }

  try {
    await connectDB();
    const projects = await Project.find().lean();
    return NextResponse.json(projects.length > 0 ? projects : fallback);
  } catch (error) {
    console.error("GET /api/projects failed, using fallback data:", error);
    return NextResponse.json(fallback);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const project = await Project.create(await req.json());
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects failed:", error);
    return NextResponse.json({ error: "Database is not available" }, { status: 503 });
  }
}
