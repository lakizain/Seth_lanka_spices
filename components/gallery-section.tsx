'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Flame, Leaf, Droplet, Candy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

const flavorProfiles = [
  { id: 'zesty', label: 'Zesty', icon: Droplet, count: 12 },
  { id: 'earthy', label: 'Earthy', icon: Leaf, count: 18 },
  { id: 'piquant', label: 'Piquant', icon: Flame, count: 8 },
  { id: 'sweet', label: 'Sweet', icon: Candy, count: 9 },
]

type GalleryItem = {
  id: number
  name: string
  latinName?: string
  price?: number
  description?: string
  tags?: string[]
  image: string
}

export function GallerySection() {
  const [selectedFlavor, setSelectedFlavor] = useState('earthy')
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/gallery', { cache: 'no-store' })
        const data = await res.json()
        setItems(data)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section id="gallery" className="relative min-h-screen py-20 bg-background">
      <div className="container px-6">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Flavor Profile */}
            <div>
              <h3 className="text-xs font-bold tracking-wider mb-4 text-foreground/80">
                FLAVOR PROFILE
              </h3>
              <div className="space-y-2">
                {flavorProfiles.map((flavor) => {
                  const Icon = flavor.icon
                  const isSelected = selectedFlavor === flavor.id
                  return (
                    <button
                      key={flavor.id}
                      onClick={() => setSelectedFlavor(flavor.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground font-semibold shadow-md' 
                          : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        <span className="text-sm uppercase tracking-wide">{flavor.label}</span>
                      </div>
                      <span className="text-xs">{flavor.count}</span>
                    </button>
                  )
                })}
              </div>
            </div>




          </aside>

          {/* Main Content */}
          <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
                  Gallery
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Deep, grounding spices harvested from the fertile soils of Sri Lanka&apos;s central highlands
                </p>
              </div>

            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {loading && (
                <div className="col-span-full text-center text-muted-foreground">Loading...</div>
              )}
              {!loading && items.map((product) => (
                <div key={product.id} className="group bg-card rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-border/50">
                  <div className="bg-muted rounded-xl overflow-hidden aspect-square relative">
                    {/* Space for product image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  
 
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i + 1}
                  variant="ghost"
                  size="icon"
                  className={`h-10 w-10 rounded-full font-bold ${
                    currentPage === i + 1 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {String(i + 1).padStart(2, '0')}
                </Button>
              ))}
              
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
