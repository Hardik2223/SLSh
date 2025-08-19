"use client"

import { useStories } from "@/contexts/stories-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StoriesJournal() {
  const { unlockedStories, nearbyStories } = useStories()

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Unlocked Stories</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {unlockedStories.map((s) => (
              <li key={s.id} className="mb-2">
                <div className="font-medium">{s.title}</div>
                <div className="text-sm text-gray-600">{s.content.slice(0, 120)}...</div>
              </li>
            ))}
            {unlockedStories.length === 0 && <div className="text-sm text-gray-500">No stories unlocked yet.</div>}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nearby Stories</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {nearbyStories.map(({ story, distance }) => (
              <li key={story.id} className="mb-2">
                <div className="font-medium">{story.title}</div>
                <div className="text-sm text-gray-600">~{distance.toFixed(3)} km away</div>
              </li>
            ))}
            {nearbyStories.length === 0 && <div className="text-sm text-gray-500">No nearby stories detected.</div>}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

