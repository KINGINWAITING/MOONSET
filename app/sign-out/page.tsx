'use client';

import { useUser, useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
  const { signOut } = useClerk();
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [status, setStatus] = useState("Signing out...");

  useEffect(() => {
    if (!isLoaded) return;

    const performSignOut = async () => {
      try {
        // If already signed out, redirect to home
        if (!isSignedIn) {
          router.push("/");
          return;
        }

        // Handle sign out
        await signOut();
        setStatus("Success! Redirecting...");
        
        // Use timeout to ensure a clean transition
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } catch (error) {
        console.error("Error during sign out:", error);
        setStatus("An error occurred. Redirecting to home...");
        
        // Redirect on error after a brief delay
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    };

    performSignOut();
  }, [isLoaded, isSignedIn, signOut, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mb-4"></div>
      <h1 className="text-2xl font-bold">{status}</h1>
      <p className="text-muted-foreground mt-2">Please wait while we complete this process...</p>
    </div>
  );
} 