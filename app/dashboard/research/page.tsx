"use client"

import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Search, FileText, BookOpen, Lock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Sample research reports based on the whitepaper content
const researchReports = [
  {
    id: "report-001",
    title: "Photographic Anomalies in Apollo Mission Imagery",
    description:
      "Detailed analysis of the absence of stars, waving flag, identical backgrounds, and shadow inconsistencies in official NASA photographs.",
    date: "April 10, 2025",
    author: "LunaLie Research Team",
    premium: false,
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "report-002",
    title: "The Van Allen Radiation Belt Problem",
    description:
      "Examination of the radiation exposure challenges and the questionable ability of 1960s technology to adequately shield astronauts.",
    date: "April 5, 2025",
    author: "LunaLie Research Team",
    premium: true,
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "report-003",
    title: "Missing Blast Crater: The Lunar Module Landing Controversy",
    description:
      "Investigation into the absence of a significant blast crater beneath the Lunar Module despite its powerful descent engine.",
    date: "March 28, 2025",
    author: "LunaLie Research Team",
    premium: true,
    thumbnail: "/placeholder.svg?height=100&width=200",
  },
]

export default function ResearchPage() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [aiPrompt, setAiPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiResponse, setAiResponse] = useState("")

  const handleAiGenerate = () => {
    if (!aiPrompt) return

    setIsGenerating(true)
    setAiResponse("")

    // Simulate AI response generation
    setTimeout(() => {
      setAiResponse(
        `Analysis of ${aiPrompt}:\n\n` +
          "Based on our extensive research into the lunar landing controversy, the evidence suggests significant inconsistencies in NASA's official narrative. " +
          "The photographic anomalies, technical impossibilities, and geopolitical context of the Cold War all point to a carefully orchestrated deception. " +
          "The absence of stars in lunar photographs, the waving flag in an environment with no atmosphere, and the lack of a blast crater beneath the lunar module " +
          "are just a few of the compelling pieces of evidence that challenge the authenticity of the moon landing. " +
          "Furthermore, the Van Allen radiation belts would have posed a lethal threat to the astronauts, yet NASA claims they passed through with minimal shielding. " +
          "These inconsistencies, among many others, warrant serious investigation and public discourse.",
      )
      setIsGenerating(false)
    }, 2000)
  }

  const filteredReports = researchReports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">AI Research Platform</h1>
      <p className="text-muted-foreground">
        Access our AI-powered research platform to analyze evidence and contribute to the lunar truth archive
      </p>

      {!walletConnected && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Wallet not connected</AlertTitle>
          <AlertDescription>
            Connect your wallet to access premium research content and AI analysis.
            <Button variant="link" className="h-auto p-0 ml-2" onClick={() => setWalletConnected(true)}>
              Connect now
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="reports">
        <TabsList>
          <TabsTrigger value="reports">Evidence Archive</TabsTrigger>
          <TabsTrigger value="ai">AI Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search evidence archive..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredReports.map((report) => (
              <Card key={report.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={report.thumbnail || "/placeholder.svg"}
                    alt={report.title}
                    className="w-full h-32 object-cover"
                  />
                  {report.premium && !walletConnected && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <Lock className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm font-medium mt-2">Premium Content</span>
                      </div>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {report.title}
                    {report.premium && (
                      <Badge variant="outline" className="ml-2">
                        Premium
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {report.date} • {report.author}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{report.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" disabled={report.premium && !walletConnected}>
                    <FileText className="mr-2 h-4 w-4" />
                    Read Report
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lunar Truth AI Assistant</CardTitle>
              <CardDescription>
                Ask our AI assistant for analysis on moon landing evidence, anomalies, or historical inconsistencies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-prompt">Your question</Label>
                <Textarea
                  id="ai-prompt"
                  placeholder="E.g., What evidence suggests the lunar module would have left a crater upon landing?"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  disabled={!walletConnected}
                  className="min-h-[100px]"
                />
              </div>

              {aiResponse && (
                <div className="rounded-lg border p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span className="font-medium">AI Analysis</span>
                  </div>
                  <div className="whitespace-pre-line text-sm">{aiResponse}</div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleAiGenerate}
                disabled={!walletConnected || !aiPrompt || isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Analysis"}
              </Button>
            </CardFooter>
          </Card>

          {!walletConnected && (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <Lock className="mx-auto h-8 w-8 text-muted-foreground" />
              <h3 className="mt-2 font-semibold">Connect Wallet to Access</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Connect your wallet to use the Lunar Truth AI Assistant
              </p>
              <Button className="mt-4" onClick={() => setWalletConnected(true)}>
                Connect Wallet
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
