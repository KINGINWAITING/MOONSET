"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet } from "lucide-react"
import { useWallet } from "@/lib/wallet"
import { truncateAddress } from "@/lib/utils"

export function WalletStatus() {
  const { isConnected, address, disconnect, walletType } = useWallet()

  if (!isConnected || !address) {
    return null
  }

  return (
    <Card className="border shadow-sm">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Wallet className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Connected Wallet</p>
            <p className="text-xs text-muted-foreground">
              {walletType && <span className="capitalize mr-2">{walletType}</span>}
              {truncateAddress(address)}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={disconnect}>
          Disconnect
        </Button>
      </CardContent>
    </Card>
  )
} 