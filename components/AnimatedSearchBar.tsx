"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight } from 'lucide-react';

const placeholders = [
  "Enter a YouTube URL...",
  "Search for product reviews...",
  "Compare products...",
  "Find budget options..."
];

const AnimatedSearchBar = () => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Animate the placeholder text
  useEffect(() => {
    if (isTyping) return;
    
    const interval = setInterval(() => {
      const newIndex = (placeholderIndex + 1) % placeholders.length;
      setPlaceholderIndex(newIndex);
      setPlaceholder(placeholders[newIndex]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [placeholderIndex, isTyping]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Process the query
    console.log("Searching for:", query);
    
    // Determine if it's a YouTube URL or product search
    const isYoutubeUrl = query.includes('youtube.com') || query.includes('youtu.be');
    
    if (isYoutubeUrl) {
      // Handle YouTube URL processing
      console.log("Processing YouTube video...");
      // Here you would call your YouTube processing function
    } else {
      // Handle product search
      console.log("Searching for product information...");
      // Here you would call your product search function
    }
  };
  
  return (
    <div className="w-full animate-soft-appear">
      <form 
        onSubmit={handleSubmit}
        className="relative"
      >
        <div className={`relative rounded-full overflow-hidden backdrop-blur-xl transition-all duration-300 ${isFocused ? 'shadow-[0_0_20px_rgba(255,255,255,0.1)]' : ''}`}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setIsTyping(true);
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsTyping(false);
              setIsFocused(false);
            }}
            placeholder={placeholder}
            className="w-full bg-white/5 border border-white/10 text-white py-4 pl-14 pr-16 rounded-full focus:outline-none placeholder-gray-400/70 text-base tracking-tight transition-all"
            autoComplete="off"
          />
          
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          
          <button 
            type="submit"
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2.5 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all ${isFocused ? 'bg-primary' : 'bg-white/10'}`}
            disabled={!query.trim()}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
      
      <p className="mt-3 text-sm text-gray-400/80 text-center tracking-tight">
        Search YouTube videos & compare products across all major platforms
      </p>
    </div>
  );
};

export default AnimatedSearchBar; 