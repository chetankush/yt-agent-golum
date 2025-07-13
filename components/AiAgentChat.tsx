import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Send, Loader2, Bot, User, Sparkles } from 'lucide-react';

// Types
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatResponse {
  type: string;
  text: string;
}

interface AiAgentChatProps {
  videoId: string;
}

// Constants
const WELCOME_SUGGESTIONS = [
  "Summarize this video",
  "What products are mentioned?",
  "Compare the features discussed",
  "What are the key takeaways?"
];

const ERROR_MESSAGE = "Sorry, there was an error processing your request. Please try again.";

// Components
const Avatar: React.FC<{ role: 'user' | 'assistant' }> = ({ role }) => {
  const isUser = role === 'user';
  
  return (
    <div className={`
      w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm
      ${isUser 
        ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25' 
        : 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25'
      }
    `}>
      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
    </div>
  );
};

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`
        flex items-start gap-3 max-w-[85%] animate-in slide-in-from-bottom-2 duration-300
        ${isUser ? 'flex-row-reverse' : ''}
      `}>
        <Avatar role={message.role} />
        <div className={`
          px-4 py-3 rounded-2xl shadow-sm relative
          ${isUser 
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-md' 
            : 'bg-white border border-gray-200 text-gray-800 rounded-tl-md'
          }
        `}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          <div className={`
            text-xs mt-1 opacity-70
            ${isUser ? 'text-blue-100' : 'text-gray-500'}
          `}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const TypingIndicator: React.FC = () => (
  <div className="flex justify-start mb-4">
    <div className="flex items-start gap-3 max-w-[85%]">
      <Avatar role="assistant" />
      <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const WelcomeScreen: React.FC<{ onSuggestionClick: (suggestion: string) => void }> = ({ 
  onSuggestionClick 
}) => (
  <div className="flex items-center justify-center h-full min-h-[400px]">
    <div className="text-center space-y-6 max-w-md p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl border border-gray-100">
      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/25">
        <Sparkles className="w-8 h-8 text-white" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          AI Video Assistant
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Ask me anything about the video and I'll analyze it using advanced AI tools to provide detailed insights.
        </p>
      </div>
      
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">Try asking:</p>
        <div className="grid gap-2">
          {WELCOME_SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="text-left px-4 py-2 text-sm bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              "{suggestion}"
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Main Component
const AiAgentChat: React.FC<AiAgentChatProps> = ({ videoId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Create message helper
  const createMessage = useCallback((role: 'user' | 'assistant', content: string): Message => ({
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    role,
    content,
    timestamp: new Date()
  }), []);

  // Handle API streaming response
  const handleStreamingResponse = useCallback(async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    assistantMessageId: string
  ) => {
    const decoder = new TextDecoder();
    let responseText = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(Boolean);

        for (const line of lines) {
          try {
            const parsedLine: ChatResponse = JSON.parse(line);
            if (parsedLine.type === 'text') {
              responseText += parsedLine.text;
              
              setMessages(prev => 
                prev.map(msg => 
                  msg.id === assistantMessageId 
                    ? { ...msg, content: responseText }
                    : msg
                )
              );
            }
          } catch (parseError) {
            console.warn('Failed to parse stream chunk:', parseError);
          }
        }
      }
    } catch (streamError) {
      console.error('Stream reading error:', streamError);
      throw streamError;
    }
  }, []);

  // Send message to API
  const sendMessage = useCallback(async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return;

    const userMessage = createMessage('user', messageContent);
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          videoId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is null');
      }

      // Add empty assistant message for streaming
      const assistantMessageId = `${Date.now()}-assistant`;
      const assistantMessage = createMessage('assistant', '');
      assistantMessage.id = assistantMessageId;
      
      setMessages(prev => [...prev, assistantMessage]);
      
      await handleStreamingResponse(reader, assistantMessageId);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = createMessage('assistant', ERROR_MESSAGE);
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, videoId, isLoading, createMessage, handleStreamingResponse]);

  // Form submission handler
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  }, [input, sendMessage]);

  // Handle Enter key press
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }, [input, sendMessage]);

  // Input change handler
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  // Suggestion click handler
  const handleSuggestionClick = useCallback((suggestion: string) => {
    sendMessage(suggestion);
  }, [sendMessage]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInput('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col h-full max-h-[700px] bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">AI Video Assistant</h1>
            <p className="text-sm text-emerald-100">Powered by advanced AI analysis</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50/50 to-white">
        {messages.length === 0 ? (
          <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
        ) : (
          <div className="space-y-2">
            {messages.map(message => (
              message.content && <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask about the video analysis..."
              disabled={isLoading}
              className="w-full px-4 py-3 pr-12 text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 placeholder-gray-500"
            />
          </div>
          
          <button
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim()}
            className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 disabled:shadow-none transition-all duration-200 flex items-center justify-center disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 text-center">
          Press Escape to clear • Enter to send
        </div>
      </div>
    </div>
  );
};

export default AiAgentChat;