import { NextRequest, NextResponse } from "next/server"
// OpenAI import is no longer needed for disabled state
// import OpenAI from "openai"

// // Check if OpenAI API key is available
// if (!process.env.OPENAI_API_KEY) {
//   console.warn("OPENAI_API_KEY is not set. OpenAI features will be disabled.")
// }

// // Initialize OpenAI client only if API key is available
// const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null

export async function POST(req: NextRequest) {
  // Immediately return a message indicating the feature is disabled
  return NextResponse.json(
    { text: "AI features are temporarily disabled." },
    { status: 200 } // Return 200 OK, as the API itself is working, just the feature is off
  );

  /* // Original logic commented out:
  try {
    // Return early if OpenAI is not configured
    if (!openai) {
      return NextResponse.json(
        { error: "OpenAI API is not configured. Please set OPENAI_API_KEY environment variable." },
        { status: 503 }
      )
    }

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
  */
}
