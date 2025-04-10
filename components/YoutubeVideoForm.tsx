"use client"
import React, { useState } from 'react'
import Form from 'next/form'
import AnalyzeButton from './AnalyzeButton'
import { analyzeYoutubeVideo } from '../actions/analyzeYoutubeVideo'

const YoutubeVideoForm = () => {
  const [error, setError] = useState<string | null>(null);
  
  async function handleFormSubmit(formData: FormData) {
    const result = await analyzeYoutubeVideo(formData);
    if (result.error) {
      setError(result.error);
    }
  }
  
  return (
    <div>
      <Form 
        action={handleFormSubmit}
        className='flex  sm:flex-row flex-col w-96 items-center gap-2'
      >
        <input 
        type="text"
        name="url" 
        className=' sm:w-auto flex-1 borderrounded-md py-3 px-4  bg-black text-white focus:outline-none border-3 rounded-full border-blue-500 focus:ring-blue-500  focus:ring-2' 
        placeholder='Enter your YouTube video URL' />
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </Form>
    </div>
  )
}
    
export default YoutubeVideoForm
