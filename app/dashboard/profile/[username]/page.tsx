"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ProfileProvider, useProfile } from "@/components/profile-context"
import { PostItem } from "@/components/post-item"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { UserProfile, Post } from "@/lib/types"

function UserProfileContent() {
  const params = useParams()
  const { communityMembers, communityPosts } = useProfile()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [userPosts, setUserPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Find the user by username
    const username = params?.username as string
    const foundUser = communityMembers.find((member) => member.username === username)

    if (foundUser) {
      setUser(foundUser)

      // Filter posts by this user
      const posts = communityPosts.filter((post) => post.userId === foundUser.id)
      setUserPosts(posts)
    }

    setIsLoading(false)
  }, [params, communityMembers, communityPosts])

  if (isLoading) {
    return <div className="py-12 text-center">Loading profile...</div>
  }

  if (!user) {
    return (
      <Card className="my-6">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold mb-2">User Not Found</h2>
          <p className="text-muted-foreground mb-6">The profile you're looking for doesn't exist or is private.</p>
          <Button asChild>
            <a href="/dashboard/profile">Return to Your Profile</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!user.isPublic) {
    return (
      <Card className="my-6">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Shield className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold mb-2">Private Profile</h2>
          <p className="text-muted-foreground">This user has set their profile to private.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        {/* Cover Image */}
        <div className="h-48 w-full relative">
          <img
            src={user.coverImage || "/placeholder.svg?height=400&width=1200&text=Cover+Image"}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end -mt-12 mb-4">
            <div className="rounded-full border-4 border-background overflow-hidden h-24 w-24">
              <img
                src={user.avatar || "/placeholder.svg?height=200&width=200"}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>

            <Button>Follow</Button>
          </div>

          <p className="mb-4">{user.bio}</p>
          <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground">
            {user.location && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-1"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{user.location}</span>
              </div>
            )}
            {user.website && (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-1"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" x2="22" y1="12" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {user.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-1"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <span>Joined {user.joinedDate}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6 text-center">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/5 rounded-md p-3 border border-primary/10">
              <div className="text-xl font-bold">{user.researchContributions}</div>
              <div className="text-xs text-muted-foreground">Research Contributions</div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/5 rounded-md p-3 border border-primary/10">
              <div className="text-xl font-bold">{user.proposalsVoted}</div>
              <div className="text-xs text-muted-foreground">Proposals Voted</div>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4 mt-6">
          {userPosts.length > 0 ? (
            <div className="space-y-4">
              {userPosts.map((post) => (
                <PostItem key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>This user hasn't posted anything yet.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="contributions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Research Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 text-muted-foreground">
                <p>No research contributions to display.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function UserProfilePage() {
  return (
    <ProfileProvider>
      <UserProfileContent />
    </ProfileProvider>
  )
}
