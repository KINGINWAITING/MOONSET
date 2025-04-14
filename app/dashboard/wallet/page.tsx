"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Wallet, AlertCircle, CheckCircle2 } from "lucide-react"

export default function WalletPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [error, setError] = useState("")

  const connectWallet = async () => {
    setIsConnecting(true)
    setError("")

    try {
      // Simulate wallet connection
      // In a real app, you would use a library like ethers.js or web3.js
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock successful connection
      setIsConnected(true)
      setWalletAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F")
    } catch (err) {
      setError("Failed to connect wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress("")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Connect Your Wallet</h1>
      <p className="text-muted-foreground">
        Connect your crypto wallet to access the AI Archive, Research platform, and participate in governance.
      </p>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isConnected && (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>Wallet Connected</AlertTitle>
          <AlertDescription>
            Your wallet is connected successfully. You now have access to all platform features.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Wallet Connection</CardTitle>
            <CardDescription>Connect your wallet to access all features</CardDescription>
          </CardHeader>
          <CardContent>
            {isConnected ? (
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Connected Address</div>
                  <div className="mt-1 break-all text-xs text-muted-foreground">{walletAddress}</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">MOONSET Balance</div>
                  <div className="mt-1 text-xl font-bold">1,250 MOONSET</div>
                </div>
              </div>
            ) : (
              <div className="flex h-[140px] flex-col items-center justify-center rounded-lg border border-dashed p-4">
                <Wallet className="h-10 w-10 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">No wallet connected</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            {isConnected ? (
              <Button variant="outline" className="w-full" onClick={disconnectWallet}>
                Disconnect Wallet
              </Button>
            ) : (
              <Button className="w-full" onClick={connectWallet} disabled={isConnecting}>
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Benefits</CardTitle>
            <CardDescription>What you can do with a connected wallet</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                <span>Access the AI Archive and Research platform</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                <span>Participate in governance by voting on proposals</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                <span>Receive token rewards and airdrops</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                <span>Access premium features and content</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
