'use client'

import React from 'react'
    import Usage from '../../../../../components/Usage'
    import { FeatureFlags } from '../../../../../features/flags'
    import { useParams } from 'next/navigation'
import YoutubeVideoDetails from '../../../../../components/YoutubeVideoDetails'
import YoutubeVideoTranscript from '../../../../../components/YoutubeVideoTranscript'
import YoutubeVideoTitleGeneration from '../../../../../components/YoutubeVideoTitleGeneration'
import YoutubeVideoThumbnail from '../../../../../components/YoutubeVideoThumbnail'
const AnalysisPage = () => {
    const params = useParams<{videoId: string}>();    

    const {videoId} = params;


  return (


    <div className='container mx-auto px-4 py-8 md:px-6 md:py-10 text-white'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* left side*/}

        {/* analysis section */}
        <div className='order-2 lg:order-1 flex flex-col gap-4  lg:boder-r border-gray-200 p-6'>  
        <Usage
        featureFlags={FeatureFlags.ANALYSE_VIDEO}
        title="Video Analysis"
        />

        {/* youtube video details */}
        <YoutubeVideoDetails videoId={videoId} />
        
        {/* youtube video thumbnail */}

        <YoutubeVideoThumbnail videoId={videoId} />


        {/* youtube video title genration */}
        <YoutubeVideoTitleGeneration videoId={videoId} />
        
        
        {/* youtube video transcript */}
        <YoutubeVideoTranscript videoId={videoId} />
        
        
        </div>

       <div className='order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6rem)]'>
       <p> right side</p>
       {/* ai agent chat section */}
       {/* ai agent chat input */}
       {/* ai agent chat messages */}
       </div>
        </div>
    </div>
  )
}

export default AnalysisPage
