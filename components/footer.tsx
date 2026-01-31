'use client'

import { Button } from '@/components/ui/button'
import { MapPin, Mail, Phone, Facebook, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative text-white" style={{ backgroundColor: '#140e08' }}>
      <div className="container px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="inline-block p-3 rounded-lg bg-white shadow-[0_0_20px_rgba(123,192,67,0.3)]">
              <Image src="/logo.png" alt="Seth Lanka Spices" width={80} height={80} className="w-20 h-auto" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              At Seth Lanka Spices, we take pride in bringing the soul of our nation&apos;s spice heritage to your kitchen
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About Us', href: '#about' },
                { label: 'Our Products', href: '#products' },
                { label: 'Our Gallery', href: '#gallery' },
                { label: 'Contact Us', href: '#contact' }
              ].map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href} 
                    className="text-sm flex items-center gap-2 hover:text-primary transition-colors group"
                  >
                    <span className="text-primary group-hover:translate-x-1 transition-transform">›</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  Location: No. 16, Weliwaththa, Thotagamuwa, Matale
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <a href="mailto:info@sethspices.com" className="text-sm hover:text-primary transition-colors">
                  Email: info@sethspices.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <a href="tel:0762402176" className="text-sm hover:text-primary transition-colors">
                  Call: 0762402176
                </a>
              </li>
            </ul>
            
            <div className="mt-6">
              <Button 
                variant="default" 
                size="icon"
                className="h-10 w-10 bg-secondary hover:bg-secondary/90 text-white"
                asChild
              >
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-secondary hover:bg-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-6 w-6" />
      </button>
    </footer>
  )
}
