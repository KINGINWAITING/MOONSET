import Link from "next/link"
import { SignupForm } from "@/components/signup-form"
import { Logo } from "@/components/logo"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-6 py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="flex justify-center">
            <Logo href="/" />
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold text-foreground">Create your account</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
          <div className="mt-8">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  )
}
