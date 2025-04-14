"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AuthModal } from "@/components/auth-modal"

export function AuthCheck() {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)

  // Check if user is logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    // If not logged in and trying to access protected routes
    if (pathname?.startsWith("/dashboard") && !loggedIn) {
      // Show auth modal
      setShowAuthModal(true)
    }
  }, [pathname])

  // Handle modal close
  const handleModalClose = () => {
    setShowAuthModal(false)
    // If user was trying to access dashboard but closed the modal, redirect to home
    if (pathname?.startsWith("/dashboard")) {
      router.push("/")
    }
  }

  // Add a listener for login/logout events
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true"
      setIsLoggedIn(loggedIn)
    }

    window.addEventListener("storage", checkLoginStatus)

    return () => {
      window.removeEventListener("storage", checkLoginStatus)
    }
  }, [])

  return (
    <>
      {isLoggedIn !== null && !isLoggedIn && (
        <AuthModal isOpen={showAuthModal} onClose={handleModalClose} defaultTab="login" />
      )}
    </>
  )
}
