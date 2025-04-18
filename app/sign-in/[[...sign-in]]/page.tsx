"use client";

import { SignIn } from "@clerk/nextjs";
import { Logo } from "@/components/logo";
import { MainNav } from "@/components/main-nav";
import { FloatingElements } from "@/components/floating-elements";
import { Moon3D } from "@/components/moon-3d";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignInPage() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <FloatingElements />

      <header className="border-b relative z-10">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <MainNav />
        </div>
      </header>

      <main className="flex-1 relative">
        <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-500">
                  <span className="font-medium">Welcome Back</span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Continue Your <span className="text-blue-500">Research</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Sign in to access your research documents, contribute to ongoing investigations, and join the community of truth-seekers.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-blue-500/20 flex items-center justify-center">
                    <Moon3D />
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-lg mx-auto mt-12 flex justify-center items-center min-h-[60vh]">
              <SignIn 
                appearance={{
                  layout: {
                    socialButtonsVariant: "iconButton",
                  },
                }}
                path="/sign-in"
                routing="path"
                signUpUrl="/sign-up"
                redirectUrl="/dashboard"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 