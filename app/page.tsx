import conflicts from '@/public/data/conflicts.json'
import SearchFilter from '@/components/SearchFilter'

export const metadata = {
  title: 'Why This War — Understand Every Conflict | Explained',
  description: 'Clear, neutral explainers for every major ongoing armed conflict. What is happening, who is fighting, and why.',
}

export default function Home() {
  const active = conflicts.filter(c => c.status === 'active')
  const frozen = conflicts.filter(c => c.status !== 'active')
  const allTags = new Set(conflicts.flatMap((c: { tags: string[] }) => c.tags)).size

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-3">LIVE INTELLIGENCE</p>
          <h1 className="text-4xl font-extrabold mb-4">Why This War?</h1>
          <p className="text-slate-300 text-lg max-w-2xl">Clear, neutral explainers for every major ongoing conflict. Understand who is fighting, why it started, and what is happening now.</p>
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <div className="text-2xl font-bold text-red-400">{active.length}</div>
              <div className="text-xs text-slate-400 mt-1">Active Conflicts</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <div className="text-2xl font-bold text-slate-400">{frozen.length}</div>
              <div className="text-xs text-slate-400 mt-1">Frozen / Resolved</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <div className="text-2xl font-bold text-blue-400">{conflicts.length}</div>
              <div className="text-xs text-slate-400 mt-1">Total Covered</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <div className="text-2xl font-bold text-blue-400">{allTags}</div>
              <div className="text-xs text-slate-400 mt-1">Topics Tagged</div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SearchFilter conflicts={[...active, ...frozen]} />
      </div>
    </div>
  )
}
