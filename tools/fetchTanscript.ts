import { z } from "zod"
import { tool } from "ai"
import { getYoutubeTranscript } from "../actions/getYoutubeTranscript"
const fetchTranscript = tool({
    description: "fetch the transcript of a yt video in segments", 
    parameters: z.object({
        videoId: z.string().describe("the id of the youtube video to fetch the transcript for"),
    }),
    execute: async({videoId}) => {
        const transcript = await getYoutubeTranscript(videoId);
        return {
            transcript: transcript?.transcript,
            cache: transcript?.cache,
        }
    }

});


export default fetchTranscript;