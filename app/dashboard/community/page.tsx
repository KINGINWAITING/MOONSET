"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileProvider, useProfile } from "@/components/profile-context"
import { PostCreator } from "@/components/post-creator"
import { PostItem } from "@/components/post-item"
import { CommunityMembers } from "@/components/community-members"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, Calendar, MessageSquare, TrendingUp, Award } from "lucide-react"

function CommunityContent() {
  const { communityPosts, communityMembers } = useProfile()
  const [searchQuery, setSearchQuery] = useState("")

  // Filter posts based on search query
  const filteredPosts = communityPosts.filter(
    (post) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get top contributors (sorted by research contributions)
  const topContributors = [...communityMembers]
    .filter((member) => member.isPublic)
    .sort((a, b) => b.researchContributions - a.researchContributions)
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Community Header */}
      <Card className="overflow-hidden border-primary/20">
        <div className="h-32 w-full relative bg-gradient-to-r from-primary/20 to-secondary/20">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200&text=Community')] opacity-10 bg-center"></div>
        </div>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center -mt-12 mb-4">
            <div className="rounded-full border-4 border-background overflow-hidden h-24 w-24 bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground">
              <Users className="h-12 w-12" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">MOONSET Community</h1>
              <p className="text-muted-foreground">Connect with fellow truth-seekers and share your insights</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content - Posts */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search community posts..."
                className="pl-9 bg-background border-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <PostCreator />

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50">
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="latest">Latest</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-4">
              {filteredPosts.length > 0 ? (
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <PostItem key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="mb-2">No posts found.</p>
                  <p>Be the first to share something with the community!</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="trending" className="space-y-4 mt-4">
              {filteredPosts.length > 0 ? (
                <div className="space-y-4">
                  {[...filteredPosts]
                    .sort((a, b) => b.likes - a.likes)
                    .map((post) => (
                      <PostItem key={post.id} post={post} />
                    ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No trending posts yet.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="latest" className="space-y-4 mt-4">
              {filteredPosts.length > 0 ? (
                <div className="space-y-4">
                  {[...filteredPosts]
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((post) => (
                      <PostItem key={post.id} post={post} />
                    ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No recent posts.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Community Members */}
          <CommunityMembers />

          {/* Top Contributors */}
          <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Award className="h-5 w-5 mr-2 text-secondary" />
                Top Contributors
              </CardTitle>
            </CardHeader>
            <CardContent>
              {topContributors.length > 0 ? (
                <div className="space-y-4">
                  {topContributors.map((member, index) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 text-center font-bold text-muted-foreground">{index + 1}</div>
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img
                          src={member.avatar || "/placeholder.svg?height=32&width=32"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{member.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {member.researchContributions} contributions
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No contributors to display</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-secondary" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="rounded-md border border-primary/10 p-3 bg-gradient-to-br from-primary/5 to-transparent">
                  <div className="font-medium">Community AMA Session</div>
                  <div className="text-sm text-muted-foreground mb-2">April 20, 2025 • 3:00 PM UTC</div>
                  <Button variant="secondary" size="sm" className="w-full">
                    Join Event
                  </Button>
                </div>
                <div className="rounded-md border border-primary/10 p-3 bg-gradient-to-br from-primary/5 to-transparent">
                  <div className="font-medium">Research Presentation</div>
                  <div className="text-sm text-muted-foreground mb-2">April 25, 2025 • 5:00 PM UTC</div>
                  <Button variant="secondary" size="sm" className="w-full">
                    Join Event
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function CommunityPage() {
  return (
    <ProfileProvider>
      <CommunityContent />
    </ProfileProvider>
  )
}
