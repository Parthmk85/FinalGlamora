'use client'
import React from 'react'
import Image from 'next/image'

const Community = () => {
  const team = [
    { name: "Dianne Russell", role: "Co-Founder & CEO", img: "/assets/About-C1.jpg" },
    { name: "Wade Warren", role: "Co-Founder & CTO", img: "/assets/About-C2.jpg" },
    { name: "Esther Howard", role: "Vice President", img: "/assets/About-C3.jpg" },
    { name: "Mike Simmons", role: "Partner & CFO", img: "/assets/About-C4.jpg" },
    { name: "Ralph Edwards", role: "Product Designer", img: "/assets/About-C5.jpg" },
    { name: "Savannah Nguyen", role: "Marketing Head", img: "/assets/About-C6.jpg" },
  ]

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto font-satoshi text-black">
        <h2 className="text-2xl font-extrabold uppercase mb-8 text-black">Meet Our Community</h2>
        <div className="bg-[#f5f5f5] rounded-3xl p-8 sm:p-12 md:p-16 text-center">
            {/* Header */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#2d2d2d]">
              Passionate. Proactive. Expert.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-16 leading-relaxed">
              We lead with care — our core value — and a shared passion for connecting the world.
            </p>

            {/* Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                {team.map((member, i) => (
                    <div key={i} className="flex flex-col items-center group">
                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-5 overflow-hidden rounded-full shadow-md transition-transform duration-300 group-hover:scale-105">
                            <Image 
                                src={member.img}
                                alt={member.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#2d2d2d] mb-1">
                            {member.name}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-500 font-medium">
                            {member.role}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Community
