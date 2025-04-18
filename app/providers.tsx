import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "next-themes";
import { AuthTransitionProvider } from "./auth-transition";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        elements: {
          // Apply consistent styling to auth components
          rootBox: "mx-auto",
          card: "bg-background border-none shadow-xl rounded-xl overflow-hidden max-w-md w-full",
          headerTitle: "text-2xl font-bold text-blue-500",
          headerSubtitle: "text-muted-foreground text-sm",
          socialButtonsBlockButton: "border border-border hover:bg-accent/80 transition-colors rounded-lg",
          socialButtonsBlockButtonText: "font-medium",
          socialButtonsBlockButtonIconBox: "p-2",
          socialButtonsProviderIcon__google: "w-5 h-5",
          socialButtonsProviderIcon__github: "w-5 h-5",
          socialButtonsProviderIcon__apple: "w-5 h-5",
          dividerLine: "bg-border h-px",
          dividerText: "text-muted-foreground px-2 text-sm",
          formFieldLabel: "text-foreground font-medium mb-1 text-sm",
          formFieldInput: "bg-background border-border rounded-lg px-3 py-2 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-blue-500 focus-visible:border-blue-500",
          formButtonPrimary: "bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition-colors",
          footerActionLink: "text-blue-500 hover:text-blue-600 font-medium",
          footerActionText: "text-muted-foreground text-sm",
          footer: "pb-6 pt-2",
          // Hide Clerk default components that are showing up in the nav
          userButton: "hidden !important",
          userButtonBox: "hidden !important",
          userButtonTrigger: "hidden !important",
          userButtonAvatarBox: "hidden !important",
          userButtonAvatarImage: "hidden !important",
          organizationSwitcher: "hidden !important",
          organizationSwitcherTrigger: "hidden !important",
          notificationButton: "hidden !important",
          notificationButtonTrigger: "hidden !important",
          // Modal specific styles
          modalBackdrop: "bg-background/80 backdrop-blur-sm fixed inset-0 flex items-center justify-center",
          modalContent: "bg-background border-none shadow-2xl rounded-xl overflow-hidden max-w-md w-full mx-auto",
          modal: "p-0 rounded-xl flex items-center justify-center",
          form: "px-6 py-4 w-full",
          formFieldRow: "mb-4",
          formFieldErrorText: "text-red-500 text-xs mt-1",
          formHeaderTitle: "text-2xl font-bold text-blue-500",
          formHeaderSubtitle: "text-muted-foreground text-sm",
          identityPreview: "bg-accent border-border rounded-lg",
          identityPreviewText: "font-medium",
          identityPreviewEditButton: "text-blue-500 hover:text-blue-600",
          otpCodeFieldInput: "bg-background border-border rounded-lg text-lg focus-visible:ring-blue-500 focus-visible:border-blue-500 w-12 h-12",
        }
      }}
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthTransitionProvider>
          {children}
        </AuthTransitionProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
} 