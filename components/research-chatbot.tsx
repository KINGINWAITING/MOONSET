"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Loader2, UploadCloud, Search, Brain } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FragmentsChat } from "@/components/fragments-chat"
import { FragmentsChatInput } from "@/components/fragments-chat-input"

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

import FragmentsChatPanel from "@/components/fragments-chat-panel"

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

  return <FragmentsChatPanel />

}