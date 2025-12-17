import React from 'react';

type TabKey = 'resume' | 'activities' | 'blog';

export function TabNav({ current, onChange }: { current: TabKey; onChange: (t: TabKey) => void }) {
  const tabs: { key: TabKey; label: string }[] = [
    { key: 'resume', label: 'Resume' },
    { key: 'activities', label: 'Activities' },
    { key: 'blog', label: 'Blog' },
  ];
  
  return (
    <nav aria-label="Primary">
      {tabs.map(t => (
        <button
          key={t.key}
          className={`nav-btn ${current === t.key ? 'active' : ''}`}
          onClick={() => onChange(t.key)}
          aria-pressed={current === t.key}
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
}
