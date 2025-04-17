"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Download, Share2, FileText, Image, Video, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

interface EvidenceItem {
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
}

const sampleEvidence: EvidenceItem[] = [
  {
    id: "1",
    title: "Apollo 11 Photographic Analysis",
    description: "Detailed analysis of Apollo 11 mission photographs showing inconsistencies in lighting and shadows.",
    type: "image",
    date: "2024-03-15",
    author: "Dr. James Wilson",
    tags: ["photography", "lighting", "shadows"],
    source: "Independent Research",
    views: 1245,
    downloads: 342,
  },
  {
    id: "2",
    title: "Van Allen Radiation Belt Study",
    description: "Comprehensive study of radiation levels in the Van Allen belts and their implications for manned space travel.",
    type: "document",
    date: "2024-02-28",
    author: "Prof. Sarah Chen",
    tags: ["radiation", "physics", "space travel"],
    source: "Scientific Journal",
    views: 876,
    downloads: 234,
  },
  {
    id: "3",
    title: "Lunar Module Landing Footage",
    description: "High-resolution analysis of the lunar module landing footage showing potential anomalies.",
    type: "video",
    date: "2024-01-10",
    author: "Michael Rodriguez",
    tags: ["video", "landing", "anomalies"],
    source: "NASA Archives",
    views: 2103,
    downloads: 567,
  },
]

export function ResearchArchive() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filteredEvidence = sampleEvidence.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = !selectedType || item.type === selectedType
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => item.tags.includes(tag))

    return matchesSearch && matchesType && matchesTags
  })

  const allTags = Array.from(new Set(sampleEvidence.flatMap(item => item.tags)))

  return (
    <Card className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 border-blue-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-500" />
          Evidence Archive
        </CardTitle>
        <CardDescription>
          Browse and analyze our collection of moon landing evidence
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search evidence..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="shrink-0">
            <Share2 className="mr-2 h-4 w-4" />
            Share Archive
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={!selectedType ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedType(null)}
          >
            All Types
          </Badge>
          <Badge
            variant={selectedType === "document" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedType("document")}
          >
            <FileText className="mr-1 h-3 w-3" />
            Documents
          </Badge>
          <Badge
            variant={selectedType === "image" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedType("image")}
          >
            <Image className="mr-1 h-3 w-3" />
            Images
          </Badge>
          <Badge
            variant={selectedType === "video" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedType("video")}
          >
            <Video className="mr-1 h-3 w-3" />
            Videos
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                setSelectedTags(prev =>
                  selectedTags.includes(tag)
                    ? prev.filter(t => t !== tag)
                    : [...prev, tag]
                )
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <ScrollArea className="h-[500px]">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvidence.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {item.type === "document" && <FileText className="h-4 w-4 text-blue-500" />}
                      {item.type === "image" && <Image className="h-4 w-4 text-blue-500" />}
                      {item.type === "video" && <Video className="h-4 w-4 text-blue-500" />}
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{item.author}</span>
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.views} views • {item.downloads} downloads
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 