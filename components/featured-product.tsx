'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function FeaturedProduct() {
  const [image, setImage] = useState('/cinnamon-sticks.jpg')

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data?.home?.featuredProductImage) {
          setImage(data.home.featuredProductImage)
        }
      })
      .catch(err => console.error('Failed to load settings', err))
  }, [])

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group animate-fade-up">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl transform rotate-3 transition-transform group-hover:rotate-6" />
            <div className="relative bg-card rounded-3xl p-8 md:p-12 shadow-2xl transform -rotate-3 transition-transform group-hover:-rotate-6">
              <Image
                src={image}
                alt="Ceylon Cinnamon Sticks"
                width={500}
                height={500}
                className="w-full h-auto rounded-xl"
                onError={() => setImage('/cinnamon-sticks.jpg')}
              />
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:200ms]">
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-primary mb-4 font-medium">
              Spice of the Month
            </p>
            <h3 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              Ceylon Cinnamon
            </h3>
            <p className="text-lg text-muted-foreground mb-6 italic">
              Sweet, Woody, and Delicate
            </p>
            <p className="text-base leading-relaxed text-foreground/80 mb-8">
              {'Known as "True Cinnamon," our Ceylon sticks are harvested from the inner bark of the Cinnamomum verum tree. Unlike the common cassia, our cinnamon offers a complex, refined sweetness that elevates both savory and sweet dishes.'}
            </p>

            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                  Price Per Jar
                </p>
                <p className="text-3xl font-bold text-foreground">$18.00</p>
              </div>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
