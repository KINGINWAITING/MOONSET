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
const SignupFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }).trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .trim(),
})

type FormErrors = {
  name?: string[]
  email?: string[]
  password?: string[]
  form?: string
}

interface SignupFormProps {
  modal?: boolean
  onSuccess?: () => void
}

export function SignupForm({ modal = false, onSuccess }: SignupFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setErrors({})

    const formData = new FormData(event.currentTarget)
    const formValues = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    // Validate form fields
    const result = SignupFormSchema.safeParse(formValues)

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors)
      setIsLoading(false)
      return
    }

    try {
      // This would be replaced with your actual signup API call
      // await signUp(formValues);

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
      setErrors({ form: ["An error occurred during signup. Please try again."] })
    } finally {
      setIsLoading(false)
    }
  }

  function handleSocialSignup(provider: "google" | "x" | "facebook") {
    setIsLoading(true)
    // This would be replaced with your actual social signup logic
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
          onClick={() => handleSocialSignup("google")}
          className="w-full"
        >
          <Mail className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={() => handleSocialSignup("x")}
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
          onClick={() => handleSocialSignup("facebook")}
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
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="John Doe" disabled={isLoading} />
          {errors.name && <p className="text-sm text-destructive">{errors.name[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="john@example.com" disabled={isLoading} />
          {errors.email && <p className="text-sm text-destructive">{errors.email[0]}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" name="password" type="password" disabled={isLoading} />
          {errors.password && (
            <div className="text-sm text-destructive">
              <p>Password must:</p>
              <ul className="list-disc pl-4">
                {errors.password.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </div>
  )
}
