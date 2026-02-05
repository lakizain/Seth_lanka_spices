'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Check, ArrowRight } from 'lucide-react'

type Product = {
  id: number
  name: string
  flavor: string
  price: number
  image: string
  badge?: string | null
  category?: string | null
}

const flavorProfiles = [
  { name: 'Zesty', count: 12 },
  { name: 'Earthy', count: 18 },
  { name: 'Piquant', count: 8 },
  { name: 'Sweet', count: 9 },
]

export default function ProductsPage() {
  const [priceRange, setPriceRange] = useState([5, 50])
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>('Earthy')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/products', { cache: 'no-store' })
        const data = await res.json()
        setProducts(data)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#faf2eb]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 md:px-6">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-4">
            Our Spice Collection
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Discover the vibrant flavors of Sri Lanka. From the mists of the central highlands to your
            kitchen, our ethically sourced spices bring authentic soul to every meal.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-10">
            {/* Flavor Profile */}
            <div>
              <h3 className="font-medium text-xs tracking-wider text-muted-foreground uppercase mb-4">
                Flavor Profile
              </h3>
              <div className="space-y-2">
                {flavorProfiles.map((flavor) => (
                  <button
                    key={flavor.name}
                    onClick={() => setSelectedFlavor(flavor.name)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors ${
                      selectedFlavor === flavor.name
                        ? 'bg-primary text-primary-foreground font-medium shadow-md'
                        : 'bg-white hover:bg-white/80 text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {/* Icon placeholder logic or actual icons could go here */}
                      <span>{flavor.name.toUpperCase()}</span>
                    </div>
                    <span>{flavor.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium text-xs tracking-wider text-muted-foreground uppercase mb-4">
                Price Range
              </h3>
              <div className="px-1">
                <Slider
                  defaultValue={[5, 50]}
                  max={100}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground font-medium">
                  <span>${priceRange[0].toFixed(2)}</span>
                  <span>${priceRange[1].toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Heritage Blend Card */}
            <div className="bg-[#f0f0e8] p-6 rounded-xl border border-border/50">
              <h3 className="font-serif text-xl text-foreground mb-2">Heritage Blend</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Get our curated monthly discovery box for only $29.00/mo.
              </p>
              <Link
                href="#"
                className="text-xs font-bold text-primary tracking-wider uppercase hover:underline flex items-center gap-1"
              >
                Learn More <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Sort & Count */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
              <p className="text-sm text-muted-foreground">
                Showing 1-12 of 18 results
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground uppercase tracking-wider text-xs font-medium">Sort by:</span>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px] border-none bg-transparent shadow-none text-foreground font-medium focus:ring-0">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Best Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
              {loading && (
                <div className="col-span-full text-center text-muted-foreground">Loading...</div>
              )}
              {!loading && products.map((product) => (
                <Card key={product.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow duration-300 group bg-white">
                  <div className="relative aspect-square bg-[#f5f5f5]">
                    {product.badge && (
                      <Badge className="absolute top-4 left-4 z-10 bg-primary/90 hover:bg-primary text-white font-medium text-[10px] uppercase tracking-wider px-3 py-1">
                        {product.badge}
                      </Badge>
                    )}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-2">
                      <h3 className="font-serif text-xl text-foreground mb-1">{product.name}</h3>
                      <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                        {product.flavor}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="font-semibold text-lg text-foreground">
                        ${product.price.toFixed(2)}
                      </span>
                      {/* Optional Add to Cart Button could go here, or simple icon */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" className="hover:bg-transparent" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive className="bg-primary text-white hover:bg-primary/90 hover:text-white rounded-full h-10 w-10">
                    01
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className="hover:bg-transparent rounded-full h-10 w-10">
                    02
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className="hover:bg-transparent rounded-full h-10 w-10">
                    03
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" className="hover:bg-transparent" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
