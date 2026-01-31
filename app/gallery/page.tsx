import { Header } from '@/components/header'
import { GallerySection } from '@/components/gallery-section'
import { Footer } from '@/components/footer'

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <GallerySection />
      <Footer />
    </main>
  )
}
