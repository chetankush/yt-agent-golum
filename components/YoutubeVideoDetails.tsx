"use client"

import { useEffect, useState } from "react";
import { ChannelDetails, VideoDetails } from "../types/types";
import { getVideoDetails } from "../actions/getVideoDetails";
import Image from "next/image";
import { Calendar, View, Heart, MessageCircle } from "lucide-react";

const YoutubeVideoDetails = ({videoId}: {videoId: string}) => { 
    const [video, setVideo] = useState<VideoDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideoDetails = async () => {
            setLoading(true);
            const videoDetails = await getVideoDetails(videoId);
            setVideo(videoDetails || null);
            setLoading(false);
        }

        fetchVideoDetails();
    }, [videoId]);

  if (loading) {
    return <div className="container rounded-xl p-4">Loading video details...</div>;
  }

  if (!video) {
    return <div className="container rounded-xl p-4">Video details not found.</div>;
  }

  return (
    <div className="container rounded-xl mt-4">
      <div className="flex flex-col gap-8 @xl:bg-red-500">
        <div className="flex-shrink-0">
          {video.thumbnail && (
            <Image
              src={video?.thumbnail}
              alt={video?.title}
              width={500}
              height={500}
              className="w-full shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl"
            />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{video.title}</h1>
          </div>          
        </div>
      </div>

       {/* channel info */}
       <div className="flex items-center gap-4 py-4">
          {video.channel?.thumbnail && (
            <Image
              src={video?.channel?.thumbnail}
              alt={video?.channel?.title || "Channel"}
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{video.channel?.title}</h1>
            <p className="text-gray-500 text-sm">
              {video.channel?.description}
            </p>
          </div>
       </div>

       {/* Video stats */}
       <div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-gray-500"/>
            <p className="text-sm text-gray-600">Published</p>
          </div>
          <p className="text-lg font-medium text-gray-800">{new Date(video.publishedAt).toLocaleDateString()}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <View className="w-4 h-4 text-gray-500"/>
            <p className="text-sm text-gray-600">Views  </p>
          </div>
          <p className="text-lg font-medium text-gray-800">{video.views}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-4 h-4 text-gray-500"/>
            <p className="text-sm text-gray-600">Likes</p>
          </div>
          <p className="text-lg font-medium text-gray-800">{video.likes}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <MessageCircle className="w-4 h-4 text-gray-500"/>
            <p className="text-sm text-gray-600">Comments</p>
          </div>
          <p className="text-lg font-medium text-gray-800">{video.comments}</p>
        </div>
       </div>
    </div>
  )
}

export default YoutubeVideoDetails
