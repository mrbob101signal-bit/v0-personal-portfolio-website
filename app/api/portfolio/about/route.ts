import { NextRequest, NextResponse } from "next/server"
import { getAbout, updatePortfolioData, getPortfolioData } from "@/lib/portfolio-data"

export async function GET() {
  try {
    const about = await getAbout()
    return NextResponse.json(about)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch about data" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Updating about with:", body)
    const currentData = await getPortfolioData()
    const updatedData = await updatePortfolioData({
      ...currentData,
      about: { ...currentData.about, ...body },
    })
    console.log("Updated about data:", updatedData.about)
    return NextResponse.json(updatedData.about)
  } catch (error) {
    console.error("Error in PUT /api/portfolio/about:", error)
    return NextResponse.json({ error: "Failed to update about data", details: String(error) }, { status: 500 })
  }
}
