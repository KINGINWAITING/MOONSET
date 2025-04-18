'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error);
  }, [error]);

  // Check if error is related to auth state or navigation
  const isAuthError = error.message?.includes('auth') || 
                      error.message?.includes('clerk') || 
                      error.message?.includes('navigation');

  const handleReset = () => {
    reset();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-background text-foreground">
          <div className="max-w-md space-y-6">
            <h1 className="text-4xl font-bold">Something went wrong</h1>
            <p className="text-muted-foreground">
              {isAuthError 
                ? "Your session has expired or changed. We'll get you back on track."
                : "An unexpected error occurred. This could be due to a temporary issue."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleReset}>Try again</Button>
              <Button variant="outline" onClick={handleGoHome}>
                Go home
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
} 