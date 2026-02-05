'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-2xl">
      <div className="container flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Image src="/logo.png" alt="Seth Lanka Spices" width={40} height={40} className="h-10 w-auto" />
          <span className="font-semibold text-lg tracking-tight">Seth Lanka Spices</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/#home" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link 
            href="/#about" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About Us
          </Link>
          <Link 
            href="/products" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Our Products
          </Link>
          <Link 
            href="/gallery" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Our Gallery
          </Link>
          <Link 
            href="/#contact" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        {/* Icons removed */}
      </div>
    </header>
  )
}
