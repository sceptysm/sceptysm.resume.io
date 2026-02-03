import React from 'react';
import activitiesYaml from '../lib/material/activities.yaml?raw';
import { parseActivities, ActivityItem } from '../lib/content';

const { activities } = parseActivities(activitiesYaml);

export default function ActivitiesPage({ animateKey = 0 }: { animateKey?: number }) {

  return (
    <div className="grid">
      <section className="card">

        <h2>Activities</h2>

        {activities.length === 0 && <p className="meta">No items yet.</p>}

        {activities.map((a: ActivityItem, idx) => (
          <Item
            key={`${animateKey}-${idx}`}
            name={a.name}
            description={a.description}
            link={a.link}
            linkMessage={a.linkMessage}
            dateRange={[a.startDate, a.endDate].filter(Boolean).join(' – ')}
            icon={a.icon}
            delayMs={idx * 90}
          />
        ))}
      
      </section>
    </div>
  );
}

function Item({ name, description, link, dateRange, linkMessage, icon, delayMs = 0 }: { name: string; description?: string; link?: string; dateRange?: string; linkMessage?: string; icon?: string; delayMs?: number }) {
  const iconSrc = icon ? (icon.startsWith('/') ? icon : `/${icon}`) : undefined;
  return (
    <article className="list-item activity-item" style={{ animationDelay: `${delayMs}ms` }}>
      <div className="item-illustration">
        {iconSrc ? <img src={iconSrc} alt="" loading="lazy" /> : <div className="item-fallback">{name.slice(0, 1)}</div>}
      </div>
      <div className="item-content">
        <div className="title">{name}</div>
        {dateRange && <div className="meta">{dateRange}</div>}
        
        {/* Description of the activity */}
        {description && <p>{description}</p>}
        {link && (
        
          <p className="meta">
            <a className="link" href={link} target="_blank" rel="noreferrer">{linkMessage ?? 'Learn more'}</a>
          </p>
        
        )}
      </div>
    </article>
  );
}
