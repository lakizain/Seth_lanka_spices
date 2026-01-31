'use client'

import { useState } from 'react'
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

const regions = [
  'Kandy Highlands',
  'Matale Valley',
  'Southern Coast',
]

const products = [
  {
    id: 1,
    name: 'True Turmeric Powder',
    latinName: 'Curcuma longa',
    price: 12.00,
    description: 'Finely ground, sun-dried roots from the Matale region.',
    tags: ['HIGH CURCUMIN', '100G JAR'],
    image: '/turmeric.jpg',
  },
  {
    id: 2,
    name: 'Ceylon Cinnamon Quills',
    latinName: 'Cinnamomum verum',
    price: 15.00,
    description: 'Delicate, hand-rolled layers of inner bark with a sweet aroma.',
    tags: ['HERITAGE GRADE', '50G TUBE'],
    image: '/cinnamon-sticks.jpg',
  },
  {
    id: 3,
    name: 'Crushed Red Chili',
    latinName: 'Capsicum annuum',
    price: 9.00,
    description: 'Slow-roasted peppers packed with fiery flavor.',
    tags: ['ARTISANAL ROAST', '80G POUCH'],
    image: '/chili-powder.jpg',
  },
  {
    id: 4,
    name: 'Organic Black Pepper',
    latinName: 'Piper nigrum',
    price: 11.00,
    description: 'High-piperine content harvested from highland estate farms.',
    tags: ['ESTATE GROWN', '120G GRINDER'],
    image: '/cardamom.jpg',
  },
  {
    id: 5,
    name: 'Green Cardamom Pods',
    latinName: 'Elettaria cardamomum',
    price: 18.50,
    description: 'Hand-picked green capsules with a floral, citrusy profile.',
    tags: ['PREMIUM GRADE', '40G GLASS'],
    image: '/cardamom.jpg',
  },
  {
    id: 6,
    name: 'Cloves from Kandy',
    latinName: 'Syzygium aromaticum',
    price: 14.00,
    description: 'Pungent flower buds sun-dried in the misty hills of Kandy.',
    tags: ['SINGLE SOURCE', '60G JAR'],
    image: '/chili-powder.jpg',
  },
]

export function GallerySection() {
  const [selectedFlavor, setSelectedFlavor] = useState('earthy')
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3

  return (
    <section id="gallery" className="relative min-h-screen py-20" style={{ 
      background: 'linear-gradient(135deg, #E8956F 0%, #D4845C 50%, #E8956F 100%)'
    }}>
      <div className="container px-6">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Flavor Profile */}
            <div>
              <h3 className="text-xs font-bold tracking-wider mb-4 text-secondary">
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
                          ? 'bg-primary text-secondary font-semibold shadow-md' 
                          : 'bg-transparent text-secondary/80 hover:bg-secondary/10'
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

            {/* Region */}
            <div>
              <h3 className="text-xs font-bold tracking-wider mb-4 text-secondary">
                REGION
              </h3>
              <div className="space-y-2">
                {regions.map((region) => (
                  <label key={region} className="flex items-center gap-3 text-sm text-secondary/80 hover:text-secondary cursor-pointer">
                    <input type="checkbox" className="rounded border-secondary/30 text-primary focus:ring-primary" />
                    <span>{region}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Curated Sets */}
            <div className="bg-secondary text-white p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Curated Sets</h3>
              <p className="text-sm text-white/80 mb-4 leading-relaxed">
                Discover our botanical pairings designed by Sri Lankan chefs.
              </p>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-secondary font-semibold text-xs tracking-wider bg-transparent"
              >
                EXPLORE HERITAGE
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-2">
                  Earthy Selections
                </h2>
                <p className="text-secondary/70 text-sm md:text-base">
                  Deep, grounding spices harvested from the fertile soils of Sri Lanka&apos;s central highlands
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wider text-secondary">SORT BY:</span>
                <select className="bg-transparent border-none text-sm font-semibold text-secondary focus:outline-none cursor-pointer">
                  <option>POPULARITY</option>
                  <option>PRICE: LOW TO HIGH</option>
                  <option>PRICE: HIGH TO LOW</option>
                  <option>NAME</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {products.map((product) => (
                <div key={product.id} className="group">
                  <div className="bg-secondary rounded-2xl overflow-hidden mb-4 aspect-square relative">
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
                  
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-secondary leading-tight">
                        {product.name}
                      </h3>
                      <span className="text-lg font-bold text-secondary shrink-0">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    
                    <p className="text-xs italic text-secondary/60">
                      {product.latinName}
                    </p>
                    
                    <p className="text-sm text-secondary/80 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {product.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className="bg-secondary/20 text-secondary text-[10px] font-bold tracking-wider hover:bg-secondary/30"
                        >
                          {tag}
                        </Badge>
                      ))}
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
                className="h-10 w-10 rounded-full bg-transparent text-secondary hover:bg-secondary/10"
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
                      ? 'bg-primary text-secondary hover:bg-primary/90' 
                      : 'bg-transparent text-secondary hover:bg-secondary/10'
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {String(i + 1).padStart(2, '0')}
                </Button>
              ))}
              
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-transparent text-secondary hover:bg-secondary/10"
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
