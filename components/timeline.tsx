import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"

interface TimelineItem {
  title: string
  date: string
  description: string
  completed: boolean
}

const timelineItems: TimelineItem[] = [
  {
    title: "Project Inception",
    date: "January 2025",
    description:
      "The MOONSET project was conceived by a group of researchers dedicated to uncovering the truth about the moon landing.",
    completed: true,
  },
  {
    title: "Website Launch",
    date: "April 2025",
    description: "Official launch of the MOONSET website and social media channels to begin building our community.",
    completed: true,
  },
  {
    title: "Token Launch",
    date: "June 2025",
    description: "Launch of the MOONSET token on the Ethereum blockchain with Initial DEX Offering (IDO).",
    completed: false,
  },
  {
    title: "Research Platform",
    date: "Q3 2025",
    description:
      "Release of our AI-powered research platform for analyzing evidence and contributing to the lunar truth archive.",
    completed: false,
  },
  {
    title: "Global Awareness Campaign",
    date: "Q1 2026",
    description: "Major media appearances and global marketing campaign to spread awareness about the lunar deception.",
    completed: false,
  },
]

export function Timeline() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Journey</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Key milestones in our mission to uncover the truth
          </p>
        </div>
      </div>

      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-border"></div>

        <div className="space-y-12">
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-background ${item.completed ? "bg-secondary" : "bg-muted"}`}
              >
                {item.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-secondary-foreground" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </div>

              <Card className={`w-[calc(50%-2rem)] ${index % 2 === 0 ? "mr-auto" : "ml-auto"} border-primary/20`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
