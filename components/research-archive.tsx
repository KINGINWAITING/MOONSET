"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Download, Eye, Share2, FileText, Image, Video, ChevronRight, Bookmark, Heart, MessageSquare, Calendar, User, Tag, Link, X } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface EvidenceItem {
  id: string
  title: string
  description: string
  type: "document" | "image" | "video"
  date: string
  author: string
  tags: string[]
  source: string
  views: number
  downloads: number
  thumbnail?: string
  content?: string
  fileUrl?: string
  thumbnailUrl?: string
  isBookmarked?: boolean
  isLiked?: boolean
  likes?: number
  comments?: number
}

const initialSampleEvidence: EvidenceItem[] = [
  {
    id: "1",
    title: "NASA Apollo 11 Mission Report",
    description: "Official documentation of the Apollo 11 moon landing mission, including flight logs, astronaut reports, and mission objectives.",
    type: "document",
    date: "1969-07-20",
    author: "NASA",
    tags: ["official", "primary source", "apollo program"],
    source: "NASA Archives",
    views: 1205,
    downloads: 347,
    content: "The Apollo 11 mission, commanded by Neil Armstrong, successfully landed on the lunar surface on July 20, 1969. The mission accomplished President Kennedy's goal of reaching the Moon by the end of the 1960s. Armstrong became the first person to step onto the lunar surface six hours later, and Buzz Aldrin joined him 19 minutes later...",
    fileUrl: "#",
    isBookmarked: false,
    isLiked: false,
    likes: 234,
    comments: 45
  },
  {
    id: "2",
    title: "Apollo 11 Moon Landing Photographs",
    description: "Collection of high-resolution photographs taken during the Apollo 11 moon landing mission, showing astronauts, equipment, and lunar surface.",
    type: "image",
    date: "1969-07-20",
    author: "NASA",
    tags: ["imagery", "visual evidence", "apollo program"],
    source: "NASA Image Gallery",
    views: 3420,
    downloads: 982,
    thumbnail: "/images/moon-landing.jpg",
    content: "Collection of high-resolution images from the lunar surface, analyzed for potential anomalies and inconsistencies. Includes detailed annotations and measurements.",
    fileUrl: "#",
    isBookmarked: true,
    isLiked: true,
    likes: 456,
    comments: 78
  },
  {
    id: "3",
    title: "Neil Armstrong's First Steps on the Moon",
    description: "Historic video footage showing Neil Armstrong's first steps on the lunar surface and the planting of the American flag.",
    type: "video",
    date: "1969-07-20",
    author: "NASA",
    tags: ["footage", "historic moment", "apollo program"],
    source: "NASA Video Archive",
    views: 5128,
    downloads: 1347,
    thumbnail: "/images/moon-video.jpg",
    content: "Enhanced analysis of the lunar module landing footage, focusing on physics anomalies and potential inconsistencies in the official narrative.",
    fileUrl: "#",
    isBookmarked: false,
    isLiked: false,
    likes: 789,
    comments: 123
  }
]

export function ResearchArchive() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState<EvidenceItem | null>(null)
  const [isViewing, setIsViewing] = useState(false)
  const [comment, setComment] = useState("")
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>(initialSampleEvidence)
  const { toast } = useToast()
  const router = useRouter()

  // Load evidence items from localStorage on component mount
  useEffect(() => {
    try {
      const storedItems = localStorage.getItem('evidenceItems')
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems)
        setEvidenceItems([...parsedItems, ...initialSampleEvidence])
      }
    } catch (error) {
      console.error("Failed to load evidence from localStorage:", error)
    }
  }, [])

  const allTags = Array.from(new Set(evidenceItems.flatMap(item => item.tags)))

  const filteredEvidence = evidenceItems.filter(item => {
    const matchesSearch = 
      searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesType = selectedType === "all" || item.type === selectedType
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => item.tags.includes(tag))
    
    return matchesSearch && matchesType && matchesTags
  })

  const handleDownload = (item: EvidenceItem) => {
    if (item.fileUrl) {
      // Simulate download
      toast({
        title: "Download Started",
        description: `Downloading ${item.title}...`
      })
      // In a real implementation, you would trigger the actual file download here
      window.open(item.fileUrl, '_blank')
    }
  }

  const handleShare = (item: EvidenceItem) => {
    const shareUrl = window.location.href
    const text = `Check out this evidence on MOONSET: ${item.title}`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`)
  }

  const handleView = (item: EvidenceItem) => {
    setSelectedItem(item)
    setIsViewing(true)
  }

  const handleLike = (item: EvidenceItem) => {
    const updatedItem = {
      ...item,
      likes: item.isLiked ? (item.likes || 0) - 1 : (item.likes || 0) + 1,
      isLiked: !item.isLiked
    }
    setSelectedItem(updatedItem)
    toast({
      title: updatedItem.isLiked ? "Liked" : "Unliked",
      description: `You ${updatedItem.isLiked ? 'liked' : 'unliked'} ${item.title}`
    })
  }

  const handleBookmark = (item: EvidenceItem) => {
    const updatedItem = {
      ...item,
      isBookmarked: !item.isBookmarked
    }
    setSelectedItem(updatedItem)
    toast({
      title: updatedItem.isBookmarked ? "Bookmarked" : "Unbookmarked",
      description: `You ${updatedItem.isBookmarked ? 'bookmarked' : 'unbookmarked'} ${item.title}`
    })
  }

  const handleComment = () => {
    if (comment.trim() && selectedItem) {
      const updatedItem = {
        ...selectedItem,
        comments: (selectedItem.comments || 0) + 1
      }
      setSelectedItem(updatedItem)
      setComment("")
      toast({
        title: "Comment Added",
        description: "Your comment has been added successfully"
      })
    }
  }

  const handleSubmittedDocument = (document: any) => {
    // In a real implementation, this would be integrated with backend APIs
    // For now, we simulate adding a new document to the evidence list
    
    const newItem: EvidenceItem = {
      id: `evidence-${Date.now()}`,
      title: document.title,
      description: document.description || "No description provided",
      type: document.type || "document",
      date: new Date().toISOString().split('T')[0],
      author: document.author || "Current User",
      tags: document.tags || [],
      source: "User Submission",
      views: 0,
      downloads: 0,
      content: document.content,
      thumbnail: document.files?.find((f: any) => f.type.includes('image'))?.url,
      fileUrl: document.files?.[0]?.url,
      isBookmarked: false,
      isLiked: false,
      likes: 0,
      comments: 0
    }
    
    // For demo purposes only - in a real app, this would be managed by a backend API
    setEvidenceItems(prevItems => [newItem, ...prevItems])
    
    toast({
      title: "Document Added",
      description: "Your document has been added to the Evidence Archive."
    })
  }

  // Add a function to handle adding new evidence items
  const addEvidenceItem = (newItem: EvidenceItem) => {
    setEvidenceItems(prevItems => [newItem, ...prevItems])
  }

  return (
    <Card className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 border-blue-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          Evidence Archive
        </CardTitle>
        <CardDescription>
          Browse and search through verified evidence related to the moon landing research
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search evidence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedType === "all" ? "default" : "outline"}
              onClick={() => setSelectedType("all")}
            >
              All
            </Button>
            <Button
              variant={selectedType === "document" ? "default" : "outline"}
              onClick={() => setSelectedType("document")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </Button>
            <Button
              variant={selectedType === "image" ? "default" : "outline"}
              onClick={() => setSelectedType("image")}
            >
              <Image className="h-4 w-4 mr-2" />
              Images
            </Button>
            <Button
              variant={selectedType === "video" ? "default" : "outline"}
              onClick={() => setSelectedType("video")}
            >
              <Video className="h-4 w-4 mr-2" />
              Videos
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[200px] rounded-md border p-4">
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedTags(prev =>
                    prev.includes(tag)
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  )
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </ScrollArea>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvidence.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-card rounded-lg overflow-hidden border border-primary/10 cursor-pointer"
              onClick={() => handleView(item)}
            >
              <div className="relative h-48">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    {item.type === "document" && <FileText className="h-12 w-12 text-primary/50" />}
                    {item.type === "image" && <Image className="h-12 w-12 text-primary/50" />}
                    {item.type === "video" && <Video className="h-12 w-12 text-primary/50" />}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <p className="text-sm text-white/80 line-clamp-2">{item.description}</p>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span>{item.views} views</span>
                    <span>{item.downloads} downloads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(item);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(item);
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(item);
                      }}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleView(item);
                  }}
                >
                  View Details
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <Dialog open={isViewing} onOpenChange={setIsViewing}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedItem?.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>{selectedItem?.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedItem?.author}</p>
                  <p className="text-sm text-muted-foreground">{selectedItem?.date}</p>
                </div>
              </div>

              <Tabs defaultValue="content">
                <TabsList>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="comments">Comments ({selectedItem?.comments || 0})</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="space-y-4">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    {selectedItem?.thumbnail ? (
                      <img
                        src={selectedItem.thumbnail}
                        alt={selectedItem.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                        {selectedItem?.type === "document" && <FileText className="h-12 w-12 text-primary/50" />}
                        {selectedItem?.type === "image" && <Image className="h-12 w-12 text-primary/50" />}
                        {selectedItem?.type === "video" && <Video className="h-12 w-12 text-primary/50" />}
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground">{selectedItem?.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem?.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="comments" className="space-y-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Button onClick={handleComment}>Post</Button>
                  </div>
                  <div className="space-y-4">
                    {/* Sample comments would go here */}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  className={cn("flex items-center gap-2", selectedItem?.isLiked && "text-primary")}
                  onClick={() => selectedItem && handleLike(selectedItem)}
                >
                  <Heart className="h-4 w-4" />
                  {selectedItem?.likes || 0} Likes
                </Button>
                <Button
                  variant="ghost"
                  className={cn("flex items-center gap-2", selectedItem?.isBookmarked && "text-primary")}
                  onClick={() => selectedItem && handleBookmark(selectedItem)}
                >
                  <Bookmark className="h-4 w-4" />
                  Bookmark
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => selectedItem && handleShare(selectedItem)}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => selectedItem && handleDownload(selectedItem)}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
} 