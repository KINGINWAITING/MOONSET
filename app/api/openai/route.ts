import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let prompt = "";
    let files: File[] = [];

    if (contentType.includes("multipart/form-data")) {
      // Parse multipart form
      const formData = await req.formData();
      prompt = formData.get("prompt") as string;
      files = Array.from(formData.entries())
        .filter(([key, value]) => key.startsWith("file"))
        .map(([_, value]) => value as File);
    } else {
      // Parse JSON
      const body = await req.json();
      prompt = body.prompt;
    }

    if (!prompt && files.length === 0) {
      return NextResponse.json({ error: "Missing prompt or file" }, { status: 400 });
    }

    // If files are present, handle them (OpenAI's /chat/completions does not support file upload directly)
    if (files.length > 0) {
      // You could upload files to storage or process them here
      // For now, just return a placeholder response
      return NextResponse.json({ text: "[Attachment received, but direct file analysis is not supported in this demo. You can extend this to use OpenAI's /v1/files or other endpoints as needed.]" });
    }

    // Text-only prompt
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });
    return NextResponse.json({ text: completion.choices?.[0]?.message?.content || "" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "OpenAI API error" }, { status: 500 });
  }
}
