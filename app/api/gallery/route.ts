import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'data', 'gallery.json')

async function readItems() {
  const buf = await fs.readFile(DATA_PATH, 'utf-8')
  return JSON.parse(buf)
}

async function writeItems(items: any[]) {
  await fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2), 'utf-8')
}

export async function GET() {
  try {
    const items = await readItems()
    return NextResponse.json(items)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to read' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const items = await readItems()
    const id = body?.id ?? Date.now()
    const item = { ...body, id }
    items.push(item)
    await writeItems(items)
    return NextResponse.json(item, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to create' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id } = body
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    const items = await readItems()
    const idx = items.findIndex((p: any) => p.id === id)
    if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 })
    items[idx] = { ...items[idx], ...body }
    await writeItems(items)
    return NextResponse.json(items[idx])
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url)
    const idParam = url.searchParams.get('id')
    const id = idParam ? Number(idParam) : null
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
    const items = await readItems()
    const next = items.filter((p: any) => p.id !== id)
    await writeItems(next)
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to delete' }, { status: 500 })
  }
}
