import React from 'react'
import YouTube3DIcon from './YouTube3DIcon'
import { 
  Zap, 
  Clock, 
  Search, 
  PenTool, 
  Lightbulb, 
  TrendingUp,
  ChevronRight,
  Link as LinkIcon,
  PlayCircle,
  FileText,
  Share2
} from 'lucide-react'

const HeroSection = () => {
    const features = [
        {
            icon: Zap,
            title: 'Fast and Accurate',
            description: 'Get instant summaries of your favorite YouTube videos with our AI-powered summarizer, saving you hours of watching time.',
            iconColor: 'text-yellow-400',
            iconBg: 'bg-yellow-900/40'
        },
        {
            icon: Clock,
            title: 'Time-Saving',
            description: 'No more wasting time on lengthy videos. Extract key insights in seconds and decide if the full content is worth your time.',
            iconColor: 'text-blue-400',
            iconBg: 'bg-blue-900/40'
        },
        {
            icon: Search,
            title: 'Content Discovery',
            description: 'Quickly scan through summaries of multiple videos to find exactly the information you need without endless searching.',
            iconColor: 'text-purple-400',
            iconBg: 'bg-purple-900/40'
        },
        {
            icon: PenTool,
            title: 'Custom Formatting',
            description: 'Get summaries in your preferred format - bullet points, paragraphs, or key takeaways - tailored to your learning style.',
            iconColor: 'text-green-400',
            iconBg: 'bg-green-900/40'
        },
        {
            icon: Lightbulb,
            title: 'Knowledge Retention',
            description: 'Enhance your learning with concise summaries that highlight the most important concepts for better retention and recall.',
            iconColor: 'text-orange-400',
            iconBg: 'bg-orange-900/40'
        },
        {
            icon: TrendingUp,
            title: 'Research Efficiency',
            description: 'Perfect for researchers, students, and professionals who need to extract insights from multiple video sources quickly.',
            iconColor: 'text-red-400',
            iconBg: 'bg-red-900/40'
        }
    ]

    const steps = [
        {
            number: '01',
            icon: LinkIcon,
            title: 'Paste YouTube URL',
            description: 'Copy and paste the URL of any YouTube video you want to summarize into our input field.',
            iconColor: 'text-blue-400',
            iconBg: 'bg-blue-900/40'
        },
        {
            number: '02',
            icon: PlayCircle,
            title: 'AI Processes Video',
            description: 'Our advanced AI analyzes the video content, extracting key information and insights.',
            iconColor: 'text-purple-400',
            iconBg: 'bg-purple-900/40'
        },
        {
            number: '03',
            icon: FileText,
            title: 'Get Your Summary',
            description: 'Receive a concise, well-structured summary of the video content within seconds.',
            iconColor: 'text-green-400',
            iconBg: 'bg-green-900/40'
        },
        {
            number: '04',
            icon: Share2,
            title: 'Save & Share',
            description: 'Save your summary for future reference or share it with colleagues, friends, or classmates.',
            iconColor: 'text-orange-400',
            iconBg: 'bg-orange-900/40'
        }
    ]

    return (
        <div className='min-h-screen dark'>

            {/* hero section */}
            <section className='relative w-full flex flex-col items-center justify-center py-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden'>
                {/* Background glow effects */}
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full filter blur-[100px]"></div>
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full filter blur-[100px]"></div>
                
                <div className='flex flex-col items-center justify-center mx-4 z-10'>
                    <div className='flex flex-col items-center justify-center gap-8 perspective'>
                        <div className="mb-4">
                            <YouTube3DIcon size="large" />
                        </div>

                        <h1 className='text-5xl font-bold text-white text-center'>
                            Unlock Your Video Insights with AI Summarization
                        </h1>

                        <span className='bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text text-3xl font-semibold text-center'>
                            Instantly Summarize Your YouTube Videos
                        </span>

                        <p className='text-gray-300 text-lg max-w-2xl text-center'>
                            Explore the power of AI-driven video summarization. Get concise, accurate summaries of your favorite YouTube videos in seconds.
                        </p>
                    </div>

                    {/* youtube video form */}
                    <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 w-full max-w-2xl'>
                        <input 
                            type='text' 
                            placeholder='Enter your YouTube video URL' 
                            className='w-full px-4 py-3 rounded-lg glass-effect focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400'
                        />

                        <button className='bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all flex items-center gap-2 whitespace-nowrap'>
                            Summarize
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </section>

            {/* features section */}
            <section className='w-full flex flex-col items-center justify-center px-4 py-16 bg-black'>
                <div className='flex flex-col items-center justify-center gap-8 mb-12'>
                    <h2 className='text-4xl font-bold text-white'>
                        Features
                    </h2>
                    <p className='text-gray-400 text-center max-w-2xl'>
                        Our AI-powered YouTube summarizer offers powerful features to help you save time and extract value from video content
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
                     
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className='flex flex-col items-left justify-center text-left p-6 glass-card rounded-xl hover:shadow-blue-500/10 hover:scale-[1.02] transition-all'>
                            <div 
                             className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.iconBg}`}>
                                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                            </div>
                            <h3 className='text-2xl font-bold text-white mb-3'>
                                {feature.title}
                            </h3>
                            <p className='text-gray-300 text-lg text-left'>
                                {feature.description}
                            </p>
                        </div>
                    ))}

                </div>
            </section>

            {/* how it works section */}
            <section className='w-full flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden'>
                {/* Background glow effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full filter blur-[120px]"></div>
                
                <div className='flex flex-col items-center justify-center gap-8 mb-12 z-10'>
                    <h2 className='text-4xl font-bold text-white'>
                        How It Works
                    </h2>
                    <p className='text-gray-400 text-center max-w-2xl'>
                        Get started with our YouTube summarizer in just a few simple steps
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto z-10'>
                    {steps.map((step) => (
                        <div
                            key={step.title}
                            className='flex flex-col items-left justify-center text-left p-6 glass-card rounded-xl relative overflow-hidden group'>
                            {/* Number in background */}
                            <span className='absolute -right-4 -top-6 text-[80px] font-bold text-white/5 group-hover:text-white/10 transition-colors'>
                                {step.number}
                            </span>
                            
                            <div 
                             className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${step.iconBg} z-10`}>
                                <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                            </div>
                            <h3 className='text-2xl font-bold text-white mb-3 z-10'>
                                {step.title}
                            </h3>
                            <p className='text-gray-300 text-lg text-left z-10'>
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
                
                <div className='mt-12 z-10'>
                    <button className='bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg hover:opacity-90 transition-all flex items-center gap-2 text-lg font-medium'>
                        Get Started Now
                        <ChevronRight size={20} />
                    </button>
                </div>
            </section>

        </div>
    )
}

export default HeroSection
