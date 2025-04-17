"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProfile } from "@/components/profile-context"
import { Users, UserPlus, Lock } from "lucide-react"

export function CommunityGroups() {
  const { communityGroups, joinGroup } = useProfile()

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 mr-2 text-secondary" />
          Community Groups
        </CardTitle>
      </CardHeader>
      <CardContent>
        {communityGroups.length > 0 ? (
          <div className="space-y-4">
            {communityGroups.map((group) => (
              <div key={group.id} className="rounded-md border border-primary/10 overflow-hidden">
                <div className="h-24 w-full relative">
                  <img
                    src={group.coverImage || "/placeholder.svg?height=200&width=400"}
                    alt={group.name}
                    className="w-full h-full object-cover"
                  />
                  {group.isPrivate && (
                    <div className="absolute top-2 right-2 bg-background/80 rounded-full p-1">
                      <Lock className="h-3 w-3 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <div className="font-medium flex items-center gap-2">
                    {group.name}
                    {group.isPrivate && <span className="text-xs text-muted-foreground">(Private)</span>}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">{group.description}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">{group.memberCount}</span> members
                    </div>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={() => joinGroup(group.id)}
                      disabled={group.hasJoined}
                    >
                      {group.hasJoined ? (
                        "Joined"
                      ) : (
                        <>
                          <UserPlus className="h-3 w-3 mr-1" />
                          Join
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>No groups available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
