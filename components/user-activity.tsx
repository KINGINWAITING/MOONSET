"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProfile } from "@/components/profile-context"
import { Activity, MessageSquare, FileText, Vote, Users, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function UserActivity() {
  const { currentUser } = useProfile()
  const activities = currentUser.activity || []

  // Function to get the appropriate icon for each activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "post":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "comment":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case "research":
        return <FileText className="h-4 w-4 text-purple-500" />
      case "governance":
        return <Vote className="h-4 w-4 text-amber-500" />
      case "group":
        return <Users className="h-4 w-4 text-indigo-500" />
      case "event":
        return <Calendar className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Activity className="h-5 w-5 mr-2 text-secondary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-md border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                <div className="flex-1">
                  <div className="text-sm">{activity.description}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>No recent activity</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
