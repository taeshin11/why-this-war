'use client'
import { useState, useEffect, useCallback } from 'react'

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
  what: string
  who: string
  why: string
  latest: string
  where: string
  sources: string[]
  updated: string
}

import ConflictCard from './ConflictCard'

interface SearchFilterProps {
  conflicts: Conflict[]
}

export default function SearchFilter({ conflicts }: SearchFilterProps) {
  const [search, setSearch] = useState('')
  const [tag, setTag] = useState('')
  const [filtered, setFiltered] = useState(conflicts)

  const allTags = Array.from(new Set(conflicts.flatMap(c => c.tags))).sort()

  const applyFilters = useCallback(() => {
    let result = [...conflicts]
    if (search) result = result.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.thumbnail_description.toLowerCase().includes(search.toLowerCase()))
    if (tag) result = result.filter(c => c.tags.includes(tag))
    setFiltered(result)
  }, [search, tag, conflicts])

  useEffect(() => { applyFilters() }, [applyFilters])

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-6 bg-white border border-slate-100 rounded-2xl shadow-sm p-4">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search conflicts..." className="border border-slate-200 rounded-xl px-3 py-2 text-sm flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-50 text-slate-700 placeholder:text-slate-400" />
        <select value={tag} onChange={e => setTag(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-50">
          <option value="">All Tags</option>
          {allTags.map(t => <option key={t} value={t}>#{t}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 && <p className="col-span-3 text-center text-slate-400 py-12">No conflicts match your search.</p>}
        {filtered.map(c => <ConflictCard key={c.id} conflict={c} />)}
      </div>
    </>
  )
}
