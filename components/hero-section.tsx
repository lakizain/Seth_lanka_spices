'use client'

import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [heroSettings, setHeroSettings] = useState({
    heroTitle: 'Seth Lanka Spices',
    heroSubtitle: 'The Soul of Sri Lanka',
    heroImage: ''
  })

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data?.home) {
          setHeroSettings(prev => ({ ...prev, ...data.home }))
        }
      })
      .catch(err => console.error('Failed to load settings', err))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Particle system
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    let animationId: number

    const animate = () => {
      ctx.fillStyle = 'rgba(20, 14, 8, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Green color from logo
        ctx.fillStyle = `rgba(123, 192, 67, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#140e08' }}>
      {heroSettings.heroImage && (
        <div 
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: `url(${heroSettings.heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 z-0"
      />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-up">
        <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white mb-4 tracking-tight text-balance">
          {heroSettings.heroTitle}
        </h1>
        <p className="text-sm md:text-base tracking-[0.3em] text-white/90 mb-12 uppercase">
          {heroSettings.heroSubtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white px-8 font-medium"
          >
            Explore Collections
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white/10 px-8 bg-transparent"
          >
            Our Heritage
          </Button>
        </div>
      </div>

      <button 
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="h-6 w-6" />
      </button>
    </section>
  )
}
