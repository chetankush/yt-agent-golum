import React from 'react'
import Usage from './Usage'
import { FeatureFlags } from '../features/flags'
import { useUser } from '@clerk/nextjs'

const YoutubeVideoTitleGeneration = ({ videoId }: { videoId: string }) => {
  const { user } = useUser();
  if (!user) {
    return null;
  }

  console.log( videoId)
  return (
    <div className='rounded-xl flex flex-col p-4 border border-gray-200'>
      <div className="min-w-52">
        <Usage featureFlags={FeatureFlags.ANALYSE_VIDEO} title="YouTube Title Generation" />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Generate Catchy Titles</h3>
        <p className="text-sm text-gray-300 mb-4">Create engaging titles based on your video content</p>
        
        <div className="space-y-3">
          <div className="p-3 rounded-md bg-gray-800 border border-gray-700 hover:border-gray-500 transition">
            <p className="font-medium">How to Master YouTube SEO in 2023</p>
          </div>
          <div className="p-3 rounded-md bg-gray-800 border border-gray-700 hover:border-gray-500 transition">
            <p className="font-medium">10 Secret Tricks to Grow Your Channel FAST</p>
          </div>
          <div className="p-3 rounded-md bg-gray-800 border border-gray-700 hover:border-gray-500 transition">
            <p className="font-medium">The Ultimate Guide to YouTube Success</p>
          </div>
        </div>
        
        <button className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition">
          Generate More Titles
        </button>
      </div>
    </div>
  )
}

export default YoutubeVideoTitleGeneration
