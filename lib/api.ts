const API_BASE_URL = "/api"

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  total?: number
}

export interface LocationFilters {
  type?: string
  search?: string
  lat?: number
  lng?: number
  radius?: number
}

export interface CheckinRequest {
  userId: string
  qrCode: string
  action: string
}

// Fetch eco-locations with optional filters
export async function fetchLocations(filters: LocationFilters = {}): Promise<ApiResponse<any[]>> {
  const params = new URLSearchParams()

  if (filters.type) params.append("type", filters.type)
  if (filters.search) params.append("search", filters.search)
  if (filters.lat) params.append("lat", filters.lat.toString())
  if (filters.lng) params.append("lng", filters.lng.toString())
  if (filters.radius) params.append("radius", filters.radius.toString())

  const response = await fetch(`${API_BASE_URL}/locations?${params}`)
  return response.json()
}

// Fetch specific location details
export async function fetchLocationDetails(locationId: string): Promise<ApiResponse<any>> {
  const response = await fetch(`${API_BASE_URL}/locations/${locationId}`)
  return response.json()
}

// Submit check-in for a location
export async function submitCheckin(locationId: string, checkinData: CheckinRequest): Promise<ApiResponse<any>> {
  const response = await fetch(`${API_BASE_URL}/locations/${locationId}/checkin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(checkinData),
  })
  return response.json()
}

// Fetch user's location history
export async function fetchUserLocations(userId: string): Promise<ApiResponse<any[]>> {
  const response = await fetch(`${API_BASE_URL}/user/${userId}/locations`)
  return response.json()
}

// Community events
export async function fetchCommunityEvents(): Promise<ApiResponse<any[]>> {
  const response = await fetch(`${API_BASE_URL}/events`)
  return response.json()
}

export async function rsvpEvent(eventId: string, userId: string, rsvp: boolean): Promise<ApiResponse<any>> {
  const response = await fetch(`${API_BASE_URL}/events/${eventId}/rsvp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, rsvp }),
  })
  return response.json()
}

// Badges
export async function fetchBadges(): Promise<ApiResponse<any[]>> {
  const response = await fetch(`${API_BASE_URL}/badges`)
  return response.json()
}

// Leaderboard
export async function fetchLeaderboard(): Promise<ApiResponse<any[]>> {
  const response = await fetch(`${API_BASE_URL}/leaderboard`)
  return response.json()
}

// Reviews
export async function fetchLocationReviews(locationId: string): Promise<ApiResponse<any[]>> {
  const response = await fetch(`${API_BASE_URL}/locations/${locationId}/reviews`)
  return response.json()
}

export async function submitReview(locationId: string, review: any): Promise<ApiResponse<any>> {
  const response = await fetch(`${API_BASE_URL}/locations/${locationId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  })
  return response.json()
}
