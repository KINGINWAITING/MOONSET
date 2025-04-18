"use client"

import { AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Area } from "recharts"

interface PriceChartProps {
  timeframe: string
}

// Sample data - in a real app, this would come from your API
const data = {
  "1D": [
    { time: "00:00", price: 0.0052 },
    { time: "04:00", price: 0.0054 },
    { time: "08:00", price: 0.0051 },
    { time: "12:00", price: 0.0053 },
    { time: "16:00", price: 0.0055 },
    { time: "20:00", price: 0.0054 },
    { time: "24:00", price: 0.0055 },
  ],
  "1W": [
    { date: "Mon", price: 0.0048 },
    { date: "Tue", price: 0.0049 },
    { date: "Wed", price: 0.0051 },
    { date: "Thu", price: 0.0052 },
    { date: "Fri", price: 0.0053 },
    { date: "Sat", price: 0.0054 },
    { date: "Sun", price: 0.0055 },
  ],
  "1M": [
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
  ],
  "1Y": [
    { month: "Q1", price: 0.0015 },
    { month: "Q2", price: 0.0025 },
    { month: "Q3", price: 0.004 },
    { month: "Q4", price: 0.0055 },
  ]
}

export function PriceChart({ timeframe }: PriceChartProps) {
  const chartData = data[timeframe as keyof typeof data] || data["1M"]
  const dataKey = timeframe === "1D" ? "time" : timeframe === "1Y" ? "month" : "date"

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
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey={dataKey} tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} domain={["auto", "auto"]} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {timeframe === "1D" ? "Time" : timeframe === "1Y" ? "Quarter" : "Date"}
                          </span>
                          <span className="font-bold text-muted-foreground">{payload[0].payload[dataKey]}</span>
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
