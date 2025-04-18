"use client"

import { useState, useCallback, createContext, useContext } from "react"

interface WalletContextType {
  address: string | null
  isConnected: boolean
  isConnecting: boolean
  connect: (walletId: string) => void
  disconnect: () => void
  error: string | null
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connect = useCallback(async (walletId: string) => {
    setIsConnecting(true)
    setError(null)

    try {
      // Simulate wallet connection with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Mock address for demonstration - in a real app, this would come from the wallet
      const mockAddress = `0x${Array.from({ length: 40 }, () => 
        Math.floor(Math.random() * 16).toString(16)).join('')}`
      
      setAddress(mockAddress)
      localStorage.setItem('walletConnected', 'true')
      localStorage.setItem('walletAddress', mockAddress)
    } catch (err) {
      console.error("Failed to connect wallet:", err)
      setError("Failed to connect wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setAddress(null)
    localStorage.removeItem('walletConnected')
    localStorage.removeItem('walletAddress')
  }, [])

  return (
    <WalletContext.Provider value={{
      address,
      isConnected: !!address,
      isConnecting,
      connect,
      disconnect,
      error
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  
  return context
} 