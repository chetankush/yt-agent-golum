import React from 'react'
import Usage from './Usage'
import { FeatureFlags } from '../features/flags'
import { useUser } from '@clerk/nextjs'
import {api} from '../convex/_generated/api'
import {useQuery} from 'convex/react'
const YoutubeVideoThumbnail = ({ videoId }: { videoId: string }) => {

  const {user} = useUser();
  
  // Always call useQuery hook unconditionally
  const images = useQuery(api.images.getImages, {
    videoId, 
    userId: user?.id ?? "",
  });
  
  // Temporary fix for unused variable - will be used in future implementation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const imagesRef = React.useRef(images);

  return (
    <div className='rounded-xl bg-transparent flex flex-col p-4 border border-gray-200'>
      <div className="min-w-52">
        <Usage featureFlags={FeatureFlags.IMAGE_GENERATION} title="Youtube Video Thumbnail" />
      </div>
     
    </div>
  )
}

export default YoutubeVideoThumbnail
