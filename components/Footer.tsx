import React from 'react'
import Link from 'next/link'
import YouTube3DIcon from './YouTube3DIcon'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className='w-full bg-black py-12 text-gray-300 dark'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand */}
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-3'>
              <YouTube3DIcon size="small" />
              <h3 className='text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text'>
                YouTube-Summarizer
              </h3>
            </div>
            <p className='text-gray-400'>
              AI-powered YouTube video summarization that saves you time and helps you extract key insights from any video content.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className='text-white text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='flex flex-col gap-2'>
              <li><Link href="/" className='text-gray-400 hover:text-blue-400 transition-colors'>Home</Link></li>
              <li><Link href="/features" className='text-gray-400 hover:text-blue-400 transition-colors'>Features</Link></li>
              <li><Link href="/pricing" className='text-gray-400 hover:text-blue-400 transition-colors'>Pricing</Link></li>
              <li><Link href="/faq" className='text-gray-400 hover:text-blue-400 transition-colors'>FAQ</Link></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className='text-white text-lg font-semibold mb-4'>Legal</h3>
            <ul className='flex flex-col gap-2'>
              <li><Link href="/terms" className='text-gray-400 hover:text-blue-400 transition-colors'>Terms of Service</Link></li>
              <li><Link href="/privacy" className='text-gray-400 hover:text-blue-400 transition-colors'>Privacy Policy</Link></li>
              <li><Link href="/cookies" className='text-gray-400 hover:text-blue-400 transition-colors'>Cookie Policy</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className='text-white text-lg font-semibold mb-4'>Contact</h3>
            <ul className='flex flex-col gap-2'>
              <li className='text-gray-400'>Email: <a href="mailto:contact@yt-summarizer.com" className='hover:text-blue-400 transition-colors'>contact@yt-summarizer.com</a></li>
              <li className='text-gray-400'>Twitter: <a href="https://twitter.com/ytsummarizer" target="_blank" rel="noopener noreferrer" className='hover:text-blue-400 transition-colors'>@ytsummarizer</a></li>
            </ul>
          </div>
        </div>
        
        <div className='mt-12 pt-6 border-t border-gray-800 text-center text-gray-500'>
          <p>© {currentYear} YouTube-Summarizer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
