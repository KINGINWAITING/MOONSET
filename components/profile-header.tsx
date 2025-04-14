"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Pencil, MapPin, Globe, Calendar, Shield, ShieldCheck } from "lucide-react"
import { useProfile } from "@/components/profile-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function ProfileHeader() {
  const { currentUser, updateProfile } = useProfile()
  const [isEditing, setIsEditing] = useState(false)

  const handlePrivacyToggle = () => {
    updateProfile({ isPublic: !currentUser.isPublic })
  }

  return (
    <Card className="overflow-hidden">
      {/* Cover Image */}
      <div className="h-48 w-full relative">
        <img
          src={currentUser.coverImage || "/placeholder.svg?height=400&width=1200&text=Cover+Image"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <Button
          size="sm"
          variant="outline"
          className="absolute top-4 right-4 bg-background/80"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Pencil className="h-4 w-4 mr-2" />
          {isEditing ? "Done" : "Edit Profile"}
        </Button>
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end -mt-12 mb-4">
          <div className="rounded-full border-4 border-background overflow-hidden h-24 w-24">
            <img
              src={currentUser.avatar || "/placeholder.svg?height=200&width=200"}
              alt={currentUser.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{currentUser.name}</h1>
            <p className="text-muted-foreground">@{currentUser.username}</p>
          </div>

          <div className="flex items-center gap-2">
            {currentUser.isPublic ? (
              <div className="flex items-center text-green-500">
                <ShieldCheck className="h-4 w-4 mr-1" />
                <span className="text-sm">Public Profile</span>
              </div>
            ) : (
              <div className="flex items-center text-muted-foreground">
                <Shield className="h-4 w-4 mr-1" />
                <span className="text-sm">Private Profile</span>
              </div>
            )}

            {isEditing && (
              <div className="flex items-center gap-2 ml-4">
                <Switch id="profile-visibility" checked={currentUser.isPublic} onCheckedChange={handlePrivacyToggle} />
                <Label htmlFor="profile-visibility">Make Public</Label>
              </div>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <textarea
              className="w-full p-2 border rounded-md"
              value={currentUser.bio}
              onChange={(e) => updateProfile({ bio: e.target.value })}
              rows={3}
              placeholder="Tell us about yourself..."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="flex items-center border rounded-md mt-1">
                  <MapPin className="h-4 w-4 mx-2 text-muted-foreground" />
                  <input
                    id="location"
                    className="flex-1 p-2 bg-transparent outline-none"
                    value={currentUser.location}
                    onChange={(e) => updateProfile({ location: e.target.value })}
                    placeholder="Your location"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <div className="flex items-center border rounded-md mt-1">
                  <Globe className="h-4 w-4 mx-2 text-muted-foreground" />
                  <input
                    id="website"
                    className="flex-1 p-2 bg-transparent outline-none"
                    value={currentUser.website}
                    onChange={(e) => updateProfile({ website: e.target.value })}
                    placeholder="Your website"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="mb-4">{currentUser.bio}</p>
            <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground">
              {currentUser.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{currentUser.location}</span>
                </div>
              )}
              {currentUser.website && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  <a href={currentUser.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {currentUser.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Joined {currentUser.joinedDate}</span>
              </div>
            </div>
          </>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6 text-center">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/5 rounded-md p-3 border border-primary/10">
            <div className="text-xl font-bold">{currentUser.researchContributions}</div>
            <div className="text-xs text-muted-foreground">Research Contributions</div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/5 rounded-md p-3 border border-primary/10">
            <div className="text-xl font-bold">{currentUser.proposalsVoted}</div>
            <div className="text-xs text-muted-foreground">Proposals Voted</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
