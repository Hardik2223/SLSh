import { NextResponse } from "next/server"
import { mockCommunityEvents } from "@/data/mock-data"

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockCommunityEvents,
    total: mockCommunityEvents.length,
  })
}

