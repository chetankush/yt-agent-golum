import React from 'react'
import YouTube3DIcon from './YouTube3DIcon'
import { 
  Zap, 
  Filter, 
  ShoppingBag, 
  Clock
} from 'lucide-react'
// import AnimatedSearchBar from './AnimatedSearchBar'
import YoutubeVideoForm from './YoutubeVideoForm'

const HeroSection = () => {
    const features = [
        {
            icon: Zap,
            title: 'Instant Video Insights',
            description: 'AI extracts key points from YouTube reviews so you don\'t have to watch hours of content.',
            iconColor: 'text-blue-400',
            iconBg: 'bg-white/5'
        },
        {
            icon: ShoppingBag,
            title: 'Cross-Platform Search',
            description: 'Compare products across Amazon, Flipkart, Croma, Myntra, and more in one place.',
            iconColor: 'text-blue-400',
            iconBg: 'bg-white/5'
        },
        {
            icon: Filter,
            title: 'Smart Budget Filtering',
            description: 'Find the perfect product that matches both your needs and your budget.',
            iconColor: 'text-blue-400',
            iconBg: 'bg-white/5'
        },
        {
            icon: Clock,
            title: 'Save Research Time',
            description: 'Cut your product research time from hours to minutes with AI-powered analysis.',
            iconColor: 'text-blue-400',
            iconBg: 'bg-white/5'
        }
    ]

    return (
        <div className='min-h-screen dark'>
            {/* hero section */}
            <section className='relative w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden'>
                {/* Subtle background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>
                
                {/* Animated particles or light effect */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
                </div>
                
                <div className='container mx-auto px-4 z-10 flex flex-col items-center justify-center gap-12'>
                    <div className='flex flex-col items-center justify-center gap-6 animate-soft-appear'>
                        <div className="animate-subtle-float">
                            <YouTube3DIcon size="medium" />
                        </div>

                        <h1 className='text-4xl sm:text-5xl md:text-6xl font-semibold text-white text-center max-w-3xl leading-tight tracking-tight'>
                            Research. Compare. <span className="text-primary bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Decide.</span>
                        </h1>

                            
                        {/* Search bar - properly positioned */}
                        <div className="w-full max-w-2xl mt-4">
                            <YoutubeVideoForm />
                        </div>
                        
                        <p className='text-lg sm:text-xl text-gray-300 max-w-xl text-center tracking-tight mb-6'>
                            The AI-powered research assistant that summarizes YouTube reviews and compares products across platforms.
                        </p>
                    
                    </div>
                    
                    {/* Trust indicators */}
                    <div className="flex flex-wrap justify-center gap-6 mt-8 text-gray-400 text-sm">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Save hours of research time</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            <span>Instant video insights</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4" />
                            <span>Compare across platforms</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* features section */}
            <section className='w-full flex flex-col items-center justify-center px-4 py-32 bg-black'>
                <div className='flex flex-col items-center justify-center gap-4 mb-20'>
                    <h2 className='text-4xl md:text-5xl font-semibold text-white text-center tracking-tight'>
                        One Search. <span className="text-primary">Complete Research.</span>
                    </h2>
                    <p className='text-xl text-gray-300 text-center max-w-xl mt-4 tracking-tight'>
                        Save hours on your product research with AI-powered insights
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className='flex flex-col p-8 apple-card hover:bg-white/[0.15] transition-all duration-300 rounded-2xl'>
                            <div 
                             className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${feature.iconBg}`}>
                                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                            </div>
                            <h3 className='text-xl font-medium text-white mb-3 tracking-tight'>
                                {feature.title}
                            </h3>
                            <p className='text-gray-300 text-base tracking-tight'>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* example section */}
            <section className='w-full flex flex-col items-center justify-center px-4 py-32 bg-black'>
                <div className='max-w-6xl mx-auto'>
                    <div className='flex flex-col items-center text-center mb-20'>
                        <h2 className='text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight'>
                            <span className="text-primary">Smart Results.</span> Better Decisions.
                        </h2>
                        <p className='text-xl text-gray-300 max-w-xl mt-4 tracking-tight'>
                            From video reviews to side-by-side comparisons in seconds
                        </p>
                    </div>
                    
                    <div className='apple-card rounded-3xl p-8 overflow-hidden'>
                        <div className='flex flex-col lg:flex-row gap-10'>
                            <div className='flex-1'>
                                <h3 className='text-xl font-medium text-white mb-6 tracking-tight'>Video Summary</h3>
                                <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-5 h-[380px] flex flex-col'>
                                    <div className='border-b border-white/10 pb-4 mb-4'>
                                        <h4 className='text-lg font-medium text-white'>Sony WH-1000XM4</h4>
                                        <p className='text-gray-400 text-sm'>Source: MKBHD (YouTube)</p>
                                    </div>
                                    <div className='overflow-y-auto text-left'>
                                        <h5 className='text-blue-400 font-medium mb-3 text-base'>Key Points:</h5>
                                        <ul className='text-gray-300 text-base space-y-3'>
                                            <li>• Outstanding noise cancellation performance</li>
                                            <li>• 30-hour battery life with quick charging</li>
                                            <li>• Improved comfort compared to previous model</li>
                                            <li>• Multi-device connection capability</li>
                                            <li>• Enhanced sound quality with DSEE Extreme</li>
                                        </ul>
                                        
                                        <h5 className='text-blue-400 font-medium mb-3 text-base mt-6'>Pros:</h5>
                                        <ul className='text-green-300 text-base space-y-2'>
                                            <li>• Best-in-class noise cancellation</li>
                                            <li>• Excellent sound quality</li>
                                            <li>• Comfortable for long listening sessions</li>
                                        </ul>
                                        
                                        <h5 className='text-blue-400 font-medium mb-3 text-base mt-6'>Cons:</h5>
                                        <ul className='text-red-300 text-base space-y-2'>
                                            <li>• Touch controls can be finicky</li>
                                            <li>• No water resistance rating</li>
                                            <li>• Call quality could be better</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='flex-1'>
                                <h3 className='text-xl font-medium text-white mb-6 tracking-tight'>Price Comparison</h3>
                                <div className='bg-white/5 backdrop-blur-lg rounded-2xl p-5 h-[380px] overflow-auto'>
                                    <table className='w-full text-left text-base'>
                                        <thead>
                                            <tr className='border-b border-white/10'>
                                                <th className='pb-4 text-gray-400 font-medium'>Platform</th>
                                                <th className='pb-4 text-gray-400 font-medium'>Price</th>
                                                <th className='pb-4 text-gray-400 font-medium'>Rating</th>
                                                <th className='pb-4 text-gray-400 font-medium'>Offer</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-gray-300'>
                                            <tr className='border-b border-white/5'>
                                                <td className='py-4 font-medium text-blue-400'>Amazon</td>
                                                <td>$298</td>
                                                <td>4.7 ⭐</td>
                                                <td>10% cashback</td>
                                            </tr>
                                            <tr className='border-b border-white/5'>
                                                <td className='py-4 font-medium text-blue-400'>Flipkart</td>
                                                <td>$310</td>
                                                <td>4.6 ⭐</td>
                                                <td>Free earbuds</td>
                                            </tr>
                                            <tr className='border-b border-white/5'>
                                                <td className='py-4 font-medium text-blue-400'>Croma</td>
                                                <td>$305</td>
                                                <td>4.5 ⭐</td>
                                                <td>2yr warranty</td>
                                            </tr>
                                            <tr className='border-b border-white/5'>
                                                <td className='py-4 font-medium text-blue-400'>Official Store</td>
                                                <td>$349</td>
                                                <td>4.8 ⭐</td>
                                                <td>Free shipping</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                    <div className="mt-6 border-t border-white/10 pt-6">
                                        <h4 className="text-lg font-medium text-white mb-4">Similar Products</h4>
                                        <div className="flex flex-col space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-300">Bose QC45</span>
                                                <span className="text-blue-400">$329</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-300">Apple AirPods Max</span>
                                                <span className="text-blue-400">$549</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-300">Sennheiser Momentum 4</span>
                                                <span className="text-blue-400">$349</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='w-full flex flex-col items-center justify-center px-4 py-32 bg-black'>
                <div className='max-w-xl mx-auto text-center'>
                    <h2 className='text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight'>
                        Make Smarter Buying Decisions
                    </h2>
                    <p className='text-xl text-gray-300 mb-10 max-w-lg mx-auto tracking-tight'>
                        Stop wasting hours watching videos and comparing prices. Get the insights you need in minutes.
                    </p>
                    <button className='apple-button bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full transition-all text-lg font-medium'>
                        Get Started
                    </button>
                </div>
            </section>
        </div>
    )
}

export default HeroSection
