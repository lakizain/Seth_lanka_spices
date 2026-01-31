'use client'

import { Button } from '@/components/ui/button'
import { MapPin, Mail, Phone, Facebook, ChevronUp, MessageCircle } from 'lucide-react'
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
                { label: 'Home', href: '/#home' },
                { label: 'About Us', href: '/#about' },
                { label: 'Our Products', href: '/products' },
                { label: 'Our Gallery', href: '/gallery' },
                { label: 'Contact Us', href: '/#contact' }
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
                  Location: SETH LANKA PVT(LTD) , North marale ,Matale , sri lanka
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
                <a href="tel:+94704078647" className="text-sm hover:text-primary transition-colors">
                  Call: +94 70 407 8647
                </a>
              </li>
            </ul>
            
            <div className="mt-6 flex gap-3">
              <Button 
                variant="default" 
                size="icon"
                className="h-10 w-10 bg-[#faf2eb] hover:bg-[#faf2eb]/90 text-[#140e08]"
                asChild
              >
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
              <Button 
                variant="default" 
                size="icon"
                className="h-10 w-10 bg-[#faf2eb] hover:bg-[#faf2eb]/90 text-[#140e08]"
                asChild
              >
                <a href="https://wa.me/94704078647" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.516-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.015-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.084 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span className="sr-only">WhatsApp</span>
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
