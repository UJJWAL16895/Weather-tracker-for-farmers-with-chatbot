"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GEMINI_API_KEY } from "@/app/env"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your farming assistant. How can I help you with weather-related questions or farming advice today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message to chat
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Use the Gemini API directly with the provided key
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
                    text: `You are a farming assistant specializing in weather-related advice. The user is a farmer looking for guidance based on weather conditions.
                  
                  Current context: The user is asking about "${input}". Provide helpful, concise advice related to farming and weather.
                  
                  If the question is about weather forecasts, crop recommendations, or farming practices, provide specific advice. If you don't know specific weather data, suggest what the farmer should look for.`,
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

      // Add assistant response to chat
      const assistantMessage: Message = { role: "assistant", content: text }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm sorry, I encountered an error. Please try again later." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <Card className="h-[80vh] flex flex-col">
        <CardHeader>
          <CardTitle>AI Farming Assistant</CardTitle>
          <CardDescription>
            Ask questions about weather conditions, crop recommendations, or farming practices
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4 pb-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-start gap-3 max-w-[80%]">
                    {message.role === "assistant" && (
                      <Avatar>
                        <AvatarFallback>AI</AvatarFallback>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <Avatar>
                        <AvatarFallback>You</AvatarFallback>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input
              placeholder="Ask about weather or farming advice..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Thinking..." : "Send"}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
