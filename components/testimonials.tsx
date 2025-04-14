"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
  quote: string
  author: string
  title: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The MOONSET project has opened my eyes to the inconsistencies in the official moon landing narrative. Their research is thorough and compelling.",
    author: "Dr. Michael Reynolds",
    title: "Physics Professor",
  },
  {
    quote:
      "I've been researching the moon landing for years, but the resources and community that MOONSET provides have taken my understanding to a new level.",
    author: "Sarah Thompson",
    title: "Independent Researcher",
  },
  {
    quote:
      "The blockchain integration is brilliant. It ensures that the evidence we uncover can never be censored or erased from history.",
    author: "James Wilson",
    title: "Blockchain Developer",
  },
  {
    quote:
      "What impressed me most about MOONSET is how they approach the topic with scientific rigor rather than sensationalism.",
    author: "Dr. Emily Chen",
    title: "Aerospace Engineer",
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Truth-Seekers Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join a growing community dedicated to uncovering the truth
            </p>
          </div>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
            <CardContent className="p-8 md:p-10">
              <Quote className="h-12 w-12 text-secondary/40 mb-4" />
              <p className="text-xl md:text-2xl italic mb-6">{testimonials[activeIndex].quote}</p>
              <div className="flex flex-col">
                <span className="font-bold">{testimonials[activeIndex].author}</span>
                <span className="text-muted-foreground">{testimonials[activeIndex].title}</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-6 gap-2">
            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className={`w-2 h-2 p-0 rounded-full ${index === activeIndex ? "bg-secondary" : "bg-muted"}`}
                onClick={() => setActiveIndex(index)}
              >
                <span className="sr-only">Testimonial {index + 1}</span>
              </Button>
            ))}
            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
