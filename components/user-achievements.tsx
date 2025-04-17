"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useProfile } from "@/components/profile-context"
import { Award } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function UserAchievements() {
  const { currentUser } = useProfile()
  const achievements = currentUser.achievements || []

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Award className="h-5 w-5 mr-2 text-secondary" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        {achievements.length > 0 ? (
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-md border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="font-medium">{achievement.title}</div>
                  <div className="text-xs text-muted-foreground">{achievement.description}</div>
                </div>
                <Badge variant="outline" className="text-xs bg-primary/10">
                  {achievement.date}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>No achievements yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
