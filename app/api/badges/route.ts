import { NextResponse } from "next/server"
import { mockBadges } from "@/data/mock-data"

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockBadges,
    total: mockBadges.length,
  })
}

