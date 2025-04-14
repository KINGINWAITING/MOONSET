"use client"

import { useEffect, useRef } from "react"

export function Moon3D() {
  const moonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!moonRef.current) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      // Calculate mouse position relative to the center of the screen
      const x = (clientX - innerWidth / 2) / (innerWidth / 2)
      const y = (clientY - innerHeight / 2) / (innerHeight / 2)

      // Apply subtle rotation based on mouse position
      moonRef.current.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center perspective">
      <div
        ref={moonRef}
        className="moon-container w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-br from-gray-200 to-gray-300 shadow-inner transition-transform duration-200 ease-out"
        style={{
          backgroundImage: "url('/moon.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "inset -30px -30px 60px rgba(0,0,0,0.2), inset 5px 5px 20px rgba(255,255,255,0.5)",
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-white opacity-20"></div>
        <div className="absolute inset-0 rounded-full shadow-lg"></div>
      </div>
    </div>
  )
}
