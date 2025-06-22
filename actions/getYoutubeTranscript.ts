import { currentUser } from "@clerk/nextjs/server";
import { Innertube } from "youtubei.js";


export interface TranscriptEntry {
    text: string;
    timestamp: string;
}


const youtube = await Innertube.create({
    lang: "en",
    location: "US",
    retrieve_player: true,
})


function formatTimestamp(start_ms: number): string {

    const minutes = Math.floor(start_ms / 60000);
    const seconds = Math.floor((start_ms % 60000) / 1000);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;

}

async function fetchTranscript(videoId: string): Promise<TranscriptEntry[] | null>{

    try{
        const info = await youtube.getInfo(videoId);
        const transcriptData = await info.getTranscript();
        const transcript: TranscriptEntry[] = 
        transcriptData.transcript.content?.body?.initial_segments.map(
            (segment: any) =>({
                text: segment.snippet.text ?? "N/A",
                timestamp: formatTimestamp(Number(segment.start_ms)),
            })
        ) ?? [];
        return transcript;
    }catch(error){
        console.error("Error fetching transcript:", error);
        return null;
    }

}

export async function getYoutubeTranscript(videoId: string) {
  

    const user = await currentUser();

    if(!user?.id) {
        throw new Error("Unauthorized");
    }

     //check if transcript already exists in db (is it cached)

     //if not, fetch it from youtube
const transcript = await fetchTranscript(videoId);
return {
    transcript: transcript, 
    cache: "this was not cached"
}
     //save it to db

     //return the transcript
}