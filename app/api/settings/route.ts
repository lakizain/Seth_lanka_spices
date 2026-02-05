import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'data', 'settings.json')

async function readSettings() {
  try {
    const buf = await fs.readFile(DATA_PATH, 'utf-8')
    return JSON.parse(buf)
  } catch (e) {
    // Return default structure if file doesn't exist
    return {
      site: {
        logo: '/logo.png',
        email: 'info@sethspices.com',
        phone: '+94 70 407 8647',
        location: 'SETH LANKA PVT(LTD) , NORTH MARALE ,MATALE , SRI LANKA',
        facebook: 'https://facebook.com',
        whatsapp: 'https://wa.me/94704078647'
      },
      home: {
        heroTitle: 'Seth Lanka Spices',
        heroSubtitle: 'The Soul of Sri Lanka'
      }
    }
  }
}

async function writeSettings(settings: any) {
  await fs.writeFile(DATA_PATH, JSON.stringify(settings, null, 2), 'utf-8')
}

export async function GET() {
  try {
    const settings = await readSettings()
    return NextResponse.json(settings)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to read settings' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const current = await readSettings()
    const newSettings = { ...current, ...body }
    await writeSettings(newSettings)
    return NextResponse.json(newSettings)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Failed to save settings' }, { status: 500 })
  }
}
