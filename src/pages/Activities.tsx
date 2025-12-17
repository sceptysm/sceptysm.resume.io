import React from 'react';
import activitiesYaml from '../lib/material/activities.yaml?raw';
import { parseActivities, ActivityItem } from '../lib/content';

const { activities } = parseActivities(activitiesYaml);

export default function ActivitiesPage() {

  return (
    <div className="grid">
      <section className="card">

        <h2>Activities</h2>

        {activities.length === 0 && <p className="meta">No items yet.</p>}

        {activities.map((a: ActivityItem, idx) => (
          <Item key={idx} name={a.name} description={a.description} link={a.link} linkMessage={a.linkMessage} dateRange={[a.startDate, a.endDate].filter(Boolean).join(' – ')} />
        ))}
      
      </section>
    </div>
  );
}

function Item({ name, description, link, dateRange, linkMessage }: { name: string; description?: string; link?: string; dateRange?: string, linkMessage?: string }) {
  return (
    <article>
      <div className="title">{name}</div>
      {dateRange && <div className="meta">{dateRange}</div>}
      
      {/* Description of the activity */}
      {description && <p>{description}</p>}
      {link && (
      
        <p className="meta">
          <a className="link" href={link} target="_blank" rel="noreferrer">{linkMessage}</a>
        </p>
      
      )}
    </article>
  );
}
