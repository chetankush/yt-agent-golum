"use server"

import { google } from "googleapis";
import { ChannelDetails, VideoDetails } from "../types/types";

const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY,
});


export async function getVideoDetails(videoId: string) {
    console.log("videoId is >>>>>this>>>>", videoId);
 try{
    const videoResponse = await youtube.videos.list({
        part: ["snippet", "statistics"],
        id: [videoId],
    })
    
    
    const videoDetails = videoResponse.data.items?.[0];



    if(!videoDetails){
        throw new Error("No video details found");
    }
   


    const channelResponse = await youtube.channels.list({
        part: ["snippet", "statistics"],
        id: [videoDetails.snippet?.channelId || ""] ,
    })
    
    const channelDetails = channelResponse.data.items?.[0];


    console.log("channelDetails is >>>>>this>>>>", channelDetails);
    
    

    if(!channelDetails){
        throw new Error("No channel details found");
    }

    const video: VideoDetails = {

        //video info 
        videoId: videoDetails.id || "",
        title: videoDetails.snippet?.title || "",
        description: videoDetails.snippet?.description || "",
        thumbnail: 
          videoDetails.snippet?.thumbnails?.maxres?.url || videoDetails.snippet?.thumbnails?.high?.url || videoDetails.snippet?.thumbnails?.medium?.url || videoDetails.snippet?.thumbnails?.standard?.url || "",
        publishedAt: videoDetails.snippet?.publishedAt || "",
        //   Video metrics
        views: videoDetails.statistics?.viewCount || "0",
        likes: videoDetails.statistics?.likeCount || "0",
        comments: videoDetails.statistics?.commentCount || "0",
        duration: videoDetails.contentDetails?.duration || "",
        tags: videoDetails.snippet?.tags || [],
        
        
        //channel info
        channel: {
            title: videoDetails.snippet?.channelTitle || "Unknown Channel",
            thumbnail: channelDetails.snippet?.thumbnails?.default?.url || "",
            subscribers: channelDetails.statistics?.subscriberCount || 0,
            videos: channelDetails.statistics?.videoCount || 0,
        },
        channelTitle: videoDetails.snippet?.channelTitle || "",
        viewCount: videoDetails.statistics?.viewCount || "0",
        likeCount: videoDetails.statistics?.likeCount || "0",
    }
    return video;


 }catch(error){
    console.error("Error fetching video details:", error);
 }
}


