"use client";

import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ReactNode } from "react";

export const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);



export function ConvexClientProvider({ children }: { children: ReactNode }) {
   return (
   <ClerkProvider afterSignOutUrl="/">
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {
                children
            }
        </ConvexProviderWithClerk>
    </ClerkProvider>   
   )
}
