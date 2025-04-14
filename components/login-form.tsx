"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Mail } from "lucide-react"

// Form validation schema using Zod
const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(1, { message: "Password is required." }).trim(),
})

type FormErrors = {
  email?: string[]
  password?: string[]
  form?: string
}

interface LoginFormProps {
  modal?: boolean
  onSuccess?: () => void
}

export function LoginForm({ modal = false, onSuccess }: LoginFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setErrors({})

    const formData = new FormData(event.currentTarget)
    const formValues = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    // Validate form fields
    const result = LoginFormSchema.safeParse(formValues)

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors)
      setIsLoading(false)
      return
    }

    try {
      // This would be replaced with your actual login API call
      // await signIn(formValues);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Set user as logged in
      localStorage.setItem("isLoggedIn", "true")

      // Trigger storage event for other components to detect the change
      window.dispatchEvent(new Event("storage"))

      // Call onSuccess if provided (for modal)
      if (onSuccess) {
        onSuccess()
      }

      // Redirect to dashboard on success
      router.push("/dashboard")
    } catch (error) {
      setErrors({ form: ["Invalid email or password. Please try again."] })
    } finally {
      setIsLoading(false)
    }
  }

  function handleSocialLogin(provider: "google" | "x" | "facebook") {
    setIsLoading(true)
    // This would be replaced with your actual social login logic
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true")

      // Trigger storage event for other components to detect the change
      window.dispatchEvent(new Event("storage"))

      if (onSuccess) {
        onSuccess()
      }
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={() => handleSocialLogin("google")}
          className="w-full"
        >
          <Mail className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={() => handleSocialLogin("x")}
          className="w-full"
        >
          <svg
            className="mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
          </svg>
          X
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={() => handleSocialLogin("facebook")}
          className="w-full"
        >
          <svg
            className="mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
          Facebook
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {errors.form && (
          <Alert variant="destructive">
            <AlertDescription>{errors.form[0]}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="john@example.com" disabled={isLoading} />
          {errors.email && <p className="text-sm text-destructive">{errors.email[0]}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Button variant="link" className="px-0 font-normal h-auto" size="sm" asChild>
              <a href="/forgot-password">Forgot password?</a>
            </Button>
          </div>
          <Input id="password" name="password" type="password" disabled={isLoading} />
          {errors.password && <p className="text-sm text-destructive">{errors.password[0]}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  )
}
