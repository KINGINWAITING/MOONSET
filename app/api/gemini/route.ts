import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()
    if (!prompt) return NextResponse.json({ error: "Missing prompt" }, { status: 400 })

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest" })
    const result = await model.generateContent({ contents: [{ role: 'user', parts: [{ text: prompt }] }] })
    return NextResponse.json({ text: result.response.text() })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Gemini API error" }, { status: 500 })
  }
}
