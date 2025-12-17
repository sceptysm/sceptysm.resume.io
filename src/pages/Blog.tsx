import React, { useMemo, useState } from 'react'
import { parseMarkdown, BlogMeta } from '../lib/content'
import ReactMarkdown from 'react-markdown'

// Import all markdown blog entries as raw strings
const rawModules = import.meta.glob('../lib/material/blog/*.md', {
    query: '?raw',
    import: 'default',
    eager: true
})

type BlogEntry = { id: string; meta: BlogMeta; content: string }

export default function BlogPage() {

    const entries: BlogEntry[] = useMemo(() => {

        const files = Object.entries(rawModules)

        console.log('Blog files count:', files.length)

        const list: BlogEntry[] = []

        for (const [path, raw] of files) {
            
            try {
                const safeRaw = typeof raw === 'string' ? raw : ''
                const { meta, content } = parseMarkdown(safeRaw)
            
                const safeMeta: BlogMeta = {

                    title: meta?.title ?? path.split('/').pop() ?? 'Untitled',
                    date: meta?.date ?? '1970-01-01',
                    tags: Array.isArray(meta?.tags) ? meta.tags : [],
                    excerpt: typeof meta?.excerpt === 'string' ? meta.excerpt : undefined
                }
            
                const id = path.split('/').pop() || path
                list.push({ id, meta: safeMeta, content: content ?? '' })
            
            } catch (err) {
                console.error('Failed to parse blog file:', path, err)
                const id = path.split('/').pop() || path
                list.push({ id, meta: { title: id, date: '1970-01-01' }, content: '' })
            }
        }
        return list.sort((a, b) => (a.meta.date > b.meta.date ? -1 : 1))
    }, [])

    // Set up active state for the first entry
    const [activeId, setActiveId] = useState<string | undefined>(entries[0]?.id) 

    const active = entries.find(e => e.id === activeId) 

    return (
        <div className='grid'>
            <section className='card'>
                <h2>Blog</h2>
                {entries.length === 0 && <p className='meta'>No entries yet.</p>}
                <ul>
                    {entries.map(e => (
                        <li key={e.id}>
                            <button
                                className={`nav-btn ${activeId === e.id ? 'active' : ''}`}
                                onClick={() => setActiveId(e.id)}
                            >
                                {e.meta.title} ; <span className='small'>{e.meta.date}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            {active && (
                <section className='card'>
                    <h3>{active.meta.title}</h3>
                    
                    <div className='meta'>
                        {active.meta.date}
                    </div>
                    
                    <ReactMarkdown>
                        {active.content || ''}
                    </ReactMarkdown>
                </section>
            )}
        </div>
    )
}
