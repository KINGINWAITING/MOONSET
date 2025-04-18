"use client"

import type React from "react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { BarChart3, Wallet, FileText, Vote, User, Settings, LogOut, Home, Users, Milestone } from "lucide-react"
import { ProfileProvider } from "@/components/profile-context"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { DashboardNav } from "@/components/dashboard-nav"
import { Logo } from "@/components/logo"
import { MainNav } from "@/components/main-nav"
import { useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { isLoaded, isSignedIn } = useUser()

  // Prefetch common routes
  useEffect(() => {
    const routes = [
      '/dashboard',
      '/dashboard/profile',
      '/dashboard/community',
      '/dashboard/research',
      '/dashboard/governance',
      '/dashboard/wallet',
      '/dashboard/settings',
    ]
    
    routes.forEach(route => {
      router.prefetch(route)
    })
  }, [router])

  // Show loading state while Clerk loads
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return redirect("/sign-in?redirect_url=" + encodeURIComponent(pathname || "/dashboard"))
  }

  return (
    <ProfileProvider>
      <div className="flex h-screen flex-col bg-gradient-to-br from-background to-muted/20">
        <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center">
            <Logo />
            <div className="flex-1 px-6">
              <MainNav />
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Consistent Vertical Sidebar */}
          <aside className="w-64 flex-shrink-0 border-r border-border/50 bg-background/50 p-4 overflow-y-auto backdrop-blur-sm">
            <DashboardNav />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-8 pt-6">
            {children}
          </main>
        </div>
      </div>
    </ProfileProvider>
  )
}
