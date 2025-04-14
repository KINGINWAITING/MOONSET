"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FaqItem {
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  {
    question: "What is MOONSET?",
    answer:
      "MOONSET is a decentralized initiative powered by the Ethereum blockchain dedicated to uncovering the truth about the 1969 moon landing. Our project combines blockchain technology, community governance, and rigorous research to challenge the official narrative.",
  },
  {
    question: "How does the MOONSET token work?",
    answer:
      "MOONSET is an ERC-20 utility token that powers our ecosystem. Token holders can participate in governance decisions, access premium research content, and contribute to the lunar truth archive. The token also incentivizes content creation and research through our reward system.",
  },
  {
    question: "What evidence suggests the moon landing was faked?",
    answer:
      "Our research focuses on several key areas: photographic anomalies (absence of stars, waving flag, shadow inconsistencies), technical impossibilities (Van Allen radiation belt exposure, lack of blast crater), and the geopolitical context of the Cold War. Our whitepaper details these points extensively.",
  },
  {
    question: "How can I participate in the MOONSET community?",
    answer:
      "You can join our community by creating an account on our platform, connecting your wallet, and participating in discussions. Token holders can vote on proposals, contribute research, and access our AI-powered research tools.",
  },
  {
    question: "Is MOONSET just another meme coin?",
    answer:
      "No. While we recognize the power of community-driven value that meme coins demonstrate, MOONSET is built on decades of serious research and a commitment to uncovering historical truth. Our token has real utility within our ecosystem and supports meaningful research and content creation.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Common questions about the MOONSET project and our mission
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-4">
        {faqItems.map((item, index) => (
          <Card
            key={index}
            className={`border-primary/20 transition-all duration-200 ${openIndex === index ? "bg-primary/5" : ""}`}
          >
            <CardHeader className="cursor-pointer p-4 md:p-6" onClick={() => toggleFaq(index)}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{item.question}</CardTitle>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            {openIndex === index && (
              <CardContent className="px-4 pb-4 md:px-6 md:pb-6 pt-0">
                <p className="text-muted-foreground">{item.answer}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
