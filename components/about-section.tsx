'use client'

import { useEffect, useState } from 'react'

export function AboutSection() {
  const [bgImage, setBgImage] = useState('')

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data?.home?.aboutImage) setBgImage(data.home.aboutImage)
      })
      .catch(err => console.error('Failed to load settings', err))
  }, [])

  return (
    <section id="about" className="py-20 md:py-32 px-6 bg-background relative overflow-hidden">
      {bgImage && (
        <div 
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}
      <div className="container max-w-4xl mx-auto text-center relative z-10">
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-primary mb-6 font-medium animate-fade-up">
          Sourced in Sri Lanka
        </p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-8 text-balance animate-fade-up [animation-delay:100ms]">
          Ethically sourced from the misty central highlands, our spices are hand-picked to bring the vibrant aromas of the island to your kitchen.
        </h2>
      </div>
    </section>
  )
}
