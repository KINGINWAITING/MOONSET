"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Sample proposals data
const activeProposals = [
  {
    id: "PROP-001",
    title: "Increase Staking Rewards",
    description: "Proposal to increase staking rewards from 5% to 7% APY to incentivize long-term holding.",
    status: "active",
    endDate: "2025-04-20",
    votes: {
      for: 65,
      against: 25,
      abstain: 10,
    },
  },
  {
    id: "PROP-002",
    title: "Community Fund Allocation",
    description: "Allocate 500,000 MOONSET tokens to the community development fund for marketing and outreach.",
    status: "active",
    endDate: "2025-04-25",
    votes: {
      for: 72,
      against: 18,
      abstain: 10,
    },
  },
]

const pastProposals = [
  {
    id: "PROP-000",
    title: "Protocol Upgrade v1.2",
    description: "Implement protocol upgrade to version 1.2 to improve transaction speed and reduce fees.",
    status: "passed",
    endDate: "2025-04-01",
    votes: {
      for: 82,
      against: 12,
      abstain: 6,
    },
  },
]

export default function GovernancePage() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [votingFor, setVotingFor] = useState<string | null>(null)

  const handleVote = (proposalId: string, vote: "for" | "against" | "abstain") => {
    setVotingFor(proposalId)

    // Simulate voting process
    setTimeout(() => {
      setVotingFor(null)
      // In a real app, you would update the proposal state here
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Governance</h1>
      <p className="text-muted-foreground">Participate in the MOONSET governance process by voting on proposals.</p>

      {!walletConnected && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Wallet not connected</AlertTitle>
          <AlertDescription>
            You need to connect your wallet to participate in governance.
            <Button variant="link" className="h-auto p-0 ml-2" onClick={() => setWalletConnected(true)}>
              Connect now
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Proposals</TabsTrigger>
          <TabsTrigger value="past">Past Proposals</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeProposals.map((proposal) => (
            <Card key={proposal.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle>{proposal.title}</CardTitle>
                    <CardDescription>{proposal.id}</CardDescription>
                  </div>
                  <Badge>{proposal.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{proposal.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Voting ends: {proposal.endDate}</span>
                    <span>Quorum: 50%</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>For</span>
                      <span>{proposal.votes.for}%</span>
                    </div>
                    <Progress value={proposal.votes.for} className="h-2 bg-muted" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Against</span>
                      <span>{proposal.votes.against}%</span>
                    </div>
                    <Progress value={proposal.votes.against} className="h-2 bg-muted" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Abstain</span>
                      <span>{proposal.votes.abstain}%</span>
                    </div>
                    <Progress value={proposal.votes.abstain} className="h-2 bg-muted" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleVote(proposal.id, "for")}
                  disabled={!walletConnected || votingFor === proposal.id}
                >
                  {votingFor === proposal.id ? "Voting..." : "Vote For"}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleVote(proposal.id, "against")}
                  disabled={!walletConnected || votingFor === proposal.id}
                >
                  Vote Against
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleVote(proposal.id, "abstain")}
                  disabled={!walletConnected || votingFor === proposal.id}
                >
                  Abstain
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastProposals.map((proposal) => (
            <Card key={proposal.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle>{proposal.title}</CardTitle>
                    <CardDescription>{proposal.id}</CardDescription>
                  </div>
                  <Badge variant={proposal.status === "passed" ? "default" : "destructive"}>{proposal.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{proposal.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Ended: {proposal.endDate}</span>
                    <span>Quorum: Reached</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>For</span>
                      <span>{proposal.votes.for}%</span>
                    </div>
                    <Progress value={proposal.votes.for} className="h-2 bg-muted" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Against</span>
                      <span>{proposal.votes.against}%</span>
                    </div>
                    <Progress value={proposal.votes.against} className="h-2 bg-muted" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Abstain</span>
                      <span>{proposal.votes.abstain}%</span>
                    </div>
                    <Progress value={proposal.votes.abstain} className="h-2 bg-muted" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
