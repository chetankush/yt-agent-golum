import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { streamText } from "ai";



// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyCCtHDpSbFaOncXB-sjY4QkCHL7RFMiV0g");

// Use Gemini Pro model (free tier)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
    const { messages, videoId } = await req.json();
    console.log(messages, videoId);

    try {
        // Convert messages to Gemini format (Gemini expects different format than Anthropic)
        const geminiMessages = messages.map((msg: any) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }]
        }));

        // Create a chat session
        const chat = model.startChat({
            history: geminiMessages.slice(0, -1),
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        // Get the last user message
        const lastMessage = geminiMessages[geminiMessages.length - 1];
        
        // Send to Gemini and get response
        const result = await chat.sendMessageStream(lastMessage.parts[0].text);
        
        // Create a ReadableStream to stream the response
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of result.stream) {
                        const text = chunk.text();
                        if (text) {
                            controller.enqueue(new TextEncoder().encode(JSON.stringify({ 
                                type: 'text',
                                text 
                            }) + '\n'));
                        }
                    }
                    controller.close();
                } catch (error) {
                    console.error("Stream error:", error);
                    controller.error(error);
                }
            }
        });

        return new Response(stream);
    } catch (error) {
        console.error("Error processing request:", error);
        return new NextResponse(JSON.stringify({ error: "Failed to process request" }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}