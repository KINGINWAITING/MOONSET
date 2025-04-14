"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProfile } from "@/components/profile-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

export function CommunityMembers() {
  const { communityMembers } = useProfile()

  // Filter to only show public profiles
  const publicMembers = communityMembers.filter((member) => member.isPublic)

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 mr-2 text-secondary" />
          Community Members
        </CardTitle>
      </CardHeader>
      <CardContent>
        {publicMembers.length > 0 ? (
          <div className="space-y-4">
            {publicMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <Link href={`/dashboard/profile/${member.username}`} className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={member.avatar || "/placeholder.svg?height=40&width=40"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/dashboard/profile/${member.username}`}
                    className="font-medium hover:underline block truncate"
                  >
                    {member.name}
                  </Link>
                  <div className="text-sm text-muted-foreground truncate">
                    @{member.username} · {member.location}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                  View
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <Users className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p>No public profiles to display</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
