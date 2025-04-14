"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthModal } from "@/components/auth-modal"

interface NavLinkProps {
  href: string
  className?: string
  children: React.ReactNode
}

export function NavLink({ href, className, children }: NavLinkProps) {
  const router = useRouter()
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If trying to access dashboard
    if (href.startsWith("/dashboard")) {
      // Check if logged in
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

      if (!isLoggedIn) {
        e.preventDefault()
        setShowAuthModal(true)
        return
      }
    }
  }

  const handleModalClose = () => {
    setShowAuthModal(false)
  }

  return (
    <>
      <Link href={href} className={className} onClick={handleClick}>
        {children}
      </Link>
      <AuthModal isOpen={showAuthModal} onClose={handleModalClose} defaultTab="login" />
    </>
  )
}
