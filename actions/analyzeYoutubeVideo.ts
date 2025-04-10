"use server"

import { redirect } from "next/navigation";

export async function analyzeYoutubeVideo(formData: FormData) {
  const url = formData.get("url")?.toString();
  
  if(!url) {
    return { error: "URL is required" }
  }

    const videoId = "dQw4w9WgXcQ"
    redirect(`/video/${videoId}/analysis`)
 
}
