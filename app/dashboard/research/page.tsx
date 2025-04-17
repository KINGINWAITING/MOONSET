"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ResearchChatbot } from "@/components/research-chatbot"
import { ResearchArchive } from "@/components/research-archive"
import { ResearchDocumentCreator } from "@/components/research-document-creator"
import { ResearchCollaboration } from "@/components/research-collaboration"
import { ResearchAnalytics } from "@/components/research-analytics"
import { Upload, Share2, Search, BarChart3, Users, Brain, FileText } from "lucide-react"
import { motion } from "framer-motion"

export default function ResearchPlatform() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 font-sans tracking-normal">
      <div className="w-full h-full px-4 sm:px-8 flex flex-col space-y-10">
        {/* Header Section */}
        <div className="space-y-6 border-b border-muted/30 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div className="space-y-3 pt-8">
              <h1
                className="text-xl md:text-2xl font-semibold tracking-wide bg-gradient-to-r from-blue-700 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent mb-1"
                style={{ fontFamily: 'Inter, Quicksand, Nunito, sans-serif', letterSpacing: '0.04em' }}
              >
                AI Research Platform
              </h1>
              <p className="text-sm md:text-base font-normal text-muted-foreground max-w-2xl">
                Advanced tools for analyzing and documenting moon landing evidence
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="gap-2 px-5 py-3 rounded-full shadow-md text-base">
                <Upload className="h-5 w-5" />
                Upload Evidence
              </Button>
              <Button className="gap-2 px-5 py-3 rounded-full shadow-md text-base">
                <Share2 className="h-5 w-5" />
                Share Research
              </Button>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mt-2"
          >
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search evidence, documents, or research..."
              className="pl-12 py-3 rounded-full shadow bg-white/60 backdrop-blur-md border-none text-base focus:ring-2 focus:ring-blue-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>


        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs defaultValue="chatbot" className="space-y-6">
            <TabsList className="flex w-full gap-2 bg-white/30 backdrop-blur-lg shadow-xl ring-1 ring-white/20 rounded-2xl mb-4 px-2 overflow-x-auto whitespace-nowrap border border-white/10">

              <TabsTrigger value="chatbot" className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-2xl transition-all duration-200 hover:bg-white/40 data-[state=active]:bg-gradient-to-br from-blue-400/20 to-blue-600/20 data-[state=active]:text-primary">
                <Brain className="h-5 w-5" />
                AI Chatbot
              </TabsTrigger>
              <TabsTrigger value="archive" className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-2xl transition-all duration-200 hover:bg-white/40 data-[state=active]:bg-gradient-to-br from-blue-400/20 to-blue-600/20 data-[state=active]:text-primary">
                <BarChart3 className="h-5 w-5" />
                Evidence Archive
              </TabsTrigger>
              <TabsTrigger value="document" className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-2xl transition-all duration-200 hover:bg-white/40 data-[state=active]:bg-gradient-to-br from-blue-400/20 to-blue-600/20 data-[state=active]:text-primary">
                <FileText className="h-5 w-5" />
                Document Creator
              </TabsTrigger>
              <TabsTrigger value="collaboration" className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-2xl transition-all duration-200 hover:bg-white/40 data-[state=active]:bg-gradient-to-br from-blue-400/20 to-blue-600/20 data-[state=active]:text-primary">
                <Users className="h-5 w-5" />
                Collaboration
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-2xl transition-all duration-200 hover:bg-white/40 data-[state=active]:bg-gradient-to-br from-blue-400/20 to-blue-600/20 data-[state=active]:text-primary">
                <BarChart3 className="h-5 w-5" />
                Analytics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="chatbot" className="space-y-4">
              <ResearchChatbot />
            </TabsContent>
            <TabsContent value="archive" className="space-y-4">
              <ResearchArchive />
            </TabsContent>
            <TabsContent value="document" className="space-y-4">
              <ResearchDocumentCreator />
            </TabsContent>
            <TabsContent value="collaboration" className="space-y-4">
              <ResearchCollaboration />
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <ResearchAnalytics />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
