"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { LogOut, User, Settings, Bell, Wallet } from "lucide-react"
import { useUser, useClerk } from "@clerk/nextjs"
import { useState, useEffect } from "react"

export function UserNav() {
  const router = useRouter()
  const { isSignedIn, user } = useUser()
  const { signOut } = useClerk()
  const [initials, setInitials] = useState("AJ")
  const [fullName, setFullName] = useState("User")
  const [username, setUsername] = useState("@user")

  // Update user data when Clerk user is available
  useEffect(() => {
    if (user) {
      const firstName = user.firstName || ""
      const lastName = user.lastName || ""
      setFullName(firstName && lastName ? `${firstName} ${lastName}` : "User")
      setInitials(
        firstName && lastName 
          ? `${firstName[0]}${lastName[0]}`.toUpperCase() 
          : firstName 
            ? firstName[0].toUpperCase() 
            : "U"
      )
      setUsername(user.username ? `@${user.username}` : user.primaryEmailAddress?.emailAddress || "@user")
    }
  }, [user])

  const handleSignOut = () => {
    signOut(() => {
      router.push("/")
    })
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.imageUrl || "/placeholder-avatar.jpg"} alt={fullName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{fullName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {username}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/dashboard/wallet")}>
              <Wallet className="mr-2 h-4 w-4" />
              <span>Wallet</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 