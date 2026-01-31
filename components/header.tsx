'use client'

import { ShoppingCart, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
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
            href="/#products" 
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

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 relative">
            <ShoppingCart className="h-4 w-4" />
            <Badge 
              variant="default" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground"
            >
              2
            </Badge>
            <span className="sr-only">Shopping cart with 2 items</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
