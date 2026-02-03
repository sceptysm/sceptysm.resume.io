import React from 'react';

type TabKey = 'resume' | 'activities' | 'blog';

export function TabNav({ current, onChange }: { current: TabKey; onChange: (t: TabKey) => void }) {
  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: 'resume', label: 'Resume', icon: '📄' },
    { key: 'activities', label: 'Activities', icon: '🏛️' },
    { key: 'blog', label: 'Blog', icon: '✍️' },
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
          <span className="tab-icon" aria-hidden="true">{t.icon}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
