import { type NextRequest, NextResponse } from "next/server"
import { mockCommunityEvents } from "@/data/mock-data"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { userId, rsvp } = body || {}

    if (!userId || typeof rsvp !== "boolean") {
      return NextResponse.json(
        { success: false, error: "Missing required fields: userId and rsvp (boolean)" },
        { status: 400 },
      )
    }

    const event = mockCommunityEvents.find((e) => e.id === params.id)
    if (!event) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 })
    }

    // Simulate updating attendee count in memory
    if (rsvp) {
      event.attendees += 1
    } else {
      event.attendees = Math.max(0, event.attendees - 1)
    }

    return NextResponse.json({
      success: true,
      data: { eventId: event.id, attendees: event.attendees, rsvp },
      message: rsvp ? "RSVP confirmed" : "RSVP cancelled",
    })
  } catch (error) {
    console.error("RSVP API error:", error)
    return NextResponse.json({ success: false, error: "Failed to process RSVP" }, { status: 500 })
  }
}

