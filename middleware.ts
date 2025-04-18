import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/about", 
    "/contact", 
    "/api/webhook", 
    "/whitepaper",
    "/team",
    "/roadmap",
    "/privacy",
    "/terms",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/sign-out",
  ],
  ignoredRoutes: ["/api/webhook"],
  
  // Handle auth state transitions better
  afterAuth(auth, req) {
    // Handle routing based on authentication status
    const url = new URL(req.nextUrl);
    
    // If the user is trying to access a protected route and isn't signed in
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', url.pathname);
      return NextResponse.redirect(signInUrl);
    }
    
    // Allow the user to continue to any route
    return NextResponse.next();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}; 