"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PriceChart } from "@/components/price-chart"
import { TokenStats } from "@/components/token-stats"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="w-full h-full flex flex-col space-y-6 relative">
      <div className="flex flex-col space-y-4">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle>MOONSET Token</CardTitle>
            <CardDescription>Current price and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <PriceChart />
          </CardContent>
        </Card>
      </div>

      <TokenStats />

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>AI Research Platform</CardTitle>
            <CardDescription>Access our AI-powered lunar truth research platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Use our advanced AI tools to analyze evidence, generate reports, and contribute to the lunar truth
              archive.
            </p>
            <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <a href="/dashboard/research">
                Access Platform <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Governance</CardTitle>
            <CardDescription>Participate in MOONSET community governance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Vote on proposals, submit new ideas, and help shape the future of the MOONSET project.
            </p>
            <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <a href="/dashboard/governance">
                View Proposals <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Moon image with zoom on hover effect */}
      <div className="w-full h-[150px] sm:h-[187px] md:h-[225px] mt-8 overflow-hidden relative rounded-xl shadow-2xl group cursor-pointer">
        {/* Main image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-in-out group-hover:scale-125"
          style={{ 
            backgroundImage: 'url("/moon.png")',
            backgroundPosition: 'center center'
          }}
        />
        
        {/* Blue overlay */}
        <div className="absolute inset-0 bg-blue-600/20 z-10 pointer-events-none"></div>
        
        {/* Glossy highlight effect - top light reflection */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent z-20 h-1/3 pointer-events-none"></div>
        
        {/* Bottom shadow for depth */}
        <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-black/30 to-transparent z-20 pointer-events-none"></div>
        
        {/* Edge highlight for 3D effect */}
        <div className="absolute inset-0 rounded-xl border border-white/20 z-30 pointer-events-none shadow-inner"></div>
      </div>
    </div>
  )
}
