'use client'
import { useState, useEffect } from 'react'

const sections = [
  { id: 'what', label: 'What' },
  { id: 'who', label: 'Who' },
  { id: 'why', label: 'Why' },
  { id: 'latest', label: 'Latest' },
  { id: 'where', label: 'Where' },
]

export default function SectionNav() {
  const [active, setActive] = useState('what')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="sticky top-20 z-30 bg-white border border-gray-200 rounded-lg p-3 flex flex-wrap gap-2">
      {sections.map(s => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`text-sm px-3 py-1.5 rounded-full transition-colors ${
            active === s.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {s.label}
        </a>
      ))}
    </nav>
  )
}
