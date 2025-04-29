"use client"
import React, { useState } from 'react'
import { analyzeYoutubeVideo } from '../actions/analyzeYoutubeVideo'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const YoutubeVideoForm = () => {
    const [url, setUrl] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [isFocused, setIsFocused] = useState(false)

    // This function handles the form submission
    async function handleFormSubmit(formData: FormData) {
        // Reset any previous errors
        setError(null)
        // Set the loading state to true to prevent multiple submissions
        setLoading(true)
        try {
            // Call the analyzeYoutubeVideo function with the form data
            await analyzeYoutubeVideo(formData)
        } catch (error) {
            // If an error occurs, set the error message and log the error
            setError('Failed to analyze video. Please try again.')
            console.error(error)
        } finally {
            // Regardless of the outcome, set the loading state to false
            setLoading(false)
        }
    }

    // This function is called when the form is submitted
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent the default form submission behavior
        e.preventDefault()
        // Check if the URL is not empty and the form is not currently loading
        if (url.trim() && !loading) {
            // Create a new FormData object
            const formData = new FormData()
            // Append the URL to the form data
            formData.append('url', url)
            // Call the handleFormSubmit function with the form data
            handleFormSubmit(formData)
        }
    }

    const inputCn = cn(
        'w-full px-5 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full border-white border-2 text-gray-200 placeholder-gray-400/70 focus:outline-none transition-all text-base',
        isFocused ? 'shadow-[0_0_15px_rgba(255,255,255,0.1)]' : ''
    )

    return (
        <div className="flex flex-col items-center justify-center">
       
            <form
                // Call the handleSubmit function when the form is submitted
                onSubmit={handleSubmit}
                className="relative w-full max-w-2xl mx-auto rounded-full"
            >
                <div className="relative">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste YouTube video URL here..."
                        className={inputCn}
                        disabled={loading}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                    <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-white/90 cursor-pointer text-black border-0 px-5 py-2.5 rounded-full font-medium transition-all duration-300"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2 inline" /> : null}
                        {loading ? "Analyzing..." : "Analyze"}
                    </button>
                </div>
                
                {error && (
                    <div className="text-red-400 text-sm mt-3 text-center">{error}</div>
                )}
                
                <div className="mt-4 flex justify-center items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                    <p className="text-sm text-gray-400">
                        Try: https://www.youtube.com/watch?v=dQw4w9WgXcQ
                    </p>
                </div>
            </form>
        </div>
    )
}

export default YoutubeVideoForm
