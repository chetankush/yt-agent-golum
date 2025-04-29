import React from 'react'
import Link from 'next/link'
import YouTube3DIcon from './YouTube3DIcon'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='w-full bg-black py-16 text-gray-300 border-t border-white/5'>


      <div className='max-w-7xl mx-auto px-6'>

        <div className='flex justify-between'>
          {/* Brand */}
          <div className='col-span-2 md:col-span-1 flex flex-col gap-4 '>
            <div className='flex items-center gap-2'>
              <div className="flex -ml-8">
                <YouTube3DIcon size="small"  />
              </div>
              <h3 className='text-lg font-medium text-white tracking-tight'>
                ProductReviewAI
              </h3>
            </div>
            <p className='text-gray-400 text-sm w-full max-w-xl'>
              AI-powered research assistant that summarizes YouTube reviews and compares products across platforms.
            </p>
          </div>

          <div className='flex justify-around'>



            {/* Product */}
            <div className='flex flex-col gap-4 mr-20'>
              <h3 className='text-white text-sm font-medium tracking-tight'>Product</h3>
              <ul className='space-y-2.5'>
                <li><Link href="/pricing" className='text-gray-400 hover:text-white transition-colors text-sm'>Pricing</Link></li>
                <li><Link href="/how-it-works" className='text-gray-400 hover:text-white transition-colors text-sm'>How It Works</Link></li>
                <li><Link href="/blog" className='text-gray-400 hover:text-white transition-colors text-sm'>Blog</Link></li>
                <li><Link href="/faq" className='text-gray-400 hover:text-white transition-colors text-sm'>FAQ</Link></li>
              </ul>
            </div>



            {/* Legal */}
            <div className='' >
              <h3 className='text-white text-sm font-medium mb-4 tracking-tight'>Legal</h3>
              <ul className='space-y-2.5'>
                <li><Link href="/terms" className='text-gray-400 hover:text-white transition-colors text-sm'>Terms of Service</Link></li>
                <li><Link href="/privacy" className='text-gray-400 hover:text-white transition-colors text-sm'>Privacy Policy</Link></li>
                <li><a href="mailto:hello@productreviewai.com" className='text-gray-400 hover:text-white transition-colors text-sm'>Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className='mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-gray-500 text-xs'>© {currentYear} ProductReviewAI. All rights reserved.</p>
          <div className='flex gap-6'>
            <a href="#" className='text-gray-500 hover:text-white text-xs transition-colors'>Twitter</a>
            <a href="#" className='text-gray-500 hover:text-white text-xs transition-colors'>LinkedIn</a>
            <a href="#" className='text-gray-500 hover:text-white text-xs transition-colors'>GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
