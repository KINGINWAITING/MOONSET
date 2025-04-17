"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, MessageSquare, Plus, Send, Share2, Bell, Settings } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TeamMember {
  id: string
  name: string
  role: string
  avatar?: string
  status: "online" | "offline" | "away"
}

interface Discussion {
  id: string
  title: string
  author: TeamMember
  lastMessage: string
  timestamp: string
  unread: boolean
}

interface Message {
  id: string
  author: TeamMember
  content: string
  timestamp: string
  attachments?: string[]
}

const sampleTeam: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    role: "Lead Researcher",
    status: "online",
  },
  {
    id: "2",
    name: "James Wilson",
    role: "Technical Analyst",
    status: "away",
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    role: "Evidence Archivist",
    status: "offline",
  },
]

const sampleDiscussions: Discussion[] = [
  {
    id: "1",
    title: "Photographic Analysis Findings",
    author: sampleTeam[0],
    lastMessage: "I've found some interesting patterns in the Apollo 11 images...",
    timestamp: "2h ago",
    unread: true,
  },
  {
    id: "2",
    title: "Technical Equipment Discussion",
    author: sampleTeam[1],
    lastMessage: "The radiation shielding calculations don't add up...",
    timestamp: "1d ago",
    unread: false,
  },
]

const sampleMessages: Message[] = [
  {
    id: "1",
    author: sampleTeam[0],
    content: "I've analyzed the latest batch of images and found some inconsistencies in the lighting patterns.",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    author: sampleTeam[1],
    content: "Interesting! Can you share the specific images you're referring to?",
    timestamp: "10:32 AM",
  },
]

export function ResearchCollaboration() {
  const [activeDiscussion, setActiveDiscussion] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>(sampleMessages)

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      author: sampleTeam[0], // Current user
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages(prev => [...prev, newMessage])
    setMessage("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Research Collaboration</CardTitle>
        <CardDescription>
          Collaborate with team members and discuss research findings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="team" className="space-y-4">
          <TabsList>
            <TabsTrigger value="team">
              <Users className="mr-2 h-4 w-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="discussions">
              <MessageSquare className="mr-2 h-4 w-4" />
              Discussions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="team" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Team Members</h3>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            </div>

            <ScrollArea className="h-[300px] rounded-md border p-4">
              <div className="space-y-4">
                {sampleTeam.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        member.status === "online"
                          ? "default"
                          : member.status === "away"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {member.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="discussions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Research Discussions</h3>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Discussion
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ScrollArea className="h-[400px] rounded-md border p-4 md:col-span-1">
                <div className="space-y-4">
                  {sampleDiscussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      className={`p-3 rounded-lg cursor-pointer ${
                        activeDiscussion === discussion.id
                          ? "bg-primary/10"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setActiveDiscussion(discussion.id)}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{discussion.title}</h4>
                        {discussion.unread && (
                          <Badge variant="default">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {discussion.lastMessage}
                      </p>
                      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                        <span>{discussion.author.name}</span>
                        <span>{discussion.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="md:col-span-2 space-y-4">
                {activeDiscussion ? (
                  <>
                    <ScrollArea className="h-[300px] rounded-md border p-4">
                      <div className="space-y-4">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className="flex items-start gap-3"
                          >
                            <Avatar>
                              <AvatarImage src={msg.author.avatar} />
                              <AvatarFallback>
                                {msg.author.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">
                                  {msg.author.name}
                                </p>
                                <span className="text-xs text-muted-foreground">
                                  {msg.timestamp}
                                </span>
                              </div>
                              <p className="text-sm mt-1">{msg.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Select a discussion to view messages
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Team Settings
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button>
            <Share2 className="mr-2 h-4 w-4" />
            Share Research
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
} 