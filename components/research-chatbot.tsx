"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Loader2, UploadCloud, Search, Brain } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

// Placeholder API hooks for model providers
const apiHooks = {
  openai: async (input: string, files: File[], opts: any) => {
    // TODO: Integrate real API
    return `OpenAI (${opts.model}): Simulated response for: ${input}`
  },
  anthropic: async (input: string, files: File[], opts: any) => {
    return `Anthropic (${opts.model}): Simulated response for: ${input}`
  },
  google: async (input: string, files: File[], opts: any) => {
    return `Google (${opts.model}): Simulated response for: ${input}`
  },
  moonset: async (input: string, files: File[], opts: any) => {
    return `MoonsetAI (${opts.model}): Simulated response for: ${input}`
  },
}

const PROVIDERS = [
  { label: "OpenAI", value: "openai", models: ["gpt-4o", "gpt-4", "gpt-3.5-turbo"] },
  { label: "Anthropic", value: "anthropic", models: ["claude-3-opus", "claude-3-sonnet"] },
  { label: "Google", value: "google", models: ["gemini-1.5-pro", "gemini-1.0-pro"] },
  { label: "MoonsetAI", value: "moonset", models: ["moonset-researcher", "moonset-lite"] },
]


interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
  sources?: string[]
  analysisType?: string
}

export function ResearchChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [provider, setProvider] = useState(PROVIDERS[0].value)
  const [model, setModel] = useState(PROVIDERS[0].models[0])
  const [internetSearch, setInternetSearch] = useState(false)
  const [deepResearch, setDeepResearch] = useState(false)
  const [analysisType, setAnalysisType] = useState("text")
  const [isGenerating, setIsGenerating] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
      analysisType,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsGenerating(true)

    // Simulate provider API call
    const opts = { model, internetSearch, deepResearch, analysisType }
    const apiFn = apiHooks[provider as keyof typeof apiHooks] || apiHooks.openai
    const aiResponse = await apiFn(input, attachments, opts)
    const aiMessage: Message = {
      role: "assistant",
      content: aiResponse,
      timestamp: new Date(),
      sources: [provider.charAt(0).toUpperCase() + provider.slice(1) + " Docs"],
      analysisType,
    }
    setMessages((prev) => [...prev, aiMessage])
    setIsGenerating(false)
  }

  return (
    <Card className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 border-blue-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-500" />
          Research Chatbot
        </CardTitle>
        <CardDescription>
          Analyze evidence and get AI-powered insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-[400px] rounded-md border p-4">
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {message.role === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                      <span className="font-medium">
                        {message.role === "user" ? "You" : "Research Assistant"}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.sources && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        Sources: {message.sources.join(", ")}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Select
            value={analysisType}
            onValueChange={setAnalysisType}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select analysis type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text Analysis</SelectItem>
              <SelectItem value="image">Image Analysis</SelectItem>
              <SelectItem value="video">Video Analysis</SelectItem>
              <SelectItem value="document">Document Analysis</SelectItem>
            </SelectContent>
          </Select>

          <Textarea
            placeholder="Type your research query..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}