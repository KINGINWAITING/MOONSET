"use client"

import { useEffect, useRef } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  speed: number
  color: string
  shape: "circle" | "square" | "triangle"
}

export function FloatingElements() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Create floating elements
    const elements: FloatingElement[] = []
    const colors = ["rgba(13, 71, 161, 0.1)", "rgba(198, 40, 40, 0.1)", "rgba(255, 255, 255, 0.1)"]
    const shapes = ["circle", "square", "triangle"] as const

    for (let i = 0; i < 30; i++) {
      elements.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 10,
        speed: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      })
    }

    // Draw elements
    const drawElement = (element: FloatingElement) => {
      ctx.fillStyle = element.color

      switch (element.shape) {
        case "circle":
          ctx.beginPath()
          ctx.arc(element.x, element.y, element.size, 0, Math.PI * 2)
          ctx.fill()
          break
        case "square":
          ctx.fillRect(element.x - element.size / 2, element.y - element.size / 2, element.size, element.size)
          break
        case "triangle":
          ctx.beginPath()
          ctx.moveTo(element.x, element.y - element.size / 2)
          ctx.lineTo(element.x + element.size / 2, element.y + element.size / 2)
          ctx.lineTo(element.x - element.size / 2, element.y + element.size / 2)
          ctx.closePath()
          ctx.fill()
          break
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      elements.forEach((element) => {
        // Update position
        element.y -= element.speed

        // Reset position if out of bounds
        if (element.y + element.size < 0) {
          element.y = canvas.height + element.size
          element.x = Math.random() * canvas.width
        }

        // Draw element
        drawElement(element)
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" aria-hidden="true" />
}
