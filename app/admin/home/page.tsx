'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Save } from 'lucide-react'

export default function AdminHomePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [settings, setSettings] = useState({
    site: {
      logo: '',
      email: '',
      phone: '',
      location: '',
      facebook: '',
      whatsapp: ''
    },
    home: {
      heroTitle: '',
      heroSubtitle: '',
      heroImage: '',
      aboutImage: '',
      featuredProductImage: ''
    }
  })

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data) {
           // Merge with default structure to ensure all fields exist
           setSettings(prev => ({
             site: { ...prev.site, ...(data.site || {}) },
             home: { ...prev.home, ...(data.home || {}) }
           }))
        }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      if (res.ok) {
        setMessage('Settings saved successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Failed to save settings.')
      }
    } catch (error) {
      setMessage('An error occurred.')
    } finally {
      setSaving(false)
    }
  }

  const updateSite = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      site: { ...prev.site, [key]: value }
    }))
  }

  const updateHome = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      home: { ...prev.home, [key]: value }
    }))
  }

  if (loading) {
    return <div className="flex h-96 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Settings Management</h1>
          <p className="text-muted-foreground mt-2">Manage site-wide settings and home page content.</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {!saving && <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      {message && (
        <div className={`p-4 rounded-md ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}
      
      <Tabs defaultValue="site" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="site">Site Settings</TabsTrigger>
          <TabsTrigger value="home">Home Page</TabsTrigger>
        </TabsList>
        
        <TabsContent value="site">
          <Card>
            <CardHeader>
              <CardTitle>General Site Information</CardTitle>
              <CardDescription>
                Update your contact information and logo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input id="logo" value={settings.site.logo} onChange={e => updateSite('logo', e.target.value)} placeholder="/logo.png" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={settings.site.email} onChange={e => updateSite('email', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={settings.site.phone} onChange={e => updateSite('phone', e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={settings.site.location} onChange={e => updateSite('location', e.target.value)} />
              </div>
               <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook URL</Label>
                  <Input id="facebook" value={settings.site.facebook} onChange={e => updateSite('facebook', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp URL</Label>
                  <Input id="whatsapp" value={settings.site.whatsapp} onChange={e => updateSite('whatsapp', e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="home">
          <Card>
            <CardHeader>
              <CardTitle>Home Page Content</CardTitle>
              <CardDescription>
                Customize the hero section and other home page elements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">Hero Title</Label>
                <Input id="heroTitle" value={settings.home.heroTitle} onChange={e => updateHome('heroTitle', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                <Input id="heroSubtitle" value={settings.home.heroSubtitle} onChange={e => updateHome('heroSubtitle', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroImage">Hero Background Image URL</Label>
                <Input id="heroImage" value={settings.home.heroImage} onChange={e => updateHome('heroImage', e.target.value)} placeholder="/hero-bg.jpg" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aboutImage">About Section Background Image URL</Label>
                <Input id="aboutImage" value={settings.home.aboutImage} onChange={e => updateHome('aboutImage', e.target.value)} placeholder="/about-bg.jpg" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="featuredProductImage">Featured Product Image URL</Label>
                <Input id="featuredProductImage" value={settings.home.featuredProductImage} onChange={e => updateHome('featuredProductImage', e.target.value)} placeholder="/cinnamon-sticks.jpg" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
