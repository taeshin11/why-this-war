import conflicts from '@/public/data/conflicts.json'
import SearchFilter from '@/components/SearchFilter'

export const metadata = {
  title: 'Why This War — Understand Every Conflict | Explained',
  description: 'Clear, neutral explainers for every major ongoing armed conflict. What is happening, who is fighting, and why.',
}

export default function Home() {
  const active = conflicts.filter(c => c.status === 'active')
  const frozen = conflicts.filter(c => c.status !== 'active')

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Why This War?</h1>
      <p className="text-gray-500 mb-8 text-lg">Clear, neutral explainers for every major ongoing conflict. {conflicts.length} conflicts covered.</p>
      <SearchFilter conflicts={[...active, ...frozen]} />
    </div>
  )
}
