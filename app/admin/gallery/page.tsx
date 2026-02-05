'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'

type GalleryItem = {
  id: number
  name: string
  image: string
  latinName?: string
  description?: string
  tags?: string[]
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState({
    name: '',
    image: '',
    latinName: '',
    description: '',
    tags: '',
  })

  const resetForm = () => {
    setForm({ name: '', image: '', latinName: '', description: '', tags: '' })
    setEditingId(null)
  }

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/gallery', { cache: 'no-store' })
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const submit = async () => {
    const payload = {
      name: form.name,
      image: form.image || '/placeholder.jpg',
      latinName: form.latinName || undefined,
      description: form.description || undefined,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : undefined,
      id: editingId ?? undefined,
    }
    const res = await fetch('/api/gallery', {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      resetForm()
      await load()
    }
  }

  const edit = (p: GalleryItem) => {
    setEditingId(p.id)
    setForm({
      name: p.name ?? '',
      image: p.image ?? '',
      latinName: p.latinName ?? '',
      description: p.description ?? '',
      tags: p.tags?.join(', ') ?? '',
    })
  }

  const remove = async (id: number) => {
    const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
    if (res.ok) await load()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Admin: Gallery</h1>

        <Card className="mb-8">
          <CardContent className="p-6 grid md:grid-cols-3 gap-4">
            <Input placeholder="Name" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
            <Input placeholder="Image URL (/path.jpg)" value={form.image} onChange={(e) => setForm(f => ({ ...f, image: e.target.value }))} />
            <Input placeholder="Latin Name" value={form.latinName} onChange={(e) => setForm(f => ({ ...f, latinName: e.target.value }))} />
            <Input placeholder="Description" value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} />
            <Input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm(f => ({ ...f, tags: e.target.value }))} />
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
                <TableHead>Latin</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow>
              ) : items.length === 0 ? (
                <TableRow><TableCell colSpan={4}>No items</TableCell></TableRow>
              ) : (
                items.map(p => (
                  <TableRow key={p.id}>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.latinName}</TableCell>
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
