"use client"

import React from 'react'
import { useFormStatus } from 'react-dom'

const AnalyzeButton = () => {
   const {pending} = useFormStatus();


    return (
    <button 
    type='submit'
    disabled={pending}
    className='bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 border-3 cursor-pointer rounded-full border-blue-500 hover:opacity-90 transition-all flex items-center gap-2 whitespace-nowrap text-2xl'
    >
      {pending ? "Analyzing..." : "Analyze"}
    </button>
  )
}

export default AnalyzeButton
