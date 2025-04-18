"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Users, TrendingUp, Award, MessageSquare, Share2, Plus, Heart, Bookmark, Send, Filter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface User {
  id: string
  name: string
  username: string
  avatar: string
  bio: string
  followers: number
  following: number
  badges: string[]
  isFollowing: boolean
  lastActive: string
  researchFocus: string[]
}

interface Post {
  id: string
  author: User
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  media?: string[]
  isLiked?: boolean
  isBookmarked?: boolean
  tags: string[]
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  progress: number
  total: number
  isCompleted: boolean
}

const sampleUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    username: "@sarahj",
    avatar: "/placeholder-avatar.jpg",
    bio: "Lunar photography expert",
    followers: 2345,
    following: 123,
    badges: ["Expert", "Contributor"],
    isFollowing: false,
    lastActive: "2h ago",
    researchFocus: ["Photography", "Light Analysis"]
  },
  {
    id: "2",
    name: "Michael Chen",
    username: "@michaelc",
    avatar: "/placeholder-avatar.jpg",
    bio: "Physics researcher specializing in lunar anomalies",
    followers: 1890,
    following: 456,
    badges: ["Researcher", "Analyst"],
    isFollowing: true,
    lastActive: "5h ago",
    researchFocus: ["Physics", "Gravity Analysis"]
  },
  {
    id: "3",
    name: "Emma Wilson",
    username: "@emmaw",
    avatar: "/placeholder-avatar.jpg",
    bio: "Historical document analyst",
    followers: 1567,
    following: 234,
    badges: ["Historian", "Contributor"],
    isFollowing: false,
    lastActive: "1d ago",
    researchFocus: ["History", "Document Analysis"]
  }
]

const samplePosts: Post[] = [
  {
    id: "1",
    author: sampleUsers[0],
    content: "Just discovered a new anomaly in the Apollo 11 footage. The shadows don't match the sun's position!",
    timestamp: "2024-03-15T10:30:00Z",
    likes: 234,
    comments: 45,
    shares: 12,
    tags: ["Apollo 11", "Shadow Analysis", "Photography"],
    isLiked: false,
    isBookmarked: false
  },
  {
    id: "2",
    author: sampleUsers[1],
    content: "My latest research paper on lunar dust behavior is now available in the archive. Let me know your thoughts!",
    timestamp: "2024-03-14T15:45:00Z",
    likes: 189,
    comments: 32,
    shares: 8,
    tags: ["Research", "Physics", "Lunar Dust"],
    isLiked: true,
    isBookmarked: true
  },
  {
    id: "3",
    author: sampleUsers[2],
    content: "Found some interesting discrepancies in the mission logs. Will share my analysis soon!",
    timestamp: "2024-03-13T09:15:00Z",
    likes: 156,
    comments: 28,
    shares: 5,
    tags: ["Mission Logs", "Analysis", "History"],
    isLiked: false,
    isBookmarked: false
  }
]

const sampleAchievements: Achievement[] = [
  {
    id: "1",
    title: "Research Pioneer",
    description: "Publish 5 research papers",
    icon: "📚",
    progress: 3,
    total: 5,
    isCompleted: false
  },
  {
    id: "2",
    title: "Evidence Collector",
    description: "Contribute 10 pieces of evidence",
    icon: "🔍",
    progress: 8,
    total: 10,
    isCompleted: false
  },
  {
    id: "3",
    title: "Community Leader",
    description: "Gain 1000 followers",
    icon: "👥",
    progress: 750,
    total: 1000,
    isCompleted: false
  }
]

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  hover: {
    scale: 1.03,
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  tap: { scale: 0.98 }
}

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState<User[]>(sampleUsers)
  const [posts, setPosts] = useState<Post[]>(samplePosts)
  const [achievements, setAchievements] = useState<Achievement[]>(sampleAchievements)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedSort, setSelectedSort] = useState("recent")
  const { toast } = useToast()
  const [activeCommunityTab, setActiveCommunityTab] = useState("discover")
  const [prevCommunityTab, setPrevCommunityTab] = useState("discover")
  const [isLoading, setIsLoading] = useState(true)

  // LoadiEffect for initial data load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Handle community tab change with animation
  const handleCommunityTabChange = (value: string) => {
    setPrevCommunityTab(activeCommunityTab)
    setActiveCommunityTab(value)
    // Brief loading state for tab changes
    setIsLoading(true)
    
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }
  
  // Determine animation direction
  const getDirection = () => {
    const tabs = ["discover", "trending", "achievements"]
    const prevIndex = tabs.indexOf(prevCommunityTab)
    const currentIndex = tabs.indexOf(activeCommunityTab)
    return prevIndex < currentIndex ? 1 : -1
  }

  const direction = getDirection()

  const handleFollow = (userId: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        const newFollowingStatus = !user.isFollowing
        return {
          ...user,
          isFollowing: newFollowingStatus,
          followers: newFollowingStatus ? user.followers + 1 : user.followers - 1
        }
      }
      return user
    }))
  }

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        }
      }
      return post
    }))
  }

  const handleBookmark = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        }
      }
      return post
    }))
  }

  const handleShare = (post: Post) => {
    const shareUrl = window.location.href
    const text = `Check out this post by ${post.author.name} on MOONSET: ${post.content}`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`)
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.researchFocus.some(focus => focus.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const sortedPosts = [...posts].sort((a, b) => {
    if (selectedSort === "recent") {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    } else if (selectedSort === "popular") {
      return (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares)
    }
    return 0
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto py-8 space-y-8"
    >
      {isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      )}
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header Section */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Community</h1>
            <p className="text-muted-foreground">
              Connect with others passionate about lunar truth
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search community..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <DropdownMenu>
              {/* ... existing dropdown menu ... */}
            </DropdownMenu>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants}>
          <Tabs value={activeCommunityTab} onValueChange={handleCommunityTabChange} className="space-y-8">
            <TabsList className="bg-card/50 p-1">
              <TabsTrigger value="discover">Discover</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCommunityTab}
                initial={{ opacity: 0, x: 50 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 * direction }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <TabsContent value="discover" className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Discover Researchers</h2>
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredUsers.map((user) => (
                        <motion.div
                          key={user.id}
                          variants={cardVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className="bg-card rounded-lg p-4 border"
                        >
                          <div className="flex items-start gap-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{user.name}</h3>
                                  <p className="text-sm text-muted-foreground">{user.username}</p>
                                </div>
                                <Button
                                  variant={user.isFollowing ? "outline" : "default"}
                                  size="sm"
                                  onClick={() => handleFollow(user.id)}
                                >
                                  {user.isFollowing ? "Following" : "Follow"}
                                </Button>
                              </div>
                              <p className="text-sm mt-2">{user.bio}</p>
                              <div className="flex gap-2 mt-2">
                                {user.badges.map((badge, index) => (
                                  <Badge key={index} variant="secondary">
                                    {badge}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                                <span>{user.followers} followers</span>
                                <span>{user.following} following</span>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {user.researchFocus.map((focus, index) => (
                                  <Badge key={index} variant="outline">
                                    {focus}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Active Discussions</h2>
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {posts.slice(0, 3).map((post) => (
                        <motion.div
                          key={post.id}
                          variants={cardVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className="bg-card rounded-lg p-4 border"
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar>
                              <AvatarImage src={post.author.avatar} />
                              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{post.author.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(post.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <p className="mb-4">{post.content}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <button 
                              className={cn("flex items-center gap-1 hover:text-primary", post.isLiked && "text-primary")}
                              onClick={() => handleLike(post.id)}
                            >
                              <Heart className="h-4 w-4" />
                              Like ({post.likes})
                            </button>
                            <button className="flex items-center gap-1 hover:text-primary">
                              <MessageSquare className="h-4 w-4" />
                              Comment ({post.comments})
                            </button>
                            <button 
                              className="flex items-center gap-1 hover:text-primary"
                              onClick={() => handleShare(post)}
                            >
                              <Share2 className="h-4 w-4" />
                              Share ({post.shares})
                            </button>
                            <button 
                              className={cn("flex items-center gap-1 hover:text-primary ml-auto", post.isBookmarked && "text-primary")}
                              onClick={() => handleBookmark(post.id)}
                            >
                              <Bookmark className="h-4 w-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="trending" className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold">Trending Posts</h2>
                        <p className="text-sm text-muted-foreground">The most discussed topics</p>
                      </div>
                      <Select value={selectedSort} onValueChange={setSelectedSort}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="popular">Most Popular</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-4">
                      {sortedPosts.map((post) => (
                        <motion.div
                          key={post.id}
                          variants={cardVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className="bg-card rounded-lg p-4 border"
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar>
                              <AvatarImage src={post.author.avatar} />
                              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{post.author.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(post.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <p className="mb-4">{post.content}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <button 
                              className={cn("flex items-center gap-1 hover:text-primary", post.isLiked && "text-primary")}
                              onClick={() => handleLike(post.id)}
                            >
                              <Heart className="h-4 w-4" />
                              Like ({post.likes})
                            </button>
                            <button className="flex items-center gap-1 hover:text-primary">
                              <MessageSquare className="h-4 w-4" />
                              Comment ({post.comments})
                            </button>
                            <button 
                              className="flex items-center gap-1 hover:text-primary"
                              onClick={() => handleShare(post)}
                            >
                              <Share2 className="h-4 w-4" />
                              Share ({post.shares})
                            </button>
                            <button 
                              className={cn("flex items-center gap-1 hover:text-primary ml-auto", post.isBookmarked && "text-primary")}
                              onClick={() => handleBookmark(post.id)}
                            >
                              <Bookmark className="h-4 w-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="achievements" className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Community Achievements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {achievements.map((achievement) => (
                        <motion.div
                          key={achievement.id}
                          variants={cardVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className="bg-card rounded-lg p-4 border"
                        >
                          <div className="flex items-start gap-4">
                            <div className="text-4xl">{achievement.icon}</div>
                            <div className="flex-1">
                              <h3 className="font-medium">{achievement.title}</h3>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                              <div className="mt-2">
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className={cn(
                                      "h-full rounded-full",
                                      achievement.isCompleted ? "bg-green-500" : "bg-primary"
                                    )}
                                    style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                                  />
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {achievement.progress} of {achievement.total} completed
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Top Contributors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {users.slice(0, 3).map((user) => (
                        <motion.div
                          key={user.id}
                          variants={cardVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className="bg-card rounded-lg p-4 border"
                        >
                          <div className="flex items-start gap-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{user.name}</h3>
                                  <p className="text-sm text-muted-foreground">{user.username}</p>
                                </div>
                                <Button
                                  variant={user.isFollowing ? "outline" : "default"}
                                  size="sm"
                                  onClick={() => handleFollow(user.id)}
                                >
                                  {user.isFollowing ? "Following" : "Follow"}
                                </Button>
                              </div>
                              <p className="text-sm mt-2">{user.bio}</p>
                              <div className="flex gap-2 mt-2">
                                {user.badges.map((badge, index) => (
                                  <Badge key={index} variant="secondary">
                                    {badge}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                                <span>{user.followers} followers</span>
                                <span>{user.following} following</span>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {user.researchFocus.map((focus, index) => (
                                  <Badge key={index} variant="outline">
                                    {focus}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
