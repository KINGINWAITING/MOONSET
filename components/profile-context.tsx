"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { UserProfile, Post } from "@/lib/types"

// Sample user data
const sampleUser: UserProfile = {
  id: "user-1",
  name: "Alex Johnson",
  username: "alexj",
  bio: "Truth seeker. Researcher. Dedicated to exposing the lunar landing deception.",
  avatar: "/placeholder.svg?height=200&width=200&text=AJ",
  coverImage: "/placeholder.svg?height=400&width=1200&text=Cover+Image",
  location: "New York, USA",
  website: "https://example.com",
  joinedDate: "April 2025",
  isPublic: true,
  moonsetBalance: 1250,
  researchContributions: 7,
  proposalsVoted: 3,
}

// Sample posts
const samplePosts: Post[] = [
  {
    id: "post-1",
    userId: "user-1",
    author: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/placeholder.svg?height=200&width=200&text=AJ",
    },
    content:
      "Just analyzed the shadow angles in the Apollo 11 photographs. The inconsistencies are striking! Check out my full research in the archive section.",
    createdAt: "2025-04-12T15:30:00Z",
    likes: 24,
    comments: 5,
    hasLiked: false,
  },
  {
    id: "post-2",
    userId: "user-1",
    author: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/placeholder.svg?height=200&width=200&text=AJ",
    },
    content:
      "Excited to share my latest findings on the Van Allen radiation belt problem. How did the astronauts survive this deadly radiation?",
    media: [
      {
        type: "image",
        url: "/placeholder.svg?height=400&width=600&text=Radiation+Belt+Analysis",
      },
    ],
    createdAt: "2025-04-10T09:15:00Z",
    likes: 42,
    comments: 8,
    hasLiked: true,
  },
  {
    id: "post-3",
    userId: "user-1",
    author: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/placeholder.svg?height=200&width=200&text=AJ",
    },
    content:
      "Just voted on the new community proposal for increasing research funding. Make sure to cast your vote before the deadline!",
    createdAt: "2025-04-08T14:20:00Z",
    likes: 18,
    comments: 3,
    hasLiked: false,
  },
]

// Sample community members
const sampleCommunityMembers: UserProfile[] = [
  {
    id: "user-2",
    name: "Sarah Thompson",
    username: "saraht",
    bio: "Documentary filmmaker exploring the moon landing controversy",
    avatar: "/placeholder.svg?height=200&width=200&text=ST",
    coverImage: "/placeholder.svg?height=400&width=1200",
    location: "Los Angeles, USA",
    website: "https://example.com/sarah",
    joinedDate: "March 2025",
    isPublic: true,
    moonsetBalance: 3200,
    researchContributions: 12,
    proposalsVoted: 5,
  },
  {
    id: "user-3",
    name: "Michael Chen",
    username: "michaelc",
    bio: "Blockchain developer and space enthusiast",
    avatar: "/placeholder.svg?height=200&width=200&text=MC",
    coverImage: "/placeholder.svg?height=400&width=1200",
    location: "Singapore",
    website: "https://example.com/michael",
    joinedDate: "February 2025",
    isPublic: true,
    moonsetBalance: 5400,
    researchContributions: 3,
    proposalsVoted: 8,
  },
  {
    id: "user-4",
    name: "Emily Rodriguez",
    username: "emilyr",
    bio: "Community manager and researcher",
    avatar: "/placeholder.svg?height=200&width=200&text=ER",
    coverImage: "/placeholder.svg?height=400&width=1200",
    location: "Madrid, Spain",
    website: "https://example.com/emily",
    joinedDate: "March 2025",
    isPublic: true,
    moonsetBalance: 2100,
    researchContributions: 9,
    proposalsVoted: 7,
  },
]

interface ProfileContextType {
  currentUser: UserProfile
  updateProfile: (profile: Partial<UserProfile>) => void
  userPosts: Post[]
  addPost: (post: Omit<Post, "id" | "author" | "createdAt" | "likes" | "comments" | "hasLiked">) => void
  communityMembers: UserProfile[]
  communityPosts: Post[]
  toggleLike: (postId: string) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile>(sampleUser)
  const [userPosts, setUserPosts] = useState<Post[]>(samplePosts)
  const [communityMembers, setCommunityMembers] = useState<UserProfile[]>(sampleCommunityMembers)
  const [communityPosts, setCommunityPosts] = useState<Post[]>([...samplePosts])

  // Load data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("moonset_user")
    const storedPosts = localStorage.getItem("moonset_posts")
    const storedCommunityMembers = localStorage.getItem("moonset_community_members")
    const storedCommunityPosts = localStorage.getItem("moonset_community_posts")

    if (storedUser) setCurrentUser(JSON.parse(storedUser))
    if (storedPosts) setUserPosts(JSON.parse(storedPosts))
    if (storedCommunityMembers) setCommunityMembers(JSON.parse(storedCommunityMembers))
    if (storedCommunityPosts) setCommunityPosts(JSON.parse(storedCommunityPosts))
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("moonset_user", JSON.stringify(currentUser))
    localStorage.setItem("moonset_posts", JSON.stringify(userPosts))
    localStorage.setItem("moonset_community_members", JSON.stringify(communityMembers))
    localStorage.setItem("moonset_community_posts", JSON.stringify(communityPosts))
  }, [currentUser, userPosts, communityMembers, communityPosts])

  const updateProfile = (profile: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...profile }))
  }

  const addPost = (post: Omit<Post, "id" | "author" | "createdAt" | "likes" | "comments" | "hasLiked">) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      userId: currentUser.id,
      author: {
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
      },
      content: post.content,
      media: post.media,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      hasLiked: false,
    }

    setUserPosts((prev) => [newPost, ...prev])
    setCommunityPosts((prev) => [newPost, ...prev])
  }

  const toggleLike = (postId: string) => {
    setUserPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
              hasLiked: !post.hasLiked,
            }
          : post,
      ),
    )

    setCommunityPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
              hasLiked: !post.hasLiked,
            }
          : post,
      ),
    )
  }

  return (
    <ProfileContext.Provider
      value={{
        currentUser,
        updateProfile,
        userPosts,
        addPost,
        communityMembers,
        communityPosts,
        toggleLike,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider")
  }
  return context
}
