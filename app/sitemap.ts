import { MetadataRoute } from 'next'
import conflicts from '@/public/data/conflicts.json'
export default function sitemap(): MetadataRoute.Sitemap {
  const conflictPages = conflicts.map(c => ({
    url: `https://why-this-war.vercel.app/conflict/${c.slug}`,
    lastModified: new Date(c.updated),
  }))
  return [
    { url: 'https://why-this-war.vercel.app', lastModified: new Date() },
    { url: 'https://why-this-war.vercel.app/about', lastModified: new Date() },
    ...conflictPages,
  ]
}
