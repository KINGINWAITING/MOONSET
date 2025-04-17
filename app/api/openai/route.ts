import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()
    if (!prompt) return NextResponse.json({ error: "Missing prompt" }, { status: 400 })

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    })
    return NextResponse.json({ text: completion.choices?.[0]?.message?.content || "" })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "OpenAI API error" }, { status: 500 })
  }
}
