export enum FeatureFlags {
   TRANSCRIPTION = "transcription",
   IMAGE_GENERATION = "image-generation",
   ANALYSE_VIDEO = "analyze-video",
   TITLE_GENERATION = "title-generations",
   SCRIPT_GENERATION = "script-generation",
}   


export const featureFlagEvents: Record<FeatureFlags, {event: string}> = {
    [FeatureFlags.TRANSCRIPTION]: {
        event: "transcription",
    },
    [FeatureFlags.IMAGE_GENERATION]: {
        event: "image-generation",
    },  
    [FeatureFlags.ANALYSE_VIDEO]: {
        event: "analyze-video",
    },
    [FeatureFlags.TITLE_GENERATION]: {
        event: "title-generations",
    },  
    [FeatureFlags.SCRIPT_GENERATION]: {
        event: "",
    },  

}
