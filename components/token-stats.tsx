"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TokenStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800/30 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Market Cap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-950 dark:text-white">$5.5M</div>
          <p className="text-xs text-blue-600 dark:text-blue-400">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800/30 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">24h Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-950 dark:text-white">$1.2M</div>
          <p className="text-xs text-blue-600 dark:text-blue-400">+15% from yesterday</p>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800/30 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Circulating Supply</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-950 dark:text-white">1B MOONSET</div>
          <p className="text-xs text-blue-600 dark:text-blue-400">50% of total supply</p>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800/30 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Holders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-950 dark:text-white">12,234</div>
          <p className="text-xs text-blue-600 dark:text-blue-400">+2,345 from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}
