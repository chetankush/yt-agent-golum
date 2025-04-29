import React from 'react'
import Usage from './Usage'
import { FeatureFlags } from '../features/flags'
import { useUser } from '@clerk/nextjs'
const YoutubeVideoThumbnail = ({ videoId }: { videoId: string }) => {

  const {user} = useUser();
  if(!user) {
    return null;
  }

  const images = [];
  return (
    <div className='rounded-xl bg-transparent flex flex-col p-4 border border-gray-200'>
      <div className="min-w-52">
        <Usage featureFlags={FeatureFlags.IMAGE_GENERATION} title="Youtube Video Thumbnail" />
      </div>
     
    </div>
  )
}

export default YoutubeVideoThumbnail
