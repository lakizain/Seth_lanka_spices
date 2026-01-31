'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const collections = [
  {
    title: 'The Heat',
    description: 'Red Chili, Black Pepper, and Mustard Seeds',
    image: '/chili-powder.jpg',
    href: '#heat',
  },
  {
    title: 'Pure Aroma',
    description: 'Green Cardamom, Cloves, and Star Anise',
    image: '/cardamom.jpg',
    href: '#aroma',
  },
  {
    title: 'Earthy Roots',
    description: 'Turmeric, Ginger, and Coriander',
    image: '/turmeric.jpg',
    href: '#roots',
  },
]

export function DiscoveryCollection() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2 animate-fade-up">
              Discovery Collection
            </h2>
            <p className="text-muted-foreground animate-fade-up [animation-delay:100ms]">
              Explore our curated collections by flavor profile
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="gap-2 text-primary hover:text-primary/80 animate-fade-up [animation-delay:200ms]"
            asChild
          >
            <Link href="#all-collections">
              View All Collections
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <Link
              key={collection.title}
              href={collection.href}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-lg transition-all hover:shadow-2xl animate-fade-up"
              style={{ animationDelay: `${index * 100 + 300}ms` }}
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-serif text-2xl mb-2">{collection.title}</h3>
                <p className="text-sm text-white/80 mb-4">{collection.description}</p>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium transition-transform group-hover:translate-x-1">
                  Explore Collection
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
