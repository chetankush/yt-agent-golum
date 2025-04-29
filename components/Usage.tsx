"use client"

import { useState } from "react"
import { FeatureFlags } from "../features/flags"
import { Progress } from "../src/components/ui/progress"
import { useSchematicEntitlement, useSchematicIsPending } from "@schematichq/schematic-react"
export default function Usage(
    {
        featureFlags,
        title
    }: {
        featureFlags: FeatureFlags,
        title: string
    }) {

    const isPending = useSchematicIsPending();

    const { featureAllocation,
        featureUsage,
        value: isFeatureEnabled } = useSchematicEntitlement(featureFlags);

    const hasUsedAllTokens = featureUsage && featureAllocation && featureUsage >= featureAllocation;



    if (hasUsedAllTokens) {
        return (
            <div className=" rounded-2xl shadow-sm border border-red-100 p-6">


                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold [text-gray-800">{title}</h2>
                    <div className="px-4 py-2 bg-red-50 rounded-lg">
                        <span className="font-medium Otext-red-700">{featureUsage}</span>
                        <span className="@text-red-400 mx-2">/</span>
                        <span className="font-medium text-red-700">
                            {featureAllocation}
                        </span>
                    </div>
                </div>

                <div className="relative">
                    <Progress
                        value={100}
                        className="h-3 rounded-full bg-gray-100 [&>*]:bg-gray-600"
                    />
                    <div className="text-sm text-red-600 mt-2">
                        you have used all available tokens. please upgrade your plan to contine using this feature.
                    </div>
                </div>
            </div>
        )
    }


    if (!isFeatureEnabled) {
        return (
            <div className="bg-transparent rounded-2xl shadow-sm border border-gray-100 p-6 opacity-50">
                
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold [text-gray-800]">{title}</h2>
                    <div className="px-4 py-2  rounded-lg">
                        <span className="[text-red-500">Feature Disabled</span>
                    </div>
                </div>

                <div className="relative">
                    <Progress value={0} className="h-3 rounded-full bg-gray-100 [&>*]:bg-gray-600" />
                </div>
                <div className="text-sm text-white mt-2">
                    you have used all available tokens. please upgrade your plan to contine using this feature.
                </div>
            </div>
        )
    }

 
    const progress = ((featureUsage || 0) / (featureAllocation || 1)) * 100;

    const getProgressColor = (percent: number) => {
        if (percent >= 80) {
            return "[&>*]bg-red-600";
        }
        if(percent>= 50){
            return "[&>*]bg-yellow-600";
        }
        return "[&>*]bg-green-600";
    }

    const progressColor = getProgressColor(progress);

    return (
        <div>
            <div className="flex justify-between items-center mb-4 gap-4">
                <h2 className="text-xl font-semibold text-white">{title}</h2>
                <div className="px-4 py-2 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-500">{featureUsage}</span>
                    <span className="mx-2 text-gray-500">/</span>
                    <span className="font-medium text-gray-500">{featureAllocation}</span>
                </div>
            </div>
            <div>
                <Progress 
                value={progress} 
                className={`h-3 rounded-full bg-gray-100 ${progressColor}`} />

                {progress >= 100 ? (
                    <div className="text-sm text-red-600 mt-2">
                        you have used all available tokens. please upgrade your plan to contine using this feature.
                    </div>
                ) : progress > 80 ? (
                    <div className="text-sm text-yellow-600 mt-2">
                        you are running out of tokens. please upgrade your plan to contine using this feature.
                    </div>
                ) : null}
            </div>
        </div>
    )
}

