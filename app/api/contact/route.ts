import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import {
  saveContact,
  getContacts,
  deleteContact,
  updateContactStatus,
} from "@/lib/contact-data"
// Assuming email service functions are defined in this module
import {
  sendContactNotification,
  sendContactConfirmation,
} from "@/lib/email-service"
// Fetch all contacts
export async function GET() {
  try {
    await connectDB()
    const contacts = await getContacts()
    return NextResponse.json(contacts)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    )
  }
}
// Handle contact form submission
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    // Parse and validate request body
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Save contact to database
    const contact = await saveContact({
      name,
      email,
      subject,
      message,
    })

    // email logic stays the same...

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully!",
        contact,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("CONTACT POST ERROR:", error)
    return NextResponse.json(
      { error: "Failed to process your message" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Contact ID is required" },
        { status: 400 }
      )
    }
    // Delete contact
    await deleteContact(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE CONTACT ERROR:", error)
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    )
  }
}
// Update contact status (e.g., read/unread)
export async function PATCH(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: "Contact ID and status are required" },
        { status: 400 }
      )
    }

    if (!["read", "unread"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      )
    }
    // Update contact status
    await updateContactStatus(id, status)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("PATCH CONTACT ERROR:", error)
    return NextResponse.json(
      { error: "Failed to update contact status" },
      { status: 500 }
    )
  }
}
