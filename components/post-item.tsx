"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Heart, Share2, Bookmark, ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react"
import { useProfile } from "@/components/profile-context"
import { CommentSection } from "@/components/comment-section"
import type { Post } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface PostItemProps {
  post: Post
}

export function PostItem({ post }: PostItemProps) {
  const { toggleLike, postComments, addComment } = useProfile()
  const [isSaved, setIsSaved] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const comments = postComments[post.id] || []

  const formattedDate = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })

  // Truncate long content
  const isLongContent = post.content.length > 280
  const displayContent = isLongContent && !isExpanded ? post.content.slice(0, 280) + "..." : post.content

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Link href={`/dashboard/profile/${post.author.username}`} className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={post.author.avatar || "/placeholder.svg?height=40&width=40"}
                alt={post.author.name}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <Link href={`/dashboard/profile/${post.author.username}`} className="font-medium hover:underline">
                  {post.author.name}
                </Link>
                <span className="text-muted-foreground"> @{post.author.username}</span>
                <span className="text-muted-foreground"> · {formattedDate}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-2 whitespace-pre-wrap">
              {displayContent}
              {isLongContent && (
                <Button variant="link" className="p-0 h-auto text-sm" onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? "Show less" : "Show more"}
                </Button>
              )}
            </div>

            {/* Media */}
            {post.media && post.media.length > 0 && (
              <div className={`grid gap-2 mt-3 ${post.media.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                {post.media.map((item, index) => (
                  <div key={index} className="rounded-md overflow-hidden border">
                    {item.type === "image" ? (
                      <img src={item.url || "/placeholder.svg"} alt="" className="w-full object-cover" />
                    ) : item.type === "video" ? (
                      <div className="w-full h-48 bg-muted/50 flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">Video: {item.filename}</span>
                      </div>
                    ) : (
                      <div className="w-full p-4 bg-muted/50 flex items-center">
                        <div className="mr-3 p-2 bg-background rounded-md">
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
                            className="h-6 w-6 text-muted-foreground"
                          >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">{item.filename}</div>
                          <div className="text-xs text-muted-foreground">{item.filesize}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Comment section */}
        {showComments && (
          <CommentSection 
            postId={post.id} 
            comments={comments} 
            onAddComment={addComment} 
          />
        )}
      </CardContent>
      <CardFooter className="px-4 py-2 border-t flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => toggleLike(post.id)}
        >
          <Heart className={`h-4 w-4 mr-1 ${post.hasLiked ? "fill-red-500 text-red-500" : ""}`} />
          {post.likes > 0 && post.likes}
        </Button>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">{post.comments}</span>
            {showComments ? (
              <ChevronUp className="h-3 w-3 ml-1" />
            ) : (
              <ChevronDown className="h-3 w-3 ml-1" />
            )}
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Share2 className="h-4 w-4 mr-1" />
        </Button>
      </CardFooter>
    </Card>
  )
}
