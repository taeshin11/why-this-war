import conflicts from '@/public/data/conflicts.json'
import ExplainerSection from '@/components/ExplainerSection'
import SectionNav from '@/components/SectionNav'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return conflicts.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const conflict = conflicts.find(c => c.slug === slug)
  if (!conflict) return {}
  return {
    title: `Why is ${conflict.name} happening? — Explained | Why This War`,
    description: conflict.what.slice(0, 150),
    openGraph: {
      title: `Why is ${conflict.name} happening?`,
      description: conflict.what.slice(0, 150),
    },
  }
}

const statusBadge: Record<string, string> = {
  active: 'bg-red-100 text-red-700',
  frozen: 'bg-gray-100 text-gray-700',
  resolved: 'bg-green-100 text-green-700',
}

export default async function ConflictPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const conflict = conflicts.find(c => c.slug === slug)
  if (!conflict) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Why is ${conflict.name} happening?`,
    dateModified: conflict.updated,
    author: { '@type': 'Organization', name: 'Why This War' },
    description: conflict.what.slice(0, 150),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl">
        <Link href="/" className="text-sm text-blue-600 hover:underline mb-4 block">← Back to all conflicts</Link>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{conflict.flag_a}</span>
          <span className="text-gray-300">vs</span>
          <span className="text-3xl">{conflict.flag_b}</span>
          <span className={`text-sm px-2 py-0.5 rounded-full font-medium uppercase ${statusBadge[conflict.status]}`}>{conflict.status}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Why is {conflict.name} happening?</h1>
        <p className="text-gray-500 mb-2">{conflict.country_a} vs {conflict.country_b} · Since {conflict.start_date}</p>
        <div className="flex flex-wrap gap-1 mb-6">
          {conflict.tags.map(tag => (
            <Link key={tag} href={`/tag/${tag}`} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded hover:bg-gray-200">#{tag}</Link>
          ))}
        </div>

        <SectionNav />

        <div className="space-y-4 mt-4">
          <ExplainerSection id="what" content={conflict.what} />
          <ExplainerSection id="who" content={conflict.who} />
          <ExplainerSection id="why" content={conflict.why} />
          <ExplainerSection id="latest" content={conflict.latest} />
          <ExplainerSection id="where" content={conflict.where} sources={conflict.sources} />
        </div>

        <div className="mt-6 text-xs text-gray-400 text-right">Last updated: {conflict.updated}</div>
      </div>
    </>
  )
}
