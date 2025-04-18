"use client"

import { SignInButton, SignUpButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function NavLink({ href, children, className }: NavLinkProps) {
  if (href === "/sign-in") {
    return (
      <SignInButton mode="modal">
        <Button variant="ghost" className={className}>
          {children}
        </Button>
      </SignInButton>
    )
  }

  if (href === "/sign-up") {
    return (
      <SignUpButton mode="modal">
        <Button variant="ghost" className={className}>
          {children}
        </Button>
      </SignUpButton>
    )
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}
