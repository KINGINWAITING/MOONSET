"use client"

import { NavLink } from "@/components/nav-link"
import { Button } from "@/components/ui/button"
import { LogOut, User, LogIn, UserPlus } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useUser, UserButton, SignInButton, SignUpButton, useClerk } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuthTransition } from "@/app/auth-transition"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const { isSignedIn, user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { startTransition } = useAuthTransition()

  const handleSignOut = () => {
    setIsSigningOut(true)
    startTransition()
    
    // Navigate to dedicated sign-out page for cleaner transition
    router.push("/sign-out")
  }

  return (
    <nav className={`flex items-center gap-4 ${className}`}>
      <NavLink href="/whitepaper" className="text-sm font-medium hover:underline underline-offset-4">
        Whitepaper
      </NavLink>
      <NavLink href="/team" className="text-sm font-medium hover:underline underline-offset-4">
        Team
      </NavLink>
      <NavLink href="/roadmap" className="text-sm font-medium hover:underline underline-offset-4">
        Roadmap
      </NavLink>
      
      {isLoaded && isSignedIn && (
        <NavLink href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
          Dashboard
        </NavLink>
      )}
      
      <div className="ml-auto flex items-center gap-3">
        <ThemeToggle />
        
        {isLoaded && isSignedIn ? (
          <div className="flex items-center gap-2">
            <Button 
              variant="outline"
              asChild
              className="gap-2"
            >
              <NavLink href="/dashboard/profile">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">Profile</span>
              </NavLink>
            </Button>
            
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
            </Button>
            
            <UserButton 
              afterSignOutUrl="/sign-out"
              appearance={{
                baseTheme: dark,
                elements: {
                  userButtonAvatarBox: "h-8 w-8",
                  userButtonTrigger: "border border-border rounded-full hover:bg-accent focus:ring-blue-500 focus:ring-2",
                  userButtonPopoverCard: "bg-background border border-border shadow-lg rounded-xl overflow-hidden",
                  userButtonPopoverFooter: "border-t border-border",
                  userButtonPopoverActionButton: "text-sm text-foreground hover:bg-accent",
                  userButtonPopoverActionButtonText: "text-sm font-medium",
                  userButtonPopoverActionButtonIcon: "text-muted-foreground"
                }
              }}
            />
          </div>
        ) : (
          <>
            <SignInButton mode="modal" afterSignInUrl="/dashboard">
              <Button variant="outline" className="gap-2">
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </SignInButton>
            <SignUpButton mode="modal" afterSignInUrl="/dashboard" afterSignUpUrl="/dashboard">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white gap-2">
                <UserPlus className="h-4 w-4" />
                <span>Sign Up</span>
              </Button>
            </SignUpButton>
          </>
        )}
      </div>
    </nav>
  )
}
