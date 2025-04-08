// Update the chat API route to use the Gemini API directly
import { GEMINI_API_KEY } from "@/app/env"
import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1].content

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a farming assistant specializing in weather-related advice. 
                  Provide helpful, concise advice related to farming and weather conditions.
                  
                  If asked about specific weather data, provide general guidance based on typical patterns.
                  Focus on practical advice for farmers regarding crop management, irrigation, pest control, and weather preparation.
                  
                  Keep responses concise, practical, and focused on farming applications.
                  
                  User query: ${lastMessage}`,
                },
              ],
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    const text = data.candidates[0].content.parts[0].text || "I'm sorry, I couldn't generate a response."

    return new Response(JSON.stringify({ text }), {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(JSON.stringify({ error: "Failed to process chat request" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
