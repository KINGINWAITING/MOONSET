"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Mail, Twitter, Facebook, Linkedin, Edit2, Plus, MoreVertical, Heart, MessageCircle, Bookmark, Send, FileText, Image, Video, Map, Globe, Search, Filter, Calendar, Clock, Paperclip, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    redirect("/sign-in");
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "Not available";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-card rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <img
                src={user.imageUrl}
                alt={user.username || "User"}
                className="w-32 h-32 rounded-full object-cover"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-muted-foreground mb-4">
                {user.primaryEmailAddress?.emailAddress}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="outline">Researcher</Badge>
                <Badge variant="outline">Contributor</Badge>
                <Badge variant="outline">Early Adopter</Badge>
              </div>
              <div className="flex gap-4 mt-4 justify-center md:justify-start">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Profile
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
                <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <TabsContent value="overview" className="space-y-6">
                    <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Username</p>
                        <p className="font-medium">{user.username || "Not set"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Member Since</p>
                        <p className="font-medium">{formatDate(user.createdAt)}</p>
                              </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Active</p>
                        <p className="font-medium">{formatDate(user.lastSignInAt)}</p>
                            </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{user.primaryEmailAddress?.emailAddress}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                          <Card>
                      <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <FileText className="h-5 w-5 text-primary" />
                          </div>
                                <div>
                          <p className="font-medium">Created new research document</p>
                          <p className="text-sm text-muted-foreground">2 hours ago</p>
                                </div>
                              </div>
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Bookmark className="h-5 w-5 text-primary" />
                            </div>
                        <div>
                          <p className="font-medium">Bookmarked evidence</p>
                          <p className="text-sm text-muted-foreground">5 hours ago</p>
                              </div>
                            </div>
                          </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

              <TabsContent value="research" className="space-y-6">
                          <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Research Documents</CardTitle>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New Document
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 rounded-lg border">
                        <FileText className="h-6 w-6 text-primary" />
                                <div className="flex-1">
                          <p className="font-medium">Apollo Mission Analysis</p>
                          <p className="text-sm text-muted-foreground">Last modified: {formatDate(new Date())}</p>
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
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 rounded-lg border">
                        <Bookmark className="h-6 w-6 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium">Moon Landing Evidence</p>
                          <p className="text-sm text-muted-foreground">Saved: {formatDate(new Date())}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                          </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive updates about your research</p>
                        </div>
                        <Button variant="outline">Enable</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                        </div>
                        <Button variant="outline">Enable</Button>
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
  );
}
