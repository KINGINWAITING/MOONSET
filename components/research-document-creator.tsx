"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { PlusCircle, X, Download, CheckCircle, FileText, Image as ImageIcon, Video, Upload, Save, Send, Eye, Link as LinkIcon, Calendar, Tag } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { EvidenceItem } from "./research-archive"

interface Document {
  id: string
  title: string
  description: string
  content: string
  type: 'document' | 'image' | 'video'
  tags: string[]
  files: File[]
  isPublic: boolean
  date: string
  author: string
  source: string
}

interface File {
  id: string
  name: string
  type: string
  size: number
  url: string
}

interface ValidationErrors {
  title?: string
  description?: string
  content?: string
}

interface ResearchDocumentCreatorProps {
  onSubmit?: (document: Document) => void
}

export function ResearchDocumentCreator({ onSubmit }: ResearchDocumentCreatorProps) {
  const initialDocument: Document = {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    content: "",
    type: "document",
    tags: [],
    files: [],
    isPublic: false,
    date: new Date().toISOString().split('T')[0],
    author: "Current User", // Would be replaced with actual user info
    source: "MOONSET Platform"
  }

  const [document, setDocument] = useState<Document>(initialDocument)
  const [tag, setTag] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [savedDocuments, setSavedDocuments] = useState<Document[]>([])
  const [activeTab, setActiveTab] = useState("editor")
  const { toast } = useToast()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  const submissionSuccess = searchParams.get("submissionSuccess")
  const [showPreview, setShowPreview] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  useEffect(() => {
    if (submissionSuccess === "true") {
      toast({
        title: "Submission Successful",
        description: "Your document has been added to the Evidence Archive.",
      })
    }
  }, [submissionSuccess, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDocument(prev => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value: string) => {
    if (value === "document" || value === "image" || value === "video") {
      setDocument(prev => ({ ...prev, type: value as 'document' | 'image' | 'video' }))
    }
  }

  const handleAddTag = () => {
    if (tag.trim() && !document.tags.includes(tag.trim())) {
      setDocument(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }))
      setTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setDocument(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles) return
    
    const newFiles: File[] = Array.from(selectedFiles).map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file)
    }))
    
    setDocument(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles]
    }))
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemoveFile = (fileId: string) => {
    setDocument(prev => ({
      ...prev,
      files: prev.files.filter(file => file.id !== fileId)
    }))
  }

  const validateDocument = () => {
    if (!document.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please provide a title for your document",
        variant: "destructive"
      })
      return false
    }

    if (!document.content.trim() && document.files.length === 0) {
      toast({
        title: "Content Required",
        description: "Please provide content for your document or attach files",
        variant: "destructive"
      })
      return false
    }

    return true
  }

  const handleSave = async (submit = false) => {
    if (!validateDocument()) return

    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newDocument = {
        ...document,
        updatedAt: new Date().toISOString(),
        createdAt: document.date,
        author: "Current User" // In a real app, this would be the current user
      }
      
      // Add to saved documents if it's new
      if (!document.id) {
        setSavedDocuments(prev => [newDocument, ...prev])
      } else {
        // Update existing document
        setSavedDocuments(prev => 
          prev.map(doc => doc.id === document.id ? newDocument : doc)
        )
      }
      
      setDocument(newDocument)
      toast({
        title: "Draft Saved",
        description: "Your document has been saved successfully"
      })
      
      // If submitting to archive
      if (submit || document.isPublic) {
        await handleSubmitToArchive(newDocument)
      }

      // In a real app, you might store in localStorage or save to a database
      localStorage.setItem("documentDraft", JSON.stringify(newDocument))

      return newDocument
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save document",
        variant: "destructive"
      })
      return null
    } finally {
      setIsSaving(false)
    }
  }

  const handleSubmitToArchive = async (doc: Document) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Convert to EvidenceItem format and save to localStorage
      const evidenceItem: EvidenceItem = {
        id: doc.id,
        title: doc.title,
        description: doc.description || `Document created on ${new Date(doc.date).toLocaleDateString()}`,
        type: doc.type,
        date: doc.date,
        author: doc.author || "Current User",
        tags: doc.tags.length > 0 ? doc.tags : ['research', 'document'],
        source: doc.source || "MOONSET Platform",
        content: doc.content,
        fileUrl: doc.files.length > 0 ? doc.files[0].url : undefined,
        thumbnailUrl: doc.files.find(f => f.type.startsWith('image/'))?.url,
        views: 0,
        downloads: 0
      }
      
      // Get existing items from localStorage
      const existingItemsStr = localStorage.getItem('evidenceItems')
      const existingItems = existingItemsStr ? JSON.parse(existingItemsStr) : []
      
      // Add new item and save back to localStorage
      const updatedItems = [...existingItems, evidenceItem]
      localStorage.setItem('evidenceItems', JSON.stringify(updatedItems))
      
      toast({
        title: "Submitted to Archive",
        description: "Your document has been submitted to the Evidence Archive"
      })
      
      // Navigate to the evidence archive with a success parameter
      setTimeout(() => {
        router.push("/dashboard/research?tab=archive&submissionSuccess=true")
      }, 1500)

      // Call the onSubmit callback if provided
      if (onSubmit) {
        onSubmit(doc)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit to archive",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLoadDocument = (doc: Document) => {
    setDocument(doc)
    setActiveTab("editor")
  }

  const handleNewDocument = () => {
    setDocument(initialDocument)
    setActiveTab("editor")
  }

  const togglePreview = () => {
    setShowPreview(!showPreview)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-2 shadow-md">
        <CardHeader>
          <CardTitle>Document Creator</CardTitle>
          <CardDescription>
            Create and manage your research documents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="editor">Document Editor</TabsTrigger>
              <TabsTrigger value="metadata">Metadata & Attachments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter document title"
                  value={document.title}
                  onChange={handleInputChange}
                  className={validationErrors.title ? "border-red-500" : ""}
                />
                {validationErrors.title && <p className="text-sm text-red-500">{validationErrors.title}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Brief description of your document"
                  value={document.description}
                  onChange={handleInputChange}
                  className={`min-h-[80px] ${validationErrors.description ? "border-red-500" : ""}`}
                />
                {validationErrors.description && <p className="text-sm text-red-500">{validationErrors.description}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content <span className="text-red-500">*</span></Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your document content here..."
                  value={document.content}
                  onChange={handleInputChange}
                  className={`min-h-[200px] ${validationErrors.content ? "border-red-500" : ""}`}
                />
                {validationErrors.content && <p className="text-sm text-red-500">{validationErrors.content}</p>}
              </div>
            </TabsContent>
            
            <TabsContent value="metadata" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Document Type</Label>
                  <Select value={document.type} onValueChange={handleTypeChange}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>Document</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="image">
                        <div className="flex items-center gap-2">
                          <ImageIcon className="h-4 w-4" />
                          <span>Image Analysis</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="video">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          <span>Video Analysis</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={document.date}
                    onChange={(e) => setDocument({ ...document, date: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    placeholder="Enter author name"
                    value={document.author}
                    onChange={(e) => setDocument({ ...document, author: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <Input
                    id="source"
                    placeholder="Source of information"
                    value={document.source}
                    onChange={(e) => setDocument({ ...document, source: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex space-x-2">
                  <Input
                    id="tags"
                    placeholder="Add tags"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <Button type="button" size="sm" onClick={handleAddTag}>
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {document.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {document.tags.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      No tags added yet. Tags help with categorization and discovery.
                    </p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="files">Attachments</Label>
                <div className="flex space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Add Attachment
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    multiple
                    className="hidden"
                  />
                </div>
                
                <div className="space-y-2 mt-2">
                  {document.files.map(file => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-2 bg-muted rounded-md"
                    >
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                  {document.files.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      No files attached yet. You can attach images, PDFs, and other supporting files.
                    </p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPublic"
                    checked={document.isPublic}
                    onCheckedChange={(checked) => 
                      setDocument({ ...document, isPublic: checked === true })
                    }
                  />
                  <Label htmlFor="isPublic" className="text-sm font-medium">
                    Submit to Evidence Archive
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground ml-6">
                  When enabled, this document will be submitted to the public Evidence Archive
                  upon saving, where it can be viewed by other researchers.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => setShowPreview(true)}
            disabled={isSaving || isSubmitting}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={isSaving || isSubmitting}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button
              onClick={() => handleSave(true)}
              disabled={isSaving || isSubmitting}
            >
              <Upload className="h-4 w-4 mr-2" />
              Submit to Archive
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {/* Document Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{document.title || "Untitled Document"}</DialogTitle>
            <DialogDescription className="flex items-center space-x-4">
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(document.date).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <FileText className="h-3 w-3 mr-1" />
                {document.type}
              </span>
              <span className="flex items-center">
                <LinkIcon className="h-3 w-3 mr-1" />
                {document.source}
              </span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 overflow-auto max-h-[calc(90vh-12rem)]">
            <div className="space-y-6">
              {document.description && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Description</h4>
                  <p className="text-sm">{document.description}</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {document.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {document.content && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Content</h4>
                  <div className="text-sm bg-muted p-4 rounded-md whitespace-pre-wrap">
                    {document.content}
                  </div>
                </div>
              )}
              
              {document.files.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Attachments</h4>
                  <div className="space-y-2">
                    {document.files.map(file => (
                      <div
                        key={file.id}
                        className="flex items-center p-2 bg-muted rounded-md"
                      >
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button>Close Preview</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
} 