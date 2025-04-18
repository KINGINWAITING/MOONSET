"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { 
  BarChart3, 
  FileText, 
  Vote, 
  Users, 
  User, 
  Settings, 
  Home 
} from "lucide-react"
import { useEffect } from "react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  disabled?: boolean
}

const items: { title: string; items: NavItem[] }[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Token Stats",
        href: "/dashboard",
        icon: <BarChart3 className="mr-2 h-4 w-4" />,
      },
    ],
  },
  {
    title: "Platform",
    items: [
      {
        title: "AI Research Platform",
        href: "/dashboard/research",
        icon: <FileText className="mr-2 h-4 w-4" />,
      },
      {
        title: "Governance",
        href: "/dashboard/governance",
        icon: <Vote className="mr-2 h-4 w-4" />,
      },
    ],
  },
  {
    title: "Social",
    items: [
      {
        title: "Profile",
        href: "/dashboard/profile",
        icon: <User className="mr-2 h-4 w-4" />,
      },
      {
        title: "Community",
        href: "/dashboard/community",
        icon: <Users className="mr-2 h-4 w-4" />,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: <Settings className="mr-2 h-4 w-4" />,
      },
      {
        title: "Back to Home",
        href: "/",
        icon: <Home className="mr-2 h-4 w-4" />,
      },
    ],
  },
]

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()

  // Prefetch all dashboard routes
  useEffect(() => {
    items.forEach(section => {
      section.items.forEach(item => {
        router.prefetch(item.href)
      })
    })
  }, [router])

  return (
    <nav className="grid items-start gap-2">
      {items.map((section, i) => (
        <div key={i} className="mb-4">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            {section.title}
          </h2>
          {section.items.map((item, j) => (
            <Link
              key={j}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
          {i < items.length - 1 && (
            <div className="my-3 h-px bg-border" />
          )}
        </div>
      ))}
    </nav>
  )
} 