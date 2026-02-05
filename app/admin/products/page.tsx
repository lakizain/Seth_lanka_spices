'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'

type Product = {
  id: number
  name: string
  flavor: string
  price: number
  image: string
  badge?: string | null
  category?: string | null
}

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({
    name: '',
    flavor: '',
    price: '',
    image: '',
    badge: '',
    category: '',
  })

  const resetForm = () => {
    setForm({ name: '', flavor: '', price: '', image: '', badge: '', category: '' })
    setEditingId(null)
  }

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/products', { cache: 'no-store' })
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const submit = async () => {
    const payload = {
      name: form.name,
      flavor: form.flavor,
      price: Number(form.price) || 0,
      image: form.image || '/placeholder.jpg',
      badge: form.badge || null,
      category: form.category || null,
      id: editingId ?? undefined,
    }
    const res = await fetch('/api/products', {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      resetForm()
      await load()
    }
  }

  const edit = (p: Product) => {
    setEditingId(p.id)
    setForm({
      name: p.name ?? '',
      flavor: p.flavor ?? '',
      price: String(p.price ?? ''),
      image: p.image ?? '',
      badge: p.badge ?? '',
      category: p.category ?? '',
    })
  }

  const remove = async (id: number) => {
    const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' })
    if (res.ok) await load()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Admin: Products</h1>

        <Card className="mb-8">
          <CardContent className="p-6 grid md:grid-cols-3 gap-4">
            <Input placeholder="Name" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
            <Input placeholder="Flavor" value={form.flavor} onChange={(e) => setForm(f => ({ ...f, flavor: e.target.value }))} />
            <Input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))} />
            <Input placeholder="Image URL (/path.jpg)" value={form.image} onChange={(e) => setForm(f => ({ ...f, image: e.target.value }))} />
            <Input placeholder="Badge (optional)" value={form.badge} onChange={(e) => setForm(f => ({ ...f, badge: e.target.value }))} />
            <Input placeholder="Category (optional)" value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))} />
            <div className="flex gap-2">
              <Button onClick={submit}>{editingId ? 'Update' : 'Add'}</Button>
              {editingId && <Button variant="secondary" onClick={resetForm}>Cancel</Button>}
            </div>
          </CardContent>
        </Card>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Flavor</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6}>Loading...</TableCell></TableRow>
              ) : items.length === 0 ? (
                <TableRow><TableCell colSpan={6}>No products</TableCell></TableRow>
              ) : (
                items.map(p => (
                  <TableRow key={p.id}>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.flavor}</TableCell>
                    <TableCell>${p.price?.toFixed(2)}</TableCell>
                    <TableCell>{p.category}</TableCell>
                    <TableCell className="space-x-2">
                      <Button size="sm" variant="secondary" onClick={() => edit(p)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => remove(p.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
      <Footer />
    </div>
  )
}
