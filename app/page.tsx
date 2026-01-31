import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { FeaturedProduct } from '@/components/featured-product'
import { DiscoveryCollection } from '@/components/discovery-collection'
import { GallerySection } from '@/components/gallery-section'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <FeaturedProduct />
      <DiscoveryCollection />
      <GallerySection />
      <Footer />
    </main>
  )
}
