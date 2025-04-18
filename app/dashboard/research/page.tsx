"use client"

import { useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, Plus, Bookmark, Share2, MoreVertical } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ResearchDashboard() {
  const { user, isLoaded } = useUser()
  const [activeTab, setActiveTab] = useState("documents")
  
  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Research Dashboard</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Research
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Research Documents</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Search className="h-4 w-4 mr-2" />
                          Search
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="flex items-center gap-4 p-4 rounded-lg border">
                        <FileText className="h-6 w-6 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium">Apollo Mission Analysis</p>
                          <p className="text-sm text-muted-foreground">Last modified: Today</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="evidence" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Evidence Collection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="flex items-center gap-4 p-4 rounded-lg border">
                        <FileText className="h-6 w-6 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium">Photographic Analysis</p>
                          <p className="text-sm text-muted-foreground">Added: Today</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookmarks" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="flex items-center gap-4 p-4 rounded-lg border">
                        <Bookmark className="h-6 w-6 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium">Moon Landing Evidence</p>
                          <p className="text-sm text-muted-foreground">Saved: Today</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shared" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shared Research</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="flex items-center gap-4 p-4 rounded-lg border">
                        <Share2 className="h-6 w-6 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium">Shared Analysis</p>
                          <p className="text-sm text-muted-foreground">Shared: Today</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  )
}
