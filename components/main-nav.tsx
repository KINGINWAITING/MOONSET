"use client"

import { useState, useEffect } from "react"
import { NavLink } from "@/components/nav-link"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
    router.push("/")
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
      <NavLink href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
        Dashboard
      </NavLink>
      
      <div className="ml-auto flex items-center gap-4">
        <ThemeToggle />
        
        {isLoggedIn ? (
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2 border-secondary text-secondary hover:bg-secondary/10"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        ) : (
          <>
            <Button variant="outline" asChild>
              <NavLink href="/login">Login</NavLink>
            </Button>
            <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <NavLink href="/signup">Sign Up</NavLink>
            </Button>
          </>
        )}
      </div>
    </nav>
  )
}
