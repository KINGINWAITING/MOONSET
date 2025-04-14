import { NavLink } from "@/components/nav-link"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, ChevronDown } from "lucide-react"
import { Logo } from "@/components/logo"

export default function WhitepaperPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 bg-background z-50">
        <div className="container flex h-16 items-center justify-between">
          <Logo href="/" />
          <MainNav />
        </div>
      </header>
      
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-background/50">
        <div className="container">
          <div className="flex items-center justify-between mb-12 border-b pb-8">
            <div className="space-y-3">
            <NavLink
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Home
            </NavLink>
              <h1 className="text-4xl font-bold tracking-tight">MOONSET: Unveiling the Lunar Deception</h1>
            <p className="text-muted-foreground">April 9, 2025</p>
          </div>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Table of Contents - Fixed on Desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-24 border rounded-xl p-6 shadow-sm bg-background">
                <h3 className="text-lg font-bold mb-6">Table of Contents</h3>
                <nav className="space-y-3 text-sm">
                  <a href="#abstract" className="block text-muted-foreground hover:text-foreground py-1">Abstract</a>
                  <a href="#introduction" className="block text-muted-foreground hover:text-foreground py-1">1. Introduction</a>
                  <a href="#problem" className="block text-muted-foreground hover:text-foreground py-1">2. The Problem</a>
                  <a href="#solution" className="block text-muted-foreground hover:text-foreground py-1">3. The Solution</a>
                  <a href="#tokenomics" className="block text-muted-foreground hover:text-foreground py-1">4. Tokenomics</a>
                  <a href="#community" className="block text-muted-foreground hover:text-foreground py-1">5. Community and Ecosystem</a>
                  <a href="#roadmap" className="block text-muted-foreground hover:text-foreground py-1">6. Roadmap</a>
                  <a href="#team" className="block text-muted-foreground hover:text-foreground py-1">7. The Team</a>
                  <a href="#conclusion" className="block text-muted-foreground hover:text-foreground py-1">8. Conclusion</a>
                  <a href="#disclaimer" className="block text-muted-foreground hover:text-foreground py-1">9. Disclaimer</a>
                  <a href="#skepticism" className="block text-muted-foreground hover:text-foreground py-1">10. Addressing Skepticism</a>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert lg:prose-lg">
                <div id="abstract" className="bg-muted/30 p-8 rounded-xl border mb-16">
                  <h2 className="text-2xl font-bold mb-6">Abstract</h2>
                  <p className="mb-4">
                    MOONSET is a decentralized initiative powered by the Ethereum blockchain dedicated to uncovering the truth about the 1969 moon landing. Our project combines blockchain technology, artificial intelligence, community governance, and rigorous research to challenge the official narrative.
          </p>
          <p>
                    While acknowledging the powerful sociological forces behind the "meme coin" phenomenon, MOONSET, with its native ERC-20 token MOONSET, distinguishes itself by anchoring its value proposition in a persistent and increasingly accepted counter-narrative regarding a pivotal moment in human history. This white paper delves into the historical context of the alleged fraud, outlines the project's multifaceted approach to value creation and truth dissemination, details the MOONSET tokenomics and its role within the ecosystem, and presents a comprehensive roadmap for achieving our ambitious goals.
                  </p>
                </div>

                <div id="introduction" className="mt-16 pt-8 border-t">
                  <h2 className="text-3xl font-bold mb-8">1. Introduction: The Sociological Value of Belief and the Enduring Power of Truth</h2>
                  <p className="mb-6">
                    The advent of blockchain technology has ushered in an era of decentralized value creation, challenging traditional notions of finance and community. The remarkable rise of "meme coins" provides a fascinating case study in the sociological construction of value. These digital assets, often born from internet humor and viral trends, demonstrate the profound impact of shared belief and community alignment. They highlight how monetary value can be organically generated and sustained by a collective embracing a common idea, regardless of its initial perceived "seriousness."
                  </p>
                  <p className="mb-6">
                    MOONSET recognizes the inherent power of this phenomenon. We understand that our core mission – the conviction that the 1969 moon landing was a fabrication – may initially draw comparisons to meme coins. However, we believe that while we share the characteristic of community-driven value, our foundation lies in a decades-long pursuit of what we believe to be a significant historical truth. Our project is not predicated on fleeting internet trends but on a growing global awareness and critical re-evaluation of the evidence surrounding one of humanity's most celebrated achievements.
          </p>
          <p>
                    MOONSET, the native token of the MOONSET ecosystem, is designed to be more than just a speculative asset. It is a tool for community mobilization, a mechanism for incentivizing the pursuit and dissemination of truth, and a symbol of our collective commitment to challenging established narratives. By leveraging the robust infrastructure and smart contract capabilities of the Ethereum blockchain, MOONSET aims to build a transparent, secure, and enduring platform for truth-seekers worldwide.
                  </p>
                </div>

                <div id="problem" className="mt-16 pt-8 border-t">
                  <h2 className="text-3xl font-bold mb-8">2. The Problem: Fifty Years of Doubt - Unraveling the Lunar Narrative</h2>
                  <p className="mb-6">
                    For nearly three decades, the individuals behind MOONSET have been at the forefront of independent research into the 1969 moon landing. Our work, documented in numerous books, documentaries, and presentations, has consistently raised critical questions about the authenticity of NASA's claims. We believe that a careful and unbiased examination of the available evidence reveals a compelling case for a large-scale deception orchestrated for geopolitical purposes during the height of the Cold War.
                  </p>
                  <p className="mb-8">Our core arguments against the official narrative are based on a meticulous analysis of:</p>
                  
                  <div className="bg-muted/30 p-8 rounded-xl mb-8">
                    <h3 className="text-xl font-bold mb-6">Photographic and Video Anomalies:</h3>
                    <ul className="space-y-4">
                      <li className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-xs text-secondary-foreground">1</div>
                        <div>
                          <strong>Absence of Stars:</strong> Despite the lack of atmospheric interference on the moon, stars are conspicuously absent from nearly all lunar surface photographs and videos. This contradicts basic astronomical principles and photographic expectations.
                        </div>
            </li>
                      <li className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-xs text-secondary-foreground">2</div>
                        <div>
                          <strong>The Waving Flag:</strong> The American flag appears to be waving in several photographs, despite the absence of wind on the moon. NASA's explanation of a telescoping pole and wrinkles does not fully address the visual evidence.
                        </div>
            </li>
                      <li className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-xs text-secondary-foreground">3</div>
                        <div>
                          <strong>Identical Backgrounds:</strong> Multiple photographs taken at supposedly different landing sites share strikingly similar background features, suggesting the use of a limited set of studio backdrops.
                        </div>
            </li>
                      <li className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-xs text-secondary-foreground">4</div>
                        <div>
                          <strong>Crosshairs and Shadows:</strong> Anomalies in the photographic crosshairs and the inconsistent direction and length of shadows raise questions about the lighting conditions and the authenticity of the images.
                        </div>
            </li>
                      <li className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-xs text-secondary-foreground">5</div>
                        <div>
                          <strong>The Lack of a Blast Crater:</strong> The Lunar Module (LM) supposedly landed on the moon's surface using a powerful descent engine. The absence of a significant blast crater directly beneath the LM in many photographs is puzzling.
                        </div>
            </li>
          </ul>
                  </div>

                  <div className="bg-muted/30 p-8 rounded-xl mb-8">
                    <h3 className="text-xl font-bold mb-6">Technical and Logistical Challenges:</h3>
                    <ul className="space-y-4">
                      <li className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-xs text-secondary-foreground">1</div>
                        <div>
                          <strong>Radiation Exposure:</strong> The Van Allen radiation belts surrounding Earth pose a significant threat to human health. We question the ability of 1960s technology to adequately shield astronauts during a multi-day journey to and from the moon.
                        </div>
            </li>
                      <li className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-xs text-secondary-foreground">2</div>
                        <div>
                          <strong>Lunar Dust:</strong> Lunar dust is known to be extremely fine and abrasive. Concerns have been raised about its potential to damage equipment and spacesuits, yet the astronauts appear to have encountered minimal issues.
                        </div>
            </li>
                      <li className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-xs text-secondary-foreground">3</div>
                        <div>
                          <strong>Communication Delays:</strong> The apparent lack of significant communication delays between the moon and Earth in live broadcasts has been questioned, considering the vast distance involved.
                        </div>
            </li>
                      <li className="flex gap-4">
                        <div className="h-6 w-6 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-xs text-secondary-foreground">4</div>
                        <div>
                          <strong>Missing Original Footage:</strong> The alleged loss or destruction of the original high-resolution video footage of the moon landing raises suspicion and hinders independent analysis.
                        </div>
            </li>
          </ul>
                  </div>

                  <p className="mb-6">
                    <strong>Political and Geopolitical Context:</strong> The intense pressure of the Cold War and the space race provided a powerful motive for the United States to achieve a perceived victory over the Soviet Union, potentially leading to the fabrication of a successful moon landing.
          </p>
          <p>
                    <strong>The Unfulfilled Promise of Return:</strong> Despite significant technological advancements in the past 50 years, NASA has repeatedly delayed a manned return to the moon. This prolonged absence raises questions about the feasibility of the original missions and their actual capabilities.
                  </p>
                </div>

                <div id="solution" className="mt-16 pt-8 border-t">
                  <h2 className="text-3xl font-bold mb-8">3. The Solution: MOONSET - Fueling the Quest for Lunar Truth</h2>
                  <p className="mb-8">
                    MOONSET, an ERC-20 utility token on the Ethereum blockchain, is the cornerstone of the MOONSET ecosystem. It is designed to empower individuals who share our conviction about the lunar landing and to incentivize the collective pursuit and dissemination of truth.
                  </p>

                  <div className="bg-muted/30 p-8 rounded-xl mb-8">
                    <h3 className="text-xl font-bold mb-6">3.1 Leveraging the Ethereum Blockchain:</h3>
                    <p>
                      We have chosen the Ethereum blockchain for its robust smart contract capabilities, its large and established community, and its proven track record in hosting decentralized applications. The ERC-20 standard ensures interoperability and accessibility for a wide range of users and exchanges. The transparency and immutability of the Ethereum blockchain will provide a secure and auditable foundation for the MOONSET ecosystem.
                    </p>
                  </div>

                  <div className="bg-muted/30 p-8 rounded-xl mb-8">
                    <h3 className="text-xl font-bold mb-6">3.2 MOONSET Utility and Value Proposition:</h3>
                    <ul className="space-y-6">
                      <li className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-secondary-foreground">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        </div>
                        <div>
                          <strong>Community Funding and Governance:</strong> A significant portion of the MOONSET token supply will be allocated to a community-controlled fund. MOONSET holders will have the opportunity to participate in governance decisions, including the allocation of these funds to support research projects, content creation initiatives, and outreach efforts aligned with our mission. Specific governance mechanisms, such as voting rights based on token holdings, will be detailed in a subsequent technical paper.
                        </div>
            </li>
                      <li className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-secondary-foreground">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                        </div>
                        <div>
                          <strong>Incentivizing Content Creation and Research:</strong> The MOONSET ecosystem will implement mechanisms to reward individuals who contribute valuable content, such as well-researched articles, in-depth video analyses, compelling documentaries, and innovative technological tools that further our understanding of the lunar landing.
                        </div>
            </li>
                      <li className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-secondary-foreground">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                        </div>
                        <div>
                          <strong>Building a Decentralized Lunar Truth Archive:</strong> We envision the creation of a permanent and censorship-resistant digital archive of evidence, research findings, historical documents, and expert analyses related to the moon landing controversy.
                        </div>
            </li>
                      <li className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-secondary-foreground">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                        </div>
                        <div>
                          <strong>Raising Global Awareness:</strong> The very existence of MOONSET and the growing MOONSET community will serve as a powerful catalyst for raising awareness about the questions surrounding the moon landing.
                        </div>
            </li>
          </ul>
                  </div>
                </div>
                
                <div id="tokenomics" className="mt-16 pt-8 border-t">
                  <h2 className="text-3xl font-bold mb-8">4. Tokenomics: Fueling the MOONSET Mission</h2>
                  <p className="text-muted-foreground italic mb-8">
                    (Please note that the following tokenomics are preliminary and subject to adjustments based on community feedback and strategic considerations. A more detailed breakdown will be provided in a dedicated technical paper.)
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-muted/30 p-6 rounded-xl">
                      <p className="mb-2"><strong>Token Name:</strong> MOONSET</p>
                      <p className="mb-2"><strong>Ticker Symbol:</strong> MOONSET</p>
                      <p><strong>Blockchain:</strong> Ethereum (ERC-20)</p>
                    </div>
                    <div className="bg-muted/30 p-6 rounded-xl">
                      <p className="mb-2"><strong>Pre Sale Amount:</strong> 5,000,000,000</p>
                      <p className="mb-2"><strong>Total Supply:</strong> 10,000,000,000</p>
                      <p><strong>Initial Fundraising Goal:</strong> $10 million</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mt-12 mb-6">Token Distribution:</h3>
                  <div className="space-y-6">
                    <div className="bg-muted/30 p-6 rounded-xl">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="h-12 w-12 rounded-full bg-secondary/80 flex items-center justify-center text-secondary-foreground font-bold">15%</div>
                        <h4 className="font-bold">Founders and Core Team: 1,500,000,000 MOONSET</h4>
                      </div>
                      <p>Allocated to the core team responsible for the initial development, ongoing management, and strategic direction of the MOONSET project. These tokens will be subject to a vesting schedule to ensure long-term commitment.</p>
                    </div>
                    
                    <div className="bg-muted/30 p-6 rounded-xl">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="h-12 w-12 rounded-full bg-secondary/80 flex items-center justify-center text-secondary-foreground font-bold">25%</div>
                        <h4 className="font-bold">Community Airdrop and Initial DEX Offering: 2,500,000,000 MOONSET</h4>
                      </div>
                      <p>A portion will be allocated for an initial airdrop to early supporters and the wider cryptocurrency community to foster initial adoption and decentralization. The remaining portion will be offered through an IDO on a decentralized exchange to raise initial capital for project development and marketing.</p>
                    </div>
                    
                    <div className="bg-muted/30 p-6 rounded-xl">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="h-12 w-12 rounded-full bg-secondary/80 flex items-center justify-center text-secondary-foreground font-bold">30%</div>
                        <h4 className="font-bold">Research and Development Fund: 3,000,000,000 MOONSET</h4>
                      </div>
                      <p>This significant allocation will be dedicated to funding research projects, content creation (documentaries, articles, software development), and the development of the decentralized lunar truth archive. The allocation and disbursement of these funds will be subject to community governance.</p>
                    </div>
                    
                    <div className="bg-muted/30 p-6 rounded-xl">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="h-12 w-12 rounded-full bg-secondary/80 flex items-center justify-center text-secondary-foreground font-bold">20%</div>
                        <h4 className="font-bold">Community Rewards and Incentives: 2,000,000,000 MOONSET</h4>
                      </div>
                      <p>Reserved for incentivizing community contributions, rewarding content creators, and funding marketing and outreach initiatives. This pool will also be used for staking rewards and potential future community-driven programs.</p>
                    </div>
                    
                    <div className="bg-muted/30 p-6 rounded-xl">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="h-12 w-12 rounded-full bg-secondary/80 flex items-center justify-center text-secondary-foreground font-bold">10%</div>
                        <h4 className="font-bold">Strategic Partnerships and Advisors: 1,000,000,000 MOONSET</h4>
                      </div>
                      <p>Allocated for potential collaborations with researchers, journalists, organizations, and advisors who can contribute to the MOONSET mission.</p>
                    </div>
                  </div>
                </div>
                
                <div id="disclaimer" className="mt-16 pt-8 border-t bg-blue-50 dark:bg-blue-950/20 p-8 rounded-xl">
                  <h2 className="text-3xl font-bold mb-6">9. Disclaimer</h2>
                  <div className="prose-sm">
                    <p className="mb-4">
                      Investing in cryptocurrencies, including MOONSET, involves significant risks, and you could lose your entire investment. The value of cryptocurrencies can be highly volatile and is subject to market fluctuations. The claims and opinions expressed in this white paper regarding the 1969 moon landing are those of the MOONSET project team and are not universally accepted. This white paper is for informational purposes only and does not constitute financial or investment advice. You should conduct your own thorough research and consult with a qualified financial advisor before making any investment decisions.
          </p>
          <p>
                      The MOONSET project is based on the belief that the moon landing was faked, which is a controversial and widely debated topic. By participating in the MOONSET ecosystem, you acknowledge and accept these risks and the speculative nature of the project.
                    </p>
                  </div>
                </div>
                
                {/* Mobile Table of Contents - Bottom */}
                <div className="lg:hidden mt-16 border rounded-xl p-6 shadow-sm">
                  <details>
                    <summary className="flex items-center justify-between cursor-pointer">
                      <h3 className="text-lg font-bold">Table of Contents</h3>
                      <ChevronDown className="h-5 w-5" />
                    </summary>
                    <nav className="mt-4 space-y-3 text-sm">
                      <a href="#abstract" className="block text-muted-foreground hover:text-foreground py-1">Abstract</a>
                      <a href="#introduction" className="block text-muted-foreground hover:text-foreground py-1">1. Introduction</a>
                      <a href="#problem" className="block text-muted-foreground hover:text-foreground py-1">2. The Problem</a>
                      <a href="#solution" className="block text-muted-foreground hover:text-foreground py-1">3. The Solution</a>
                      <a href="#tokenomics" className="block text-muted-foreground hover:text-foreground py-1">4. Tokenomics</a>
                      <a href="#community" className="block text-muted-foreground hover:text-foreground py-1">5. Community and Ecosystem</a>
                      <a href="#roadmap" className="block text-muted-foreground hover:text-foreground py-1">6. Roadmap</a>
                      <a href="#team" className="block text-muted-foreground hover:text-foreground py-1">7. The Team</a>
                      <a href="#conclusion" className="block text-muted-foreground hover:text-foreground py-1">8. Conclusion</a>
                      <a href="#disclaimer" className="block text-muted-foreground hover:text-foreground py-1">9. Disclaimer</a>
                      <a href="#skepticism" className="block text-muted-foreground hover:text-foreground py-1">10. Addressing Skepticism</a>
                    </nav>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
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
