import conflicts from '@/public/data/conflicts.json'
import ConflictCard from '@/components/ConflictCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const tags = Array.from(new Set(conflicts.flatMap(c => c.tags)))
  return tags.map(tag => ({ tag }))
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  return { title: `#${tag} Conflicts | Why This War` }
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const tagged = conflicts.filter(c => c.tags.includes(tag))
  if (tagged.length === 0) notFound()

  return (
    <div>
      <Link href="/" className="text-sm text-blue-600 hover:underline mb-4 block">← Back to all conflicts</Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">#{tag}</h1>
      <p className="text-gray-500 mb-6">{tagged.length} conflict{tagged.length !== 1 ? 's' : ''} tagged with #{tag}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tagged.map(c => <ConflictCard key={c.id} conflict={c} />)}
      </div>
    </div>
  )
}
