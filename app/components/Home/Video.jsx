'use client'
import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const Video = ({ src = '/assets/video.mp4', poster = '/assets/video.mp4' }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.currentTime = 0  // Newly start from beginning
            video.play()
          } else {
            video.pause() // Stop when leaving view
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="w-full">
      <div className="w-full aspect-video relative overflow-hidden">

        {/* VIDEO PLAYER */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          playsInline
          autoPlay
          loop
          muted
          controls
          className="w-full h-full object-cover"
        />

      </div>
    </section>
  )
}

export default Video
