"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileProvider } from "@/components/profile-context"
import { ProfileHeader } from "@/components/profile-header"
import { PostCreator } from "@/components/post-creator"
import { PostItem } from "@/components/post-item"
import { useProfile } from "@/components/profile-context"
import { MessageSquare, BookmarkIcon } from "lucide-react"

function ProfileContent() {
  const { userPosts, communityPosts } = useProfile()

  return (
    <div className="space-y-6">
      <ProfileHeader />

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="posts">My Posts</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4 mt-6">
          <PostCreator />

          {userPosts.length > 0 ? (
            <div className="space-y-4">
              {userPosts.map((post) => (
                <PostItem key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground bg-gradient-to-br from-background to-primary/5 rounded-lg border border-primary/10 p-6">
              <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="mb-2">You haven't posted anything yet.</p>
              <p>Share your thoughts with the community!</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <div className="text-center py-12 text-muted-foreground bg-gradient-to-br from-background to-primary/5 rounded-lg border border-primary/10 p-6">
            <BookmarkIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>You haven't saved any posts yet.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <ProfileProvider>
      <ProfileContent />
    </ProfileProvider>
  )
}
