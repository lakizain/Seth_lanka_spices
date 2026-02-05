'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function Header() {
  const [logo, setLogo] = useState('/logo.png')

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data?.site?.logo) setLogo(data.site.logo)
      })
      .catch(err => console.error('Failed to load settings', err))
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-2xl">
      <div className="container flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Image 
            src={logo} 
            alt="Seth Lanka Spices" 
            width={40} 
            height={40} 
            className="h-10 w-auto"
            onError={() => setLogo('/logo.png')} 
          />
          <span className="font-semibold text-lg tracking-tight">Seth Lanka Spices</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/#home" 
            className="text-sm font-bold transition-all duration-300 hover:text-primary hover:scale-105 inline-block"
          >
            Home
          </Link>
          <Link 
            href="/#about" 
            className="text-sm font-bold transition-all duration-300 hover:text-primary hover:scale-105 inline-block"
          >
            About Us
          </Link>
          <Link 
            href="/products" 
            className="text-sm font-bold transition-all duration-300 hover:text-primary hover:scale-105 inline-block"
          >
            Our Products
          </Link>
          <Link 
            href="/gallery" 
            className="text-sm font-bold transition-all duration-300 hover:text-primary hover:scale-105 inline-block"
          >
            Our Gallery
          </Link>
          <Link 
            href="/contact" 
            className="text-sm font-bold transition-all duration-300 hover:text-primary hover:scale-105 inline-block"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
