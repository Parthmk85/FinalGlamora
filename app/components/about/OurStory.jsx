'use client'
import React from 'react'

const OurStory = () => {
  const stories = [
    {
      title: "CRAFTSMANSHIP",
      text: "Crafted take ovate padre the text; eronot and the reestors. Til the incand inroad hatant time to mied sasse tery bones i acend tem the swarry eanty."
    },
    {
      title: "MODERNITY",
      text: "Woony Guliee lieng thee vesser an hid sers ess theed tiner doos lecons thead brei fev those presn bet cod to tr nine ondarmeg bomedt me ht erted bind fracterd ene see."
    },
    {
      title: "SUSTAINABILITY",
      text: "The stone the stiles weed prese rs it ever tend sear bri crescanc's inerpand cond secriet we boxe d'ea'bt hesh dont to tres post need"
    }
  ]

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto font-satoshi">
      <h2 className="text-2xl font-extrabold uppercase mb-8 text-black">Our Story</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <div key={index} className="bg-[#f9f9f9] p-8 rounded-2xl">
             <h3 className="text-lg font-bold uppercase mb-4 text-black">{story.title}</h3>
             <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
               {story.text}
             </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurStory
