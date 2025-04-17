"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Plus, X, Save, Upload, Image, Video, Link } from "lucide-react"
import { motion } from "framer-motion"

interface DocumentSection {
  id: string
  type: "text" | "image" | "video" | "link"
  content: string
  description?: string
}

export function ResearchDocumentCreator() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [sections, setSections] = useState<DocumentSection[]>([
    {
      id: "1",
      type: "text",
      content: "",
      description: "Start writing your research document...",
    },
  ])

  const addSection = (type: DocumentSection["type"]) => {
    const newSection: DocumentSection = {
      id: Date.now().toString(),
      type,
      content: "",
      description: `Add your ${type} content here...`,
    }
    setSections((prev) => [...prev, newSection])
  }

  const removeSection = (id: string) => {
    setSections((prev) => prev.filter((section) => section.id !== id))
  }

  const updateSection = (id: string, content: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, content } : section
      )
    )
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags((prev) => [...prev, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove))
  }

  return (
    <Card className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 border-blue-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          Research Document Creator
        </CardTitle>
        <CardDescription>
          Create and organize your research findings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Document Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Document Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Add tags..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTag()
                }
              }}
            />
            <Button variant="outline" onClick={addTag}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <ScrollArea className="h-[500px] rounded-md border p-4">
          <div className="space-y-4">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {section.type === "text" && <FileText className="h-4 w-4 text-blue-500" />}
                        {section.type === "image" && <Image className="h-4 w-4 text-blue-500" />}
                        {section.type === "video" && <Video className="h-4 w-4 text-blue-500" />}
                        {section.type === "link" && <Link className="h-4 w-4 text-blue-500" />}
                        <span className="font-medium">Section {index + 1}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSection(section.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {section.type === "text" && (
                      <Textarea
                        placeholder={section.description}
                        value={section.content}
                        onChange={(e) => updateSection(section.id, e.target.value)}
                        className="min-h-[200px]"
                      />
                    )}
                    {section.type === "image" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center rounded-lg border border-dashed p-4">
                          <Button variant="outline" className="gap-2">
                            <Upload className="h-4 w-4" />
                            Upload Image
                          </Button>
                        </div>
                        <Input
                          placeholder="Image description"
                          value={section.content}
                          onChange={(e) => updateSection(section.id, e.target.value)}
                        />
                      </div>
                    )}
                    {section.type === "video" && (
                      <div className="space-y-2">
                        <Input
                          placeholder="Video URL"
                          value={section.content}
                          onChange={(e) => updateSection(section.id, e.target.value)}
                        />
                        <Input
                          placeholder="Video description"
                          value={section.description}
                          onChange={(e) =>
                            setSections((prev) =>
                              prev.map((s) =>
                                s.id === section.id
                                  ? { ...s, description: e.target.value }
                                  : s
                              )
                            )
                          }
                        />
                      </div>
                    )}
                    {section.type === "link" && (
                      <div className="space-y-2">
                        <Input
                          placeholder="Link URL"
                          value={section.content}
                          onChange={(e) => updateSection(section.id, e.target.value)}
                        />
                        <Input
                          placeholder="Link description"
                          value={section.description}
                          onChange={(e) =>
                            setSections((prev) =>
                              prev.map((s) =>
                                s.id === section.id
                                  ? { ...s, description: e.target.value }
                                  : s
                              )
                            )
                          }
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => addSection("text")}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Add Text Section
          </Button>
          <Button
            variant="outline"
            onClick={() => addSection("image")}
            className="gap-2"
          >
            <Image className="h-4 w-4" />
            Add Image Section
          </Button>
          <Button
            variant="outline"
            onClick={() => addSection("video")}
            className="gap-2"
          >
            <Video className="h-4 w-4" />
            Add Video Section
          </Button>
          <Button
            variant="outline"
            onClick={() => addSection("link")}
            className="gap-2"
          >
            <Link className="h-4 w-4" />
            Add Link Section
          </Button>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Preview</Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save Document
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 