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

const statusRing: Record<string, string> = {
  active: 'bg-red-500/10 text-red-600 ring-red-500/20',
  frozen: 'bg-slate-500/10 text-slate-500 ring-slate-500/20',
  resolved: 'bg-emerald-500/10 text-emerald-600 ring-emerald-500/20',
}

export default function ConflictCard({ conflict }: { conflict: Conflict }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 group">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1.5 text-2xl">
          <span>{conflict.flag_a}</span>
          <span className="text-slate-300 text-base font-light">vs</span>
          <span>{conflict.flag_b}</span>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset uppercase ${statusRing[conflict.status] || 'bg-slate-500/10 text-slate-600 ring-slate-500/20'}`}>
          {conflict.status}
        </span>
      </div>
      <h3 className="font-bold text-slate-900 mb-1.5">{conflict.name}</h3>
      <p className="text-sm text-slate-500 mb-4 line-clamp-2">{conflict.thumbnail_description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {conflict.tags.map(tag => (
          <Link key={tag} href={`/tag/${tag}`} className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 ring-1 ring-inset ring-blue-500/20 hover:bg-blue-500/20 transition-colors">#{tag}</Link>
        ))}
      </div>
      <Link href={`/conflict/${conflict.slug}`} className="inline-block text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors">Read explainer →</Link>
    </div>
  )
}
