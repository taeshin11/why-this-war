const sectionIcons: Record<string, string> = {
  what: '📋',
  who: '👥',
  why: '❓',
  latest: '📰',
  where: '📍',
}
const sectionTitles: Record<string, string> = {
  what: 'What is happening?',
  who: 'Who is fighting?',
  why: 'Why did it start?',
  latest: "What's the latest?",
  where: 'Where is it happening?',
}

interface ExplainerSectionProps {
  id: string
  content: string
  sources?: string[]
}

export default function ExplainerSection({ id, content, sources }: ExplainerSectionProps) {
  return (
    <section id={id} className="bg-white border border-gray-200 rounded-lg p-6 scroll-mt-20">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span>{sectionIcons[id]}</span>
        <span>{sectionTitles[id]}</span>
      </h2>
      <p className="text-gray-700 leading-relaxed">{content}</p>
      {sources && sources.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
          Sources: {sources.join(', ')}
        </div>
      )}
    </section>
  )
}
