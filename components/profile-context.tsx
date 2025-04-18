"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { UserProfile, Post, Comment } from "@/lib/types"
import { useUser } from "@clerk/nextjs"

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
  achievements: [
    { id: "ach-1", title: "Early Adopter", description: "Joined during platform launch", icon: "🚀", date: "April 2025" },
    { id: "ach-2", title: "Truth Seeker", description: "Published 5+ research posts", icon: "🔍", date: "April 2025" },
    { id: "ach-3", title: "Community Pillar", description: "Actively participated in governance", icon: "🏛️", date: "April 2025" }
  ],
  activity: [
    { id: "act-1", type: "post", description: "Created a new post", date: "2025-04-12T15:30:00Z" },
    { id: "act-2", type: "research", description: "Contributed to Van Allen belt research", date: "2025-04-10T09:15:00Z" },
    { id: "act-3", type: "governance", description: "Voted on funding proposal", date: "2025-04-08T14:20:00Z" }
  ]
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

// Sample comments for posts
const sampleComments: Record<string, Comment[]> = {
  "post-1": [
    {
      id: "comment-1",
      postId: "post-1",
      userId: "user-2",
      author: {
        name: "Sarah Thompson",
        username: "saraht",
        avatar: "/placeholder.svg?height=200&width=200&text=ST"
      },
      content: "Great analysis! The shadow angles definitely don't match what we'd expect from a single light source.",
      createdAt: "2025-04-12T16:45:00Z",
      likes: 5,
      hasLiked: false
    },
    {
      id: "comment-2",
      postId: "post-1",
      userId: "user-3",
      author: {
        name: "Michael Chen",
        username: "michaelc",
        avatar: "/placeholder.svg?height=200&width=200&text=MC"
      },
      content: "Have you considered the possibility of multiple light reflections from the lunar surface?",
      createdAt: "2025-04-12T17:30:00Z",
      likes: 2,
      hasLiked: true
    }
  ],
  "post-2": [
    {
      id: "comment-3",
      postId: "post-2",
      userId: "user-4",
      author: {
        name: "Emily Rodriguez",
        username: "emilyr",
        avatar: "/placeholder.svg?height=200&width=200&text=ER"
      },
      content: "This is a fascinating topic. The radiation levels should have been lethal without proper shielding.",
      createdAt: "2025-04-10T10:20:00Z",
      likes: 8,
      hasLiked: false
    }
  ]
}

// Sample community groups
const sampleCommunityGroups = [
  {
    id: "group-1",
    name: "Lunar Research Collective",
    description: "Dedicated to investigating lunar landing anomalies",
    memberCount: 128,
    isPrivate: false,
    coverImage: "/placeholder.svg?height=200&width=400&text=Lunar+Research",
    hasJoined: false
  },
  {
    id: "group-2",
    name: "Radiation Belt Experts",
    description: "Technical discussions about Van Allen radiation belts",
    memberCount: 75,
    isPrivate: false,
    coverImage: "/placeholder.svg?height=200&width=400&text=Radiation+Belt",
    hasJoined: false
  },
  {
    id: "group-3",
    name: "Photo & Video Analysis",
    description: "Detailed analysis of NASA imagery and footage",
    memberCount: 210,
    isPrivate: false,
    coverImage: "/placeholder.svg?height=200&width=400&text=Photo+Analysis",
    hasJoined: false
  }
]

// Sample upcoming events
const sampleEvents = [
  {
    id: "event-1",
    title: "Community AMA Session",
    description: "Ask Me Anything with renowned researcher Dr. James Wilson",
    date: "2025-04-20T15:00:00Z",
    location: "Virtual - Discord",
    attendees: 45
  },
  {
    id: "event-2",
    title: "Research Presentation",
    description: "New findings on lunar surface anomalies",
    date: "2025-04-25T17:00:00Z",
    location: "Virtual - Zoom",
    attendees: 78
  },
  {
    id: "event-3",
    title: "Documentary Screening",
    description: "Exclusive screening of 'Shadows of Doubt' with director Q&A",
    date: "2025-05-05T19:00:00Z",
    location: "Virtual - YouTube Premiere",
    attendees: 156
  }
]

interface ProfileContextType {
  currentUser: UserProfile
  updateProfile: (profile: Partial<UserProfile>) => void
  userPosts: Post[]
  addPost: (post: Omit<Post, "id" | "author" | "createdAt" | "likes" | "comments" | "hasLiked">) => void
  communityMembers: UserProfile[]
  communityPosts: Post[]
  toggleLike: (postId: string) => void
  postComments: Record<string, Comment[]>
  addComment: (postId: string, content: string) => void
  communityGroups: typeof sampleCommunityGroups
  upcomingEvents: typeof sampleEvents
  joinGroup: (groupId: string) => void
  joinEvent: (eventId: string) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser, isLoaded } = useUser();
  const [currentUser, setCurrentUser] = useState<UserProfile>(sampleUser)
  const [userPosts, setUserPosts] = useState<Post[]>(samplePosts)
  const [communityMembers, setCommunityMembers] = useState<UserProfile[]>(sampleCommunityMembers)
  const [communityPosts, setCommunityPosts] = useState<Post[]>([])
  const [postComments, setPostComments] = useState<Record<string, Comment[]>>(sampleComments)
  const [communityGroups, setCommunityGroups] = useState(sampleCommunityGroups)
  const [upcomingEvents, setUpcomingEvents] = useState(sampleEvents)

  // Update current user with Clerk data when available
  useEffect(() => {
    if (isLoaded && clerkUser) {
      // Create a merged profile that preserves existing data but updates with Clerk user info
      setCurrentUser(prevUser => {
        return {
          ...prevUser,
          id: clerkUser.id,
          name: clerkUser.firstName && clerkUser.lastName 
            ? `${clerkUser.firstName} ${clerkUser.lastName}` 
            : clerkUser.firstName || prevUser.name,
          username: clerkUser.username || prevUser.username,
          avatar: clerkUser.imageUrl || prevUser.avatar,
          // We'll keep other profile data as is for now
        };
      });

      // Also update the user's posts with the new profile info
      setUserPosts(prevPosts => 
        prevPosts.map(post => ({
          ...post,
          userId: clerkUser.id,
          author: {
            name: clerkUser.firstName && clerkUser.lastName 
              ? `${clerkUser.firstName} ${clerkUser.lastName}` 
              : clerkUser.firstName || post.author.name,
            username: clerkUser.username || post.author.username,
            avatar: clerkUser.imageUrl || post.author.avatar,
          }
        }))
      );
    }
  }, [isLoaded, clerkUser]);

  // Initialize community posts
  useEffect(() => {
    // Combine user posts with community posts
    setCommunityPosts([...userPosts, ...samplePosts].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ))
  }, [userPosts])

  // Load data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("moonset_user")
    const storedPosts = localStorage.getItem("moonset_posts")
    const storedCommunityMembers = localStorage.getItem("moonset_community_members")
    const storedCommunityPosts = localStorage.getItem("moonset_community_posts")
    const storedComments = localStorage.getItem("moonset_comments")
    const storedGroups = localStorage.getItem("moonset_groups")
    const storedEvents = localStorage.getItem("moonset_events")

    if (storedUser) setCurrentUser(JSON.parse(storedUser))
    if (storedPosts) setUserPosts(JSON.parse(storedPosts))
    if (storedCommunityMembers) setCommunityMembers(JSON.parse(storedCommunityMembers))
    if (storedCommunityPosts) setCommunityPosts(JSON.parse(storedCommunityPosts))
    if (storedComments) setPostComments(JSON.parse(storedComments))
    if (storedGroups) setCommunityGroups(JSON.parse(storedGroups))
    if (storedEvents) setUpcomingEvents(JSON.parse(storedEvents))
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("moonset_user", JSON.stringify(currentUser))
    localStorage.setItem("moonset_posts", JSON.stringify(userPosts))
    localStorage.setItem("moonset_community_members", JSON.stringify(communityMembers))
    localStorage.setItem("moonset_community_posts", JSON.stringify(communityPosts))
    localStorage.setItem("moonset_comments", JSON.stringify(postComments))
    localStorage.setItem("moonset_groups", JSON.stringify(communityGroups))
    localStorage.setItem("moonset_events", JSON.stringify(upcomingEvents))
  }, [currentUser, userPosts, communityMembers, communityPosts, postComments, communityGroups, upcomingEvents])

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

  // Add a comment to a post
  const addComment = (postId: string, content: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      postId,
      userId: currentUser.id,
      author: {
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
      },
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      hasLiked: false,
    }

    // Add to comments
    setPostComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }))

    // Update comment count on post
    const updatePost = (posts: Post[]) =>
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
            }
          : post
      )

    setUserPosts(updatePost)
    setCommunityPosts(updatePost)

    // Add to user activity
    updateProfile({
      activity: [
        {
          id: `act-${Date.now()}`,
          type: "comment",
          description: "Commented on a post",
          date: new Date().toISOString(),
        },
        ...(currentUser.activity || []).slice(0, 9), // Keep last 10 activities
      ],
    })
  }

  // Join a community group
  const joinGroup = (groupId: string) => {
    // In a real app, this would make an API call to join the group
    // For now, we'll just update the UI to show the user has joined
    setCommunityGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              memberCount: group.memberCount + 1,
              hasJoined: true,
            }
          : group
      )
    )

    // Add to user activity
    updateProfile({
      activity: [
        {
          id: `act-${Date.now()}`,
          type: "group",
          description: `Joined ${communityGroups.find((g) => g.id === groupId)?.name}`,
          date: new Date().toISOString(),
        },
        ...(currentUser.activity || []).slice(0, 9),
      ],
    })
  }

  // Join an event
  const joinEvent = (eventId: string) => {
    // In a real app, this would make an API call to join the event
    // For now, we'll just update the UI to show the user has joined
    setUpcomingEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? {
              ...event,
              attendees: event.attendees + 1,
              hasJoined: true,
            }
          : event
      )
    )

    // Add to user activity
    updateProfile({
      activity: [
        {
          id: `act-${Date.now()}`,
          type: "event",
          description: `Registered for ${upcomingEvents.find((e) => e.id === eventId)?.title}`,
          date: new Date().toISOString(),
        },
        ...(currentUser.activity || []).slice(0, 9),
      ],
    })
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
        postComments,
        addComment,
        communityGroups,
        upcomingEvents,
        joinGroup,
        joinEvent,
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
