"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Area } from "recharts"

// Sample data - in a real app, this would come from your API
const data = [
  { date: "Jan", price: 0.0012 },
  { date: "Feb", price: 0.0018 },
  { date: "Mar", price: 0.0015 },
  { date: "Apr", price: 0.0025 },
  { date: "May", price: 0.0022 },
  { date: "Jun", price: 0.003 },
  { date: "Jul", price: 0.004 },
  { date: "Aug", price: 0.0038 },
  { date: "Sep", price: 0.0045 },
  { date: "Oct", price: 0.005 },
  { date: "Nov", price: 0.0048 },
  { date: "Dec", price: 0.0055 },
]

export function PriceChart() {
  const [timeframe, setTimeframe] = useState("1M")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold">$0.0055</div>
          <div className="flex items-center text-sm text-green-500">
            <span className="mr-1">+12.24%</span>
            <span className="text-xs text-muted-foreground">(24h)</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeframe("1D")}
            className={timeframe === "1D" ? "bg-primary text-primary-foreground" : ""}
          >
            1D
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeframe("1W")}
            className={timeframe === "1W" ? "bg-primary text-primary-foreground" : ""}
          >
            1W
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeframe("1M")}
            className={timeframe === "1M" ? "bg-primary text-primary-foreground" : ""}
          >
            1M
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeframe("1Y")}
            className={timeframe === "1Y" ? "bg-primary text-primary-foreground" : ""}
          >
            1Y
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeframe("ALL")}
            className={timeframe === "ALL" ? "bg-primary text-primary-foreground" : ""}
          >
            ALL
          </Button>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} domain={["auto", "auto"]} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                          <span className="font-bold text-muted-foreground">{payload[0].payload.date}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Price</span>
                          <span className="font-bold">${payload[0].value}</span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary)/0.2)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
