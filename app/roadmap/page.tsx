import { NavLink } from "@/components/nav-link"
import { MainNav } from "@/components/main-nav"
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"

// Roadmap data based on the whitepaper
const roadmapPhases = [
  {
    title: "Phase 1: Genesis and Token Launch (Q2 2025)",
    description: "Establishing the foundation for the LunaLie ecosystem",
    milestones: [
      { text: "Finalization and audit of the MOONSET smart contract on the Ethereum blockchain", completed: false },
      { text: "Launch of the official LunaLie website and social media channels", completed: true },
      { text: "Execution of the community airdrop and Initial DEX Offering (IDO) for MOONSET", completed: false },
      { text: "Establishment of core community communication channels and governance framework", completed: false },
    ],
  },
  {
    title: "Phase 2: Community Building and Ecosystem Development (Q3-Q4 2025)",
    description: "Building the core features of the LunaLie ecosystem",
    milestones: [
      { text: "Implementation of the initial community governance mechanisms", completed: false },
      { text: "Launch of the MOONSET staking program", completed: false },
      { text: "Establishment of the community-controlled research and development fund", completed: false },
      { text: "Initiation of the content creator reward program", completed: false },
      { text: "Development of the initial framework for the decentralized lunar truth archive", completed: false },
    ],
  },
  {
    title: "Phase 3: Expansion and Awareness (Q1-Q2 2026)",
    description: "Growing the ecosystem and raising global awareness",
    milestones: [
      {
        text: "Funding of initial research projects and content creation initiatives through community governance",
        completed: false,
      },
      {
        text: "Development and launch of the first version of the decentralized lunar truth archive",
        completed: false,
      },
      { text: "Targeted marketing and outreach campaigns to raise global awareness", completed: false },
      { text: "Exploration of partnerships with relevant individuals and organizations", completed: false },
    ],
  },
  {
    title: "Phase 4: Long-Term Sustainability and Impact (Ongoing)",
    description: "Ensuring the long-term success and impact of the LunaLie mission",
    milestones: [
      {
        text: "Continuous development and enhancement of the LunaLie ecosystem based on community feedback",
        completed: false,
      },
      { text: "Fostering the growth and expansion of the decentralized lunar truth archive", completed: false },
      { text: "Supporting ongoing research and content creation efforts", completed: false },
      {
        text: "Striving to achieve mainstream recognition and initiate a global dialogue about the authenticity of the moon landing",
        completed: false,
      },
    ],
  },
  {
    title: "Go-to-Market Strategy",
    description: "Strategic approach for sustainable truth dissemination",
    milestones: [
      {
        text: "Technical Fortification & Transparency: Finalizing and auditing the MOONSET ERC-20 smart contract",
        completed: false,
      },
      { text: "Core Community Cultivation: Establishing and nurturing communication channels", completed: true },
      { text: "Initial DEX Offering (IDO): Launch on a reputable Decentralized Exchange", completed: false },
      { text: "The JRE Appearance: Leveraging the Joe Rogan Experience for mass awareness", completed: false },
      { text: "Community Nurturing: Implementing robust engagement strategies post-launch", completed: false },
    ],
  },
]

export default function RoadmapPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">Charting the Course Towards Lunar Truth</h1>
            <p className="text-muted-foreground">Our development plan and strategic milestones</p>
          </div>
        </div>

        <div className="space-y-8">
          {roadmapPhases.map((phase, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{phase.title}</CardTitle>
                <CardDescription>{phase.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {phase.milestones.map((milestone, mIndex) => (
                    <li key={mIndex} className="flex items-start gap-3">
                      {milestone.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                      )}
                      <span className={milestone.completed ? "text-foreground" : "text-muted-foreground"}>
                        {milestone.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
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
