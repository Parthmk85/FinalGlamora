'use client'
import React from 'react'
import Link from 'next/link'
import AboutHero from '../components/about/AboutHero'
import OurStory from '../components/about/OurStory'
import OurPhilosophy from '../components/about/OurPhilosophy'
import Community from '../components/about/Community'

const About = () => {
  return (
    <div>
      <br />
      <main className='bg-[#f5f5f5] rounded-3xl max-w-6xl xl:max-w-7xl 2xl:max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 md:py-8'>
          <div className='bg-white rounded-2xl p-3 sm:p-4'>
            {/* Breadcrumb */}
            <div className="mb-6 text-black">
                <div className="flex items-center gap-2 text-sm">
                    <Link href="/" className="text-black hover:underline font-medium">Home</Link>
                    <span className="text-black">/</span>
                    <span className="text-black font-semibold">About Us</span>
                </div>
            </div>

          <AboutHero />
          <OurStory />
          <OurPhilosophy />
          <Community />
          </div>
      </main>
    </div>
  )
}

export default About
