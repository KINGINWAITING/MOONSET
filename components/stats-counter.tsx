"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, FileText, BarChart3, Globe } from "lucide-react"

interface StatProps {
  icon: React.ReactNode
  value: number
  label: string
  prefix?: string
  suffix?: string
}

function StatCard({ icon, value, label, prefix = "", suffix = "" }: StatProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0
          const duration = 2000
          const step = Math.ceil(value / (duration / 16))

          const timer = setInterval(() => {
            start += step
            if (start > value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(start)
            }
          }, 16)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [value])

  return (
    <Card className="border-primary/20 overflow-hidden">
      <CardContent className="p-6 flex items-center gap-4">
        <div className="rounded-full bg-primary/10 p-3 text-primary">{icon}</div>
        <div>
          <div ref={countRef} className="text-3xl font-bold">
            {prefix}
            {count.toLocaleString()}
            {suffix}
          </div>
          <p className="text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsCounter() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Users className="h-6 w-6" />} value={12234} label="Community Members" />
        <StatCard icon={<FileText className="h-6 w-6" />} value={347} label="Research Documents" />
        <StatCard icon={<BarChart3 className="h-6 w-6" />} value={5500000} prefix="$" label="Market Cap" />
        <StatCard icon={<Globe className="h-6 w-6" />} value={42} label="Countries Represented" />
      </div>
    </div>
  )
}
