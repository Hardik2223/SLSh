import { type NextRequest, NextResponse } from "next/server"
import { mockEcoLocations } from "@/data/mock-data"

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const location = mockEcoLocations.find((loc) => loc.id === params.id)

  if (!location) {
    return NextResponse.json({ success: false, error: "Location not found" }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    data: location.reviews,
    total: location.reviews.length,
    summary: {
      averageRating: location.averageRating,
      totalReviews: location.totalReviews,
    },
  })
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { userId, userName, rating, title, content } = body || {}

    if (!userId || !userName || !rating || !title || !content) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: userId, userName, rating, title, content" },
        { status: 400 },
      )
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, error: "Rating must be a number between 1 and 5" }, { status: 400 })
    }

    const location = mockEcoLocations.find((loc) => loc.id === params.id)
    if (!location) {
      return NextResponse.json({ success: false, error: "Location not found" }, { status: 404 })
    }

    const now = new Date()
    const newReview = {
      id: `r-${Date.now()}`,
      userId,
      userName,
      userProfilePicture: undefined,
      locationId: params.id,
      rating,
      title,
      content,
      images: [],
      likes: 0,
      dislikes: 0,
      userLikes: [],
      userDislikes: [],
      isVerifiedVisit: false,
      visitDate: undefined,
      createdAt: now,
      updatedAt: now,
      helpful: 0,
      tags: [],
    }

    // Mutate in-memory mock data to simulate persistence
    location.reviews.unshift(newReview as any)
    const total = location.reviews.length
    const avg = location.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / Math.max(total, 1)
    location.averageRating = Math.round(avg * 10) / 10
    location.totalReviews = total

    return NextResponse.json({
      success: true,
      data: newReview,
      summary: {
        averageRating: location.averageRating,
        totalReviews: location.totalReviews,
      },
      message: "Review submitted successfully",
    })
  } catch (error) {
    console.error("Reviews API error:", error)
    return NextResponse.json({ success: false, error: "Failed to submit review" }, { status: 500 })
  }
}

