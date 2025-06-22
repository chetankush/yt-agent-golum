import React, { useRef, useEffect, useState } from 'react'
import { SendIcon, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';

// Define message type
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

function AiAgentChat({videoId}: {videoId: string}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message to the chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send message to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          videoId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      if (!reader) throw new Error('Response body is null');

      const decoder = new TextDecoder();
      let responseText = '';

      // Add an empty assistant message that we'll update
      const assistantMessageId = Date.now().toString();
      setMessages((prev) => [
        ...prev, 
        { id: assistantMessageId, role: 'assistant', content: '' }
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(Boolean);
        
        for (const line of lines) {
          try {
            const parsedLine = JSON.parse(line);
            if (parsedLine.type === 'text') {
              responseText += parsedLine.text;
              
              // Update the assistant message with accumulated text
              setMessages((prev) => 
                prev.map(msg => 
                  msg.id === assistantMessageId 
                    ? { ...msg, content: responseText }
                    : msg
                )
              );
            }
          } catch (e) {
            console.error('Error parsing stream chunk:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Sorry, there was an error processing your request.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-full max-h-[600px] border rounded-lg shadow-sm overflow-hidden bg-black'>
      <div className="px-4 py-3 border-b border-gray-200 bg-black">
        <h1 className='text-lg font-semibold text-gray-800'>AI Agent Chat</h1>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 mt-4 bg-gray-900">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full min-h-[300px] text-gray-500">
              <div className="text-center space-y-3 max-w-md p-6 bg-black rounded-lg shadow-sm">
                <div className="text-xl font-medium text-white">Welcome to Agent Chat</div>
                <p className="text-gray-600">Ask anything about the video and I'll use my tools to analyze it for you.</p>
                <div className="pt-2 text-sm text-gray-500">
                  <p>Try asking:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• "Summarize this video"</li>
                    <li>• "What products are mentioned?"</li>
                    <li>• "Compare the features of products in this review"</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            message.content ? (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <Avatar className={`w-8 h-8 ${message.role === 'user' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
                    <AvatarFallback className="text-white">
                      {message.role === 'user' ? 'U' : 'AI'}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
                  }`}>
                    <p className={`text-sm ${message.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            ) : null
          ))}

          {isLoading && (
            <div className="flex justify-end">
              <div className="flex items-start gap-3 max-w-[80%]">
                <Avatar className="w-8 h-8 bg-emerald-600">
                  <AvatarFallback className="text-white">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-lg bg-black border border-gray-600 shadow-sm rounded-tl-none">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                    <p className="text-sm text-gray-500">Sending...</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-gray-500 p-4 bg-black">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            onChange={handleInputChange}
            placeholder="Ask about the video analysis..."
            type="text"
            value={input}
            disabled={isLoading}
            className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-75 disabled:bg-gray-100"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()} 
            className="rounded-full px-4 bg-blue-600 hover:bg-blue-700 transition-colors">
            {isLoading ? 
              <Loader2 className="w-4 h-4 animate-spin" /> : 
              <SendIcon className="w-4 h-4" />
            }
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AiAgentChat
