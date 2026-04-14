import Link from 'next/link'

interface Conflict {
  id: string
  slug: string
  name: string
  flag_a: string
  flag_b: string
  country_a: string
  country_b: string
  status: string
  start_date: string
  tags: string[]
  thumbnail_description: string
}

const statusBadge: Record<string, string> = {
  active: 'bg-red-100 text-red-700',
  frozen: 'bg-gray-100 text-gray-700',
  resolved: 'bg-green-100 text-green-700',
}

export default function ConflictCard({ conflict }: { conflict: Conflict }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1 text-2xl">
          <span>{conflict.flag_a}</span>
          <span className="text-gray-300 text-lg">vs</span>
          <span>{conflict.flag_b}</span>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium uppercase ${statusBadge[conflict.status] || 'bg-gray-100 text-gray-600'}`}>{conflict.status}</span>
      </div>
      <h3 className="font-bold text-gray-900 mb-1">{conflict.name}</h3>
      <p className="text-sm text-gray-500 mb-3">{conflict.thumbnail_description}</p>
      <div className="flex flex-wrap gap-1 mb-4">
        {conflict.tags.map(tag => (
          <Link key={tag} href={`/tag/${tag}`} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded hover:bg-gray-200">#{tag}</Link>
        ))}
      </div>
      <Link href={`/conflict/${conflict.slug}`} className="inline-block text-sm text-blue-600 hover:text-blue-800 font-medium">Read explainer →</Link>
    </div>
  )
}
