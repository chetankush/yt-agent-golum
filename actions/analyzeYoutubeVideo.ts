"use server"

import { redirect } from "next/navigation";
import { getVideoIdFromURL } from "../src/lib/GetVideoIdFromURL";

export async function analyzeYoutubeVideo(formData: FormData) {
  const url = formData.get("url")?.toString();
  
  if(!url) {
    return;
  }
    const videoId = getVideoIdFromURL(url);
    console.log("videoId is >>>>>this>>>>", videoId);
    if(!videoId) {
        return;
    }
    redirect(`/video/${videoId}/analysis`)
 
}
