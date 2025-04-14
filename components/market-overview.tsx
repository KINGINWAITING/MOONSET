"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample market data - in a real app, this would come from your API
const marketData = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: "$43,567.89",
    change: "+2.34%",
    marketCap: "$834.5B",
    isPositive: true,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: "$2,345.67",
    change: "+1.23%",
    marketCap: "$281.2B",
    isPositive: true,
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    price: "$312.45",
    change: "-0.45%",
    marketCap: "$48.3B",
    isPositive: false,
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: "$98.76",
    change: "+5.67%",
    marketCap: "$39.1B",
    isPositive: true,
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: "$0.54",
    change: "-1.23%",
    marketCap: "$19.2B",
    isPositive: false,
  },
  {
    name: "MOONSET",
    symbol: "MOON",
    price: "$0.0055",
    change: "+12.24%",
    marketCap: "$5.5M",
    isPositive: true,
  },
]

export function MarketOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>24h Change</TableHead>
              <TableHead className="hidden md:table-cell">Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marketData.map((coin) => (
              <TableRow key={coin.symbol} className={coin.symbol === "MOON" ? "bg-muted/50" : ""}>
                <TableCell className="font-medium">
                  {coin.name}
                  <span className="ml-2 text-muted-foreground">{coin.symbol}</span>
                </TableCell>
                <TableCell>{coin.price}</TableCell>
                <TableCell className={coin.isPositive ? "text-green-500" : "text-red-500"}>{coin.change}</TableCell>
                <TableCell className="hidden md:table-cell">{coin.marketCap}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
