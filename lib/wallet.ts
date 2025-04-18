"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ethers } from 'ethers'
import { MOONSET_TOKEN_ABI } from '@/lib/contracts'

// Add type declarations for window.ethereum and other wallet providers
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (params: any) => void) => void;
      removeListener: (event: string, callback: (params: any) => void) => void;
    };
    coinbaseWalletExtension?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
    };
    opera?: {
      ethereum?: {
        request: (args: { method: string; params?: any[] }) => Promise<any>;
      };
    };
  }
}

interface WalletState {
  isConnected: boolean
  isConnecting: boolean
  address: string | null
  walletType: string | null
  balance: string | null
  provider: ethers.BrowserProvider | null
  
  connect: (walletType: string) => Promise<void>
  disconnect: () => void
  setBalance: (balance: string) => void
  getBalance: () => Promise<void>
}

const MOONSET_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS || '0x...' // Replace with actual token address

export const useWallet = create<WalletState>()(
  persist(
    (set, get) => ({
      isConnected: false,
      isConnecting: false,
      address: null,
      walletType: null,
      balance: null,
      provider: null,
      
      connect: async (walletType: string) => {
        try {
          set({ isConnecting: true })
          
          let provider: ethers.BrowserProvider | null = null
          
          switch (walletType) {
            case 'metamask':
              if (!window.ethereum) {
                throw new Error('MetaMask not found')
              }
              provider = new ethers.BrowserProvider(window.ethereum)
              break
              
            case 'coinbase':
              if (!window.coinbaseWalletExtension) {
                throw new Error('Coinbase Wallet not found')
              }
              provider = new ethers.BrowserProvider(window.coinbaseWalletExtension)
              break
              
            case 'opera':
              if (!window.opera?.ethereum) {
                throw new Error('Opera Wallet not found')
              }
              provider = new ethers.BrowserProvider(window.opera.ethereum)
              break
              
            case 'walletconnect':
              throw new Error('WalletConnect integration coming soon')
              
            case 'fortmatic':
              throw new Error('Fortmatic integration coming soon')
              
            default:
              throw new Error('Unsupported wallet type')
          }
          
          if (!provider) {
            throw new Error('Failed to initialize wallet provider')
          }
          
          try {
            const accounts = await provider.send('eth_requestAccounts', [])
            
            if (!accounts || accounts.length === 0) {
              throw new Error('No accounts found')
            }

            const address = accounts[0]
            
            set({ 
              isConnected: true, 
              isConnecting: false,
              address,
              walletType,
              provider
            })

            // Get initial balance
            get().getBalance()
            
            return Promise.resolve()
          } catch (error) {
            if (error instanceof Error && 
                (error.message.includes('user denied') || 
                 error.message.includes('ethers-user-denied') ||
                 error.message.includes('ACTION_REJECTED'))) {
              throw new Error('Connection request was rejected')
            }
            throw error
          }
        } catch (error) {
          set({ isConnecting: false })
          throw error
        }
      },
      
      disconnect: () => {
        set({ 
          isConnected: false,
          address: null,
          walletType: null,
          balance: null,
          provider: null
        })
      },
      
      setBalance: (balance: string) => {
        set({ balance })
      },

      getBalance: async () => {
        const { provider, address } = get()
        if (!provider || !address) return

        try {
          const contract = new ethers.Contract(
            MOONSET_TOKEN_ADDRESS,
            MOONSET_TOKEN_ABI,
            provider
          )
          
          const balance = await contract.balanceOf(address)
          const formattedBalance = ethers.formatUnits(balance, 18) // Assuming 18 decimals
          
          set({ balance: formattedBalance })
        } catch (error) {
          console.error('Error fetching balance:', error)
        }
      }
    }),
    {
      name: 'wallet-storage',
      partialize: (state) => ({
        isConnected: state.isConnected,
        address: state.address,
        walletType: state.walletType,
      })
    }
  )
) 