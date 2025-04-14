import { NavLink } from "@/components/nav-link"
import { MainNav } from "@/components/main-nav"
import { ArrowLeft, Github, Linkedin, Twitter } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"

// Sample team data based on the whitepaper's team description
const teamMembers = [
  {
    name: "Dr. James Wilson",
    role: "Lead Investigative Researcher",
    bio: "With over 30 years dedicated to uncovering the truth about the moon landing, Dr. Wilson has authored multiple books and documentaries examining the photographic and technical anomalies in NASA's official narrative.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Sarah Johnson",
    role: "Documentary Filmmaker",
    bio: "Award-winning documentary filmmaker with expertise in visual analysis. Sarah has produced several influential documentaries examining the inconsistencies in the moon landing footage.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Michael Chen",
    role: "Blockchain Architect",
    bio: "Blockchain expert with extensive experience in Ethereum smart contract development and decentralized applications. Michael leads the technical implementation of the MOONSET token and ecosystem.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Emily Rodriguez",
    role: "Community Manager",
    bio: "Experienced community builder with a background in online community management and social media strategy. Emily is dedicated to fostering a vibrant and engaged LunaLie community.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Dr. Robert Thompson",
    role: "Technical Analysis Specialist",
    bio: "Former aerospace engineer with a Ph.D. in Physics. Dr. Thompson specializes in analyzing the technical feasibility of the Apollo missions, particularly focusing on radiation exposure and propulsion systems.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Alexandra Kim",
    role: "Marketing Director",
    bio: "Strategic marketing professional with expertise in cryptocurrency and blockchain projects. Alexandra leads LunaLie's global outreach and awareness campaigns.",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
]

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Logo href="/" />
          <MainNav />
        </div>
      </header>
      <main className="flex-1 container py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <NavLink
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Home
            </NavLink>
            <h1 className="text-3xl font-bold tracking-tight">A Collective of Dedicated Truth-Seekers</h1>
            <p className="text-muted-foreground">
              Meet the passionate team behind LunaLie with decades of commitment to uncovering the truth
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
              <CardFooter className="flex justify-start gap-4">
                <NavLink href={member.social.twitter} className="text-muted-foreground hover:text-foreground">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </NavLink>
                <NavLink href={member.social.linkedin} className="text-muted-foreground hover:text-foreground">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </NavLink>
                <NavLink href={member.social.github} className="text-muted-foreground hover:text-foreground">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </NavLink>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MOONSET. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <NavLink href="/terms" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Terms
            </NavLink>
            <NavLink href="/privacy" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Privacy
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  )
}
