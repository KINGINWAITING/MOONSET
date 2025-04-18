"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PriceChart } from "@/components/price-chart"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Coins, 
  ArrowUpRight, 
  ArrowDownRight,
  BarChart3,
  Wallet,
  Activity,
  ArrowRight
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { WalletConnectModal } from "@/components/wallet-connect-modal"
import { useWallet } from "@/lib/wallet"

interface TokenMetric {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  description: string
}

const initialMetrics: TokenMetric[] = [
  {
    title: "Market Cap",
    value: "$5.5M",
    change: 20.1,
    icon: <DollarSign className="h-4 w-4" />,
    description: "Total value of all MOONSET tokens in circulation"
  },
  {
    title: "24h Volume",
    value: "$1.2M",
    change: 15.0,
    icon: <Activity className="h-4 w-4" />,
    description: "Total trading volume in the last 24 hours"
  },
  {
    title: "Circulating Supply",
    value: "1B MOONSET",
    icon: <Coins className="h-4 w-4" />,
    change: 0,
    description: "Number of MOONSET tokens currently in circulation"
  },
  {
    title: "Holders",
    value: "12,234",
    change: 23.7,
    icon: <Users className="h-4 w-4" />,
    description: "Number of unique wallet addresses holding MOONSET"
  }
]

export function TokenStats() {
  const [activeTimeframe, setActiveTimeframe] = useState("1D")
  const [metrics, setMetrics] = useState<TokenMetric[]>(initialMetrics)
  const { connect, isConnecting, isConnected } = useWallet()

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.title === "Market Cap" 
          ? `$${(5.5 + Math.random() * 0.5).toFixed(1)}M`
          : metric.title === "24h Volume"
          ? `$${(1.2 + Math.random() * 0.3).toFixed(1)}M`
          : metric.title === "Holders"
          ? `${Math.floor(12234 + Math.random() * 100)}`
          : metric.value,
        change: metric.title === "Circulating Supply" 
          ? 0 
          : metric.change + (Math.random() * 2 - 1)
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Token Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time metrics and analytics for the MOONSET token
          </p>
        </div>
        <div className="flex gap-2">
          <WalletConnectModal onConnect={connect} isConnecting={isConnecting}>
            <Button 
              variant={isConnected ? "outline" : "default"} 
              size="sm"
              className="flex items-center gap-2"
            >
              <Wallet className="h-4 w-4" />
              {isConnected ? "Connected" : "Connect Wallet"}
            </Button>
          </WalletConnectModal>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 border-blue-500/20 hover:border-blue-500/30 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  {metric.icon}
                  {metric.title}
                </CardTitle>
                {metric.change !== 0 && (
                  <div className={cn(
                    "flex items-center text-xs font-medium",
                    metric.change > 0 ? "text-green-500" : "text-red-500"
                  )}>
                    {metric.change > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {Math.abs(metric.change).toFixed(1)}%
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Price Chart Section */}
      <Card className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 border-blue-500/20">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Price Chart</CardTitle>
              <CardDescription>
                MOONSET/USD price history and trading volume
              </CardDescription>
            </div>
            <Tabs value={activeTimeframe} onValueChange={setActiveTimeframe} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="1D">1D</TabsTrigger>
                <TabsTrigger value="1W">1W</TabsTrigger>
                <TabsTrigger value="1M">1M</TabsTrigger>
                <TabsTrigger value="1Y">1Y</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <PriceChart timeframe={activeTimeframe} />
        </CardContent>
      </Card>

      {/* Additional Stats Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Recent Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium">24h High</p>
                <p className="text-2xl font-bold">$0.0056</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-sm font-medium">24h Low</p>
                <p className="text-2xl font-bold">$0.0048</p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">All Time High</p>
                <p className="text-2xl font-bold">$0.0089</p>
                <p className="text-xs text-muted-foreground">May 15, 2024</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-sm font-medium">All Time Low</p>
                <p className="text-2xl font-bold">$0.0012</p>
                <p className="text-xs text-muted-foreground">Jan 3, 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Market Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium">Total Supply</p>
                <p className="text-2xl font-bold">2B MOONSET</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-sm font-medium">Burned</p>
                <p className="text-2xl font-bold">500M MOONSET</p>
              </div>
            </div>
            <div className="pt-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Market Dominance</p>
                <p className="text-sm font-medium">0.02%</p>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "0.02%" }} />
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Full Analytics
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
