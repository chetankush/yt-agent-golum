import Link from 'next/link'
import React from 'react'
import YouTube3DIcon from './YouTube3DIcon'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

const Header = () => {
    return (
        <header className='sticky flex justify-between items-center top-0 left-0 right-0 glass-effect p-6 z-50 dark'>
            <Link href="/" className='flex items-center gap-3'>
                <div className='flex items-center gap-3'>
                    <YouTube3DIcon size="small" />
                    <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text'>YouTube-Summarizer</h1>
                </div>
            </Link>

            <div className="flex items-center gap-4">
                <SignedIn>
                    <Link href="/manage-plans">
                        <Button variant="outline"
                            className='text-sm text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white'
                        >
                            Manage Plan
                        </Button>
                    </Link>

                    <div className="p-2 w-10 h-10 flex items-center justify-center
rounded-full border glass-card border-blue-500/20">
                        <UserButton />
                    </div>
                </SignedIn>
                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton mode='modal'>
                            <Button
                                className='bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-all'>
                                Sign In
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </header>
    )
}

export default Header
