import { NavLink } from "@/components/nav-link"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, FileText, Shield, Users, Zap } from "lucide-react"
import { Moon3D } from "@/components/moon-3d"
import { FloatingElements } from "@/components/floating-elements"
import { Testimonials } from "@/components/testimonials"
import { Timeline } from "@/components/timeline"
import { FaqSection } from "@/components/faq-section"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Logo } from "@/components/logo"

export default function Home() {
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
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-500">
                  <span className="font-medium">Unveiling the Truth</span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    MOONSET: Exposing the <span className="text-blue-500">Lunar Deception</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  MOONSET is a decentralized initiative built on the Ethereum blockchain, committed to investigating the truth behind the Apollo moon missions. By leveraging blockchain technology, artificial intelligence, community governance, and in-depth research, we aim to critically examine and challenge the official narrative.
                  </p>
                </div>

                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-red-500 hover:bg-red-600 text-white">
                    <NavLink href="/signup">
                      Join the Movement <ArrowRight className="ml-2 h-4 w-4" />
                    </NavLink>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <NavLink href="/whitepaper">Read Whitepaper</NavLink>
                  </Button>
                </div>

                <div className="flex items-center pt-4">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=32&width=32&text=${i + 1}`}
                          alt="Community member"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">
                    Join <span className="font-medium">12,000+</span> truth-seekers
                  </span>
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

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Scroll down">
                <ChevronDown className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Leveraging blockchain technology to uncover the truth about the moon landing
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-blue-500 p-3 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">MOONSET Token</h3>
                <p className="text-center text-muted-foreground">
                  ERC-20 utility token designed to empower individuals who share our conviction about the lunar landing
                </p>
                <Button variant="link" asChild>
                  <NavLink href="/whitepaper">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </NavLink>
                </Button>
              </div>

              <div className="flex flex-col items-center space-y-4 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-blue-500 p-3 text-white">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">AI Archive Research</h3>
                <p className="text-center text-muted-foreground">
                  Our AI-powered research platform analyzes historical data, cross-references evidence, and generates insights to help uncover the truth about the moon landing.
                </p>
                <Button variant="link" asChild>
                  <NavLink href="/dashboard/research">
                    Explore archive <ArrowRight className="ml-1 h-4 w-4" />
                  </NavLink>
                </Button>
              </div>

              <div className="flex flex-col items-center space-y-4 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-blue-500 p-3 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-center">Community Participation & Governance</h3>
                <p className="text-center text-muted-foreground">
                  Decentralized governance allowing MOONSET holders to participate in research and key decisions
                </p>
                <Button variant="link" asChild>
                  <NavLink href="/dashboard/governance">
                    View proposals <ArrowRight className="ml-1 h-4 w-4" />
                  </NavLink>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why MOONSET Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-primary/5 to-blue-500/5">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                  Why <span className="text-blue-500">MOONSET</span> Matters
                </h2>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="rounded-full bg-primary/10 p-2 text-primary h-fit">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Protecting Historical Truth</h3>
                      <p className="text-muted-foreground">
                        We believe that understanding our true history is essential for humanity's progress. The moon
                        landing narrative has shaped our perception of human achievement and technological capabilities.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="rounded-full bg-primary/10 p-2 text-primary h-fit">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Blockchain-Powered Research</h3>
                      <p className="text-muted-foreground">
                        By leveraging blockchain technology, we ensure that evidence and research findings cannot be
                        censored, altered, or erased. This creates a permanent and transparent record of the truth.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="rounded-full bg-primary/10 p-2 text-primary h-fit">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Community-Driven Approach</h3>
                      <p className="text-muted-foreground">
                        MOONSET empowers a global community of truth-seekers to collaborate, share insights, and
                        collectively work towards exposing one of history's greatest deceptions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-video rounded-xl overflow-hidden border border-primary/20 shadow-xl">
                  <img
                    src="/placeholder.svg?height=720&width=1280&text=Moon+Landing+Analysis"
                    alt="Moon landing analysis"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-blue-500/90 p-4 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-8 w-8"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-xl bg-gradient-to-br from-primary/30 to-blue-500/30 blur-xl opacity-50" />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <Timeline />

        {/* Testimonials Section */}
        <Testimonials />

        {/* FAQ Section */}
        <FaqSection />

        {/* Newsletter Section */}
        <NewsletterSignup />
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MOONSET. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <NavLink href="/terms" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Terms
            </NavLink>
            <NavLink href="/privacy" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Privacy
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  )
}
