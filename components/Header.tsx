import Link from 'next/link'
import React from 'react'
import YouTube3DIcon from './YouTube3DIcon'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Menu } from 'lucide-react'

const Header = () => {
    return (
        <header className='sticky flex justify-between items-center top-0 left-0 right-0 backdrop-blur-xl bg-black/40 px-6 py-3 z-50 border-b border-white/5'>
            <Link href="/" className='flex items-center gap-2'>
                <div className='flex items-center gap-2'>
                    <YouTube3DIcon size="small" />
                    <h1 className='text-xl font-medium text-white '>ProductReviewAI</h1>
                </div>
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors">
                <Menu className="w-5 h-5 text-white" />
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
                <nav className="flex items-center gap-8 text-sm font-medium text-gray-300">
                    <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                    <Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
                    <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <SignedIn>
                        <Link href="/manage-plan" className="p-2 rounded-full hover:bg-white/5 transition-colors">
                            manage plan
                        </Link>
                        
                        <div className="w-8 h-8 rounded-full overflow-hidden p-2 bg-gray-700 shadow-2xl flex justify-center items-center">
                            <UserButton />
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode='modal'>
                            <Button
                                className='bg-white text-black hover:bg-white/90 transition-all rounded-full text-sm font-medium px-5 py-1.5 h-auto'>
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
