"use client"

import { useState, ReactNode } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface WalletOption {
  name: string
  icon: string
  id: string
}

const walletOptions: WalletOption[] = [
  {
    name: "MetaMask",
    icon: "/images/metamask.png",
    id: "metamask",
  },
  {
    name: "Coinbase Wallet",
    icon: "/images/coinbase.png",
    id: "coinbase",
  },
  {
    name: "WalletConnect",
    icon: "/images/walletconnect.png",
    id: "walletconnect",
  },
  {
    name: "Fortmatic",
    icon: "/images/fortmatic.png",
    id: "fortmatic",
  },
  {
    name: "Opera Wallet",
    icon: "/images/opera.png",
    id: "opera",
  },
]

interface WalletConnectModalProps {
  onConnect: (walletId: string) => void
  isConnecting: boolean
  children: ReactNode
}

export function WalletConnectModal({ onConnect, isConnecting, children }: WalletConnectModalProps) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const handleConnect = async (walletId: string) => {
    try {
      setError(null)
      setSelectedWallet(walletId)
      await onConnect(walletId)
      setOpen(false)
    } catch (error) {
      if (error instanceof Error) {
        // Handle specific wallet errors
        if (error.message.includes('not found')) {
          setError(`Please install ${walletOptions.find(w => w.id === walletId)?.name} to continue.`)
        } else if (error.message.includes('rejected')) {
          setError('Connection request was rejected. Please try again.')
        } else if (error.message.includes('coming soon')) {
          setError('This wallet integration is coming soon. Please try another wallet.')
        } else {
          setError(error.message)
        }
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (!isOpen) {
        setError(null)
        setSelectedWallet(null)
      }
    }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Choose a wallet to connect to MOONSET platform
          </DialogDescription>
        </DialogHeader>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="grid gap-4 py-4">
          {walletOptions.map((wallet) => (
            <Button
              key={wallet.id}
              variant="outline"
              className="flex items-center justify-start gap-3 h-14"
              onClick={() => handleConnect(wallet.id)}
              disabled={isConnecting && selectedWallet === wallet.id}
            >
              <div className="w-6 h-6 relative rounded-lg overflow-hidden">
                <Image
                  src={wallet.icon}
                  alt={wallet.name}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <span>{wallet.name}</span>
              {isConnecting && selectedWallet === wallet.id && (
                <div className="ml-auto h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              )}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
} 