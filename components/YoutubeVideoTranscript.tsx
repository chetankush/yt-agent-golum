import React, { useState } from 'react'
import Usage from './Usage'
import { FeatureFlags } from '../features/flags'
import { useSchematicEntitlement} from '@schematichq/schematic-react'
import { useUser } from '@clerk/nextjs'

interface TranscriptEntry{
  text: string;
  timestamp: string;
}

const YoutubeVideoTranscript = ({ videoId }: { videoId: string }) => {
  const [transcript, setTranscript] = useState<{transcript: TranscriptEntry[];
    cache: string;
  } | null>(null);

  const {featureUsageExceeded} = useSchematicEntitlement(FeatureFlags.TRANSCRIPTION);
  
  const { user } = useUser();
  
  console.log(setTranscript)
  console.log(user, videoId)


  return (
    <div className='rounded-xl flex flex-col p-6 border border-gray-200/20 bg-gray-900/50 backdrop-blur-lg shadow-xl'>
      <div className="min-w-52">
        <Usage featureFlags={FeatureFlags.TRANSCRIPTION} title="Video Transcript" />
      </div>
      <div className="mt-6">        
        {featureUsageExceeded ? (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <p className="text-yellow-500 text-sm">Transcript available - Upgrade to view</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 max-h-96 overflow-y-auto pr-4 custom-scrollbar">
            {transcript ? (
              transcript.transcript.map((entry, index) => (
                <div key={index} className="bg-gray-800/40 rounded-lg p-4 backdrop-blur-sm border border-gray-700/30">
                  <div className="text-gray-400 text-xs mb-2 font-medium">
                    {entry.timestamp}
                  </div>
                  <div className="text-gray-200 text-sm leading-relaxed">
                    {entry.text}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-800/40 rounded-lg p-4 backdrop-blur-sm border border-gray-700/30">
                <p className="text-gray-200 text-sm">No transcript available for this video yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default YoutubeVideoTranscript
