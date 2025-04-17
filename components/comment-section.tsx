"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useProfile } from "@/components/profile-context"
import { Loader2 } from "lucide-react"
import type { Comment } from "@/lib/types"

interface CommentSectionProps {
  postId: string
  comments: Comment[]
  onAddComment: (postId: string, comment: string) => void
}

export function CommentSection({ postId, comments, onAddComment }: CommentSectionProps) {
  const { currentUser } = useProfile()
  const [commentText, setCommentText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitComment = () => {
    if (!commentText.trim()) return

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      onAddComment(postId, commentText)
      setCommentText("")
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <div className="space-y-4 mt-2 pt-3 border-t border-primary/10">
      <h4 className="text-sm font-medium">Comments ({comments.length})</h4>
      
      {/* Comment input */}
      <div className="flex gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={currentUser.avatar || "/placeholder.svg?height=32&width=32"}
            alt={currentUser.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 px-3 py-1 bg-background border border-primary/20 rounded-full text-sm"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={isSubmitting}
          />
          <Button 
            size="sm" 
            variant="secondary" 
            className="rounded-full px-3"
            onClick={handleSubmitComment}
            disabled={!commentText.trim() || isSubmitting}
          >
            {isSubmitting ? <Loader2 className="h-3 w-3 animate-spin" /> : "Post"}
          </Button>
        </div>
      </div>
      
      {/* Comments list */}
      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={comment.author.avatar || "/placeholder.svg?height=32&width=32"}
                  alt={comment.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="bg-muted/30 rounded-lg p-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{comment.author.name}</span>
                    <span className="text-xs text-muted-foreground">@{comment.author.username}</span>
                  </div>
                  <p className="text-sm mt-1">{comment.content}</p>
                </div>
                <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                  <button className="hover:text-primary">Like</button>
                  <button className="hover:text-primary">Reply</button>
                  <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-sm text-muted-foreground">
          No comments yet. Be the first to comment!
        </div>
      )}
    </div>
  )
}
