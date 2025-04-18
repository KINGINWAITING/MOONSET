'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type AuthTransitionContextType = {
  isTransitioning: boolean;
  startTransition: () => void;
  endTransition: () => void;
};

const AuthTransitionContext = createContext<AuthTransitionContextType | undefined>(undefined);

export function AuthTransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = () => setIsTransitioning(true);
  const endTransition = () => setIsTransitioning(false);

  return (
    <AuthTransitionContext.Provider value={{ isTransitioning, startTransition, endTransition }}>
      {children}
      {isTransitioning && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="ml-3 text-foreground">Redirecting...</p>
        </div>
      )}
    </AuthTransitionContext.Provider>
  );
}

export const useAuthTransition = () => {
  const context = useContext(AuthTransitionContext);
  if (context === undefined) {
    throw new Error('useAuthTransition must be used within an AuthTransitionProvider');
  }
  return context;
}; 