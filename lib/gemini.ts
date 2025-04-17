import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export async function geminiChat(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" })
  const result = await model.generateContent(prompt)
  return result.response.text()
}
