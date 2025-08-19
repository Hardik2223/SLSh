import { NextResponse } from "next/server"
import { mockLeaderboard } from "@/data/mock-data"

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockLeaderboard,
    total: mockLeaderboard.length,
  })
}

