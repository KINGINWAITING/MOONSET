"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart, LineChart, PieChart, TrendingUp, Users, FileText, MessageSquare, Brain, Download } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ResearchMetric {
  id: string
  title: string
  value: number
  change: number
  trend: "up" | "down"
}

interface EvidenceType {
  type: string
  count: number
  percentage: number
}

interface ResearchActivity {
  date: string
  evidenceAdded: number
  discussions: number
  aiAnalysis: number
}

const sampleMetrics: ResearchMetric[] = [
  {
    id: "1",
    title: "Total Evidence",
    value: 1234,
    change: 12,
    trend: "up",
  },
  {
    id: "2",
    title: "Active Researchers",
    value: 456,
    change: 8,
    trend: "up",
  },
  {
    id: "3",
    title: "AI Analysis",
    value: 789,
    change: -3,
    trend: "down",
  },
  {
    id: "4",
    title: "Collaborations",
    value: 234,
    change: 15,
    trend: "up",
  },
]

const sampleEvidenceTypes: EvidenceType[] = [
  {
    type: "Photographic",
    count: 450,
    percentage: 36,
  },
  {
    type: "Technical",
    count: 320,
    percentage: 26,
  },
  {
    type: "Documentary",
    count: 280,
    percentage: 23,
  },
  {
    type: "Testimonial",
    count: 184,
    percentage: 15,
  },
]

const sampleActivity: ResearchActivity[] = [
  { date: "Jan", evidenceAdded: 120, discussions: 45, aiAnalysis: 80 },
  { date: "Feb", evidenceAdded: 150, discussions: 60, aiAnalysis: 95 },
  { date: "Mar", evidenceAdded: 180, discussions: 75, aiAnalysis: 110 },
  { date: "Apr", evidenceAdded: 200, discussions: 90, aiAnalysis: 130 },
  { date: "May", evidenceAdded: 220, discussions: 105, aiAnalysis: 150 },
]

export function ResearchAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Research Analytics</CardTitle>
        <CardDescription>
          Track research progress and analyze evidence patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {sampleMetrics.map((metric) => (
            <Card key={metric.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                {metric.title === "Total Evidence" && <FileText className="h-4 w-4 text-muted-foreground" />}
                {metric.title === "Active Researchers" && <Users className="h-4 w-4 text-muted-foreground" />}
                {metric.title === "AI Analysis" && <Brain className="h-4 w-4 text-muted-foreground" />}
                {metric.title === "Collaborations" && <MessageSquare className="h-4 w-4 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className={`mr-1 h-3 w-3 ${
                    metric.trend === "up" ? "text-green-500" : "text-red-500"
                  }`} />
                  {metric.change}% from last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList>
            <TabsTrigger value="activity">
              <LineChart className="mr-2 h-4 w-4" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="evidence">
              <PieChart className="mr-2 h-4 w-4" />
              Evidence Types
            </TabsTrigger>
            <TabsTrigger value="insights">
              <Brain className="mr-2 h-4 w-4" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Research Activity</CardTitle>
                <CardDescription>
                  Monthly research activity trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-between">
                  {sampleActivity.map((activity) => (
                    <div key={activity.date} className="flex flex-col items-center">
                      <div className="flex gap-2 h-[200px]">
                        <div className="w-4 bg-primary/20 rounded-t" style={{ height: `${(activity.evidenceAdded / 220) * 100}%` }} />
                        <div className="w-4 bg-primary/40 rounded-t" style={{ height: `${(activity.discussions / 105) * 100}%` }} />
                        <div className="w-4 bg-primary/60 rounded-t" style={{ height: `${(activity.aiAnalysis / 150) * 100}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground mt-2">{activity.date}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary/20 rounded" />
                    <span className="text-xs">Evidence Added</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary/40 rounded" />
                    <span className="text-xs">Discussions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary/60 rounded" />
                    <span className="text-xs">AI Analysis</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evidence" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evidence Distribution</CardTitle>
                <CardDescription>
                  Breakdown of evidence by type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    {sampleEvidenceTypes.map((type, index) => {
                      const startAngle = index === 0 ? 0 : 
                        sampleEvidenceTypes.slice(0, index).reduce((acc, t) => acc + (t.percentage / 100) * 360, 0)
                      const endAngle = startAngle + (type.percentage / 100) * 360
                      
                      return (
                        <div
                          key={type.type}
                          className="absolute inset-0"
                          style={{
                            background: `conic-gradient(
                              from ${startAngle}deg,
                              var(--primary) ${startAngle}deg,
                              var(--primary) ${endAngle}deg,
                              transparent ${endAngle}deg
                            )`,
                            opacity: 0.2 + (index * 0.2),
                          }}
                        />
                      )
                    })}
                  </div>
                </div>
                <div className="grid gap-2 mt-4">
                  {sampleEvidenceTypes.map((type) => (
                    <div key={type.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded" />
                        <span className="text-sm">{type.type}</span>
                      </div>
                      <span className="text-sm font-medium">{type.count} ({type.percentage}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Research Insights</CardTitle>
                <CardDescription>
                  Key findings and patterns identified by AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] rounded-md border p-4">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-primary/5">
                      <h4 className="font-medium mb-2">Photographic Analysis Patterns</h4>
                      <p className="text-sm text-muted-foreground">
                        AI has identified consistent patterns in lighting anomalies across multiple Apollo mission photographs.
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">High Confidence</Badge>
                        <Badge variant="secondary">Multiple Sources</Badge>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5">
                      <h4 className="font-medium mb-2">Technical Inconsistencies</h4>
                      <p className="text-sm text-muted-foreground">
                        Analysis of mission equipment specifications reveals discrepancies in radiation shielding capabilities.
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">Technical Analysis</Badge>
                        <Badge variant="secondary">Verified Data</Badge>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5">
                      <h4 className="font-medium mb-2">Historical Context</h4>
                      <p className="text-sm text-muted-foreground">
                        Cross-referencing with historical records shows unusual patterns in mission documentation and public communications.
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">Historical Analysis</Badge>
                        <Badge variant="secondary">Pattern Recognition</Badge>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
        <Button>
          <Brain className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </CardFooter>
    </Card>
  )
} 