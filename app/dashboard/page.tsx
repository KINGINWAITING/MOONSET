"use client"

import { TokenStats } from "@/components/token-stats"
import { useWallet } from "@/lib/wallet"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  const { isConnected, error } = useWallet()
  
  return (
    <div className="w-full h-full flex flex-col space-y-6 relative">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-4">
            {error && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">{error}</AlertDescription>
              </Alert>
            )}
            {isConnected && (
              <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900 py-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-sm">Wallet Connected</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
        <div className="h-px bg-border" />
      </div>
      <TokenStats />
    </div>
  )
}
