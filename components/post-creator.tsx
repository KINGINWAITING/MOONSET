"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ImageIcon, FileText, X, Loader2 } from "lucide-react"
import { useProfile } from "@/components/profile-context"
import type { Post } from "@/lib/types"

export function PostCreator() {
  const { currentUser, addPost } = useProfile()
  const [content, setContent] = useState("")
  const [media, setMedia] = useState<Post["media"]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (!content.trim() && media.length === 0) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      addPost({
        userId: currentUser.id,
        content,
        media,
      })

      // Reset form
      setContent("")
      setMedia([])
      setIsSubmitting(false)
    }, 1000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Process each file
    Array.from(files).forEach((file) => {
      // Determine file type
      let type: "image" | "video" | "file" = "file"
      if (file.type.startsWith("image/")) type = "image"
      if (file.type.startsWith("video/")) type = "video"

      // Create a placeholder URL
      // In a real app, you would upload the file to a server and get a URL
      const placeholderUrl =
        type === "image"
          ? `/placeholder.svg?height=400&width=600&text=${file.name}`
          : type === "video"
            ? `/placeholder.svg?height=400&width=600&text=Video:+${file.name}`
            : `/placeholder.svg?height=200&width=400&text=File:+${file.name}`

      // Add to media array
      setMedia((prev) => [
        ...prev,
        {
          type,
          url: placeholderUrl,
          filename: file.name,
          filesize: `${(file.size / 1024).toFixed(1)} KB`,
        },
      ])
    })

    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const removeMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={currentUser.avatar || "/placeholder.svg?height=40&width=40"}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <textarea
              className="w-full p-2 min-h-[100px] bg-transparent border-none outline-none resize-none"
              placeholder="Share your thoughts with the community..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSubmitting}
            />

            {/* Media Preview */}
            {media.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                {media.map((item, index) => (
                  <div key={index} className="relative rounded-md overflow-hidden border">
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => removeMedia(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>

                    {item.type === "image" ? (
                      <img
                        src={item.url || "/placeholder.svg"}
                        alt={item.filename}
                        className="w-full h-32 object-cover"
                      />
                    ) : item.type === "video" ? (
                      <div className="w-full h-32 bg-muted/50 flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">Video: {item.filename}</span>
                      </div>
                    ) : (
                      <div className="w-full h-20 bg-muted/50 flex items-center justify-center p-2">
                        <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div className="overflow-hidden">
                          <div className="truncate text-sm">{item.filename}</div>
                          <div className="text-xs text-muted-foreground">{item.filesize}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center mt-4 border-t pt-3">
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                  disabled={isSubmitting}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isSubmitting}
                >
                  <ImageIcon className="h-4 w-4 mr-1" />
                  Media
                </Button>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={(!content.trim() && media.length === 0) || isSubmitting}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Post"
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
