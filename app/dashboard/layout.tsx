"use client"

import type React from "react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    // If not logged in, redirect to home
    if (!loggedIn) {
      router.push("/")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/")
  }

  // Don't render the dashboard if not logged in
  if (!isLoggedIn) {
    return null
  }

  return (
    <ProfileProvider>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar variant="floating" className="animate-gradient backdrop-blur-md bg-gradient-to-br from-blue-900/80 via-blue-800/80 to-red-800/60 background-animate border-none">
            <SidebarHeader>
              <div className="flex items-center gap-2 px-4 py-4">
                <div className="w-10 h-10 rounded-full white-glow flex items-center justify-center text-white">
                  <span className="text-xl font-bold">M</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 font-bold text-xl">MOONSET</span>
                  <span className="text-xs text-white/70">Truth Seekers Platform</span>
                </div>
              </div>
              <div className="white-divider mx-4"></div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel className="text-white/80 font-medium">Dashboard</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard"}
                        className="text-white hover:bg-white/15 data-[active=true]:bg-white/25 data-[active=true]:backdrop-blur-md"
                      >
                        <a href="/dashboard">
                          <BarChart3 className="h-4 w-4" />
                          <span>Token Stats</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard/wallet"}
                        className="text-white hover:bg-white/15 data-[active=true]:bg-white/25 data-[active=true]:backdrop-blur-md"
                      >
                        <a href="/dashboard/wallet">
                          <Wallet className="h-4 w-4" />
                          <span>Connect Wallet</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <div className="white-divider mx-4"></div>
              <SidebarGroup>
                <SidebarGroupLabel className="text-white/80 font-medium">Platform</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard/research"}
                        className="text-white hover:bg-white/15 data-[active=true]:bg-white/25 data-[active=true]:backdrop-blur-md"
                      >
                        <a href="/dashboard/research">
                          <FileText className="h-4 w-4" />
                          <span>AI Research Platform</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard/governance"}
                        className="text-white hover:bg-white/15 data-[active=true]:bg-white/25 data-[active=true]:backdrop-blur-md"
                      >
                        <a href="/dashboard/governance">
                          <Vote className="h-4 w-4" />
                          <span>Governance</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <div className="white-divider mx-4"></div>
              <SidebarGroup>
                <SidebarGroupLabel className="text-white/80 font-medium">Social</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard/profile"}
                        className="text-white hover:bg-white/15 data-[active=true]:bg-white/25 data-[active=true]:backdrop-blur-md"
                      >
                        <a href="/dashboard/profile">
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard/community"}
                        className="text-white hover:bg-white/15 data-[active=true]:bg-white/25 data-[active=true]:backdrop-blur-md"
                      >
                        <a href="/dashboard/community">
                          <Users className="h-4 w-4" />
                          <span>Community</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <div className="white-divider mx-4"></div>
              <SidebarGroup>
                <SidebarGroupLabel className="text-white/80 font-medium">Website</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="text-white hover:bg-white/15">
                        <a href="/">
                          <Home className="h-4 w-4" />
                          <span>Home</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="text-white hover:bg-white/15">
                        <a href="/whitepaper">
                          <FileText className="h-4 w-4" />
                          <span>Whitepaper</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="text-white hover:bg-white/15">
                        <a href="/team">
                          <Users className="h-4 w-4" />
                          <span>Team</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="text-white hover:bg-white/15">
                        <a href="/roadmap">
                          <Milestone className="h-4 w-4" />
                          <span>Roadmap</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <div className="white-divider mx-4"></div>
              <SidebarGroup>
                <SidebarGroupLabel className="text-white/80 font-medium">Account</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard/settings"}
                        className="text-white hover:bg-white/15 data-[active=true]:bg-white/25 data-[active=true]:backdrop-blur-md"
                      >
                        <a href="/dashboard/settings">
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <div className="px-3 py-4">
                <div className="mb-4 p-3 rounded-md bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 overflow-hidden">
                      <img
                        src="/placeholder.svg?height=32&width=32&text=AJ"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Alex Johnson</div>
                      <div className="text-xs text-white/70">@alexj</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <ThemeToggle variant="sidebar" />
                  <div className="text-xs text-white/70">Toggle Theme</div>
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white/90"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <div className="flex h-16 items-center gap-4 border-b px-6 animate-gradient bg-gradient-to-br from-blue-900/50 via-blue-800/50 to-red-800/30 background-animate">
              <SidebarTrigger className="text-primary" />
              <div className="flex-1">
                <h1 className="text-lg font-semibold">MOONSET Dashboard</h1>
              </div>
            </div>
            <div className="flex-1 p-6 animate-gradient bg-gradient-to-br from-blue-900/20 via-blue-800/20 to-red-800/10 background-animate">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ProfileProvider>
  )
}
