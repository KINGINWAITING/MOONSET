export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  date: string
}

export interface Activity {
  id: string
  type: string
  description: string
  date: string
}

export interface UserProfile {
  id: string
  name: string
  username: string
  bio: string
  avatar: string
  coverImage: string
  location: string
  website: string
  joinedDate: string
  isPublic: boolean
  moonsetBalance: number
  researchContributions: number
  proposalsVoted: number
  achievements?: Achievement[]
  activity?: Activity[]
}

export interface Post {
  id: string
  userId: string
  author: {
    name: string
    username: string
    avatar: string
  }
  content: string
  media?: {
    type: "image" | "video" | "file"
    url: string
    filename?: string
    filesize?: string
  }[]
  createdAt: string
  likes: number
  comments: number
  hasLiked?: boolean
}

export interface Comment {
  id: string
  postId: string
  userId: string
  author: {
    name: string
    username: string
    avatar: string
  }
  content: string
  createdAt: string
  likes: number
  hasLiked?: boolean
}
