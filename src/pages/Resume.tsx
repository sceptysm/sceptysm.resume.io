import React from 'react';
import resumeYaml from '../lib/material/resume.yaml?raw';
import { parseResume, WorkItem, EducationItem } from '../lib/content';

const { work, education } = parseResume(resumeYaml);

export default function ResumePage() {

  return (
    <div className="grid cols-2">
      
      <section className="card">
        
        <h2>Work Experience</h2>
        {work.length === 0 && <p className="meta">No items yet.</p>}
        
        {/* Add work items */}
        {work.map((w: WorkItem, idx) => (
          <Item key={idx} title={w.title} subtitle={`${w.company} ; ${w.location}`} date={`${w.startDate} – ${w.endDate ?? 'Present'}`} description={w.description} link={w.link} icon={w.icon} />
        ))}
      
      </section>
      
      <section className="card">
        <h2>Education</h2>
        {education.length === 0 && <p className="meta">No items yet.</p>}
        
        {/* Add education items parsed from yaml to the page */}
        {education.map((e: EducationItem, idx) => (
          <Item key={idx} title={e.program} subtitle={`${e.institution} ; ${e.location}`} date={`${e.startDate} – ${e.endDate ?? ''}`} description={e.description} link={e.link} icon={e.icon} />
        ))}
      
      </section>
    </div>
  );
}


// Reusable item component

function Item({ title, subtitle, date, description, link, icon }: { title: string; subtitle: string; date: string; description?: string; link?: string; icon?: string }) {
  const iconSrc = icon ? (icon.startsWith('/') ? icon : `/${icon}`) : undefined;
  return (
    <article className="list-item">
      <div className="item-illustration">
        {iconSrc ? <img src={iconSrc} alt="" loading="lazy" /> : <div className="item-fallback">{title.slice(0, 1)}</div>}
      </div>
      <div className="item-content">
        <div className="title">{title}</div>
        <div className="meta">{subtitle}</div>
        <div className="meta">{date}</div>
        {description && <p>{description}</p>}
        {link && (
          <p className="meta">
            <a className="link" href={link} target="_blank" rel="noreferrer">Learn more</a>
          </p>
        )}
      </div>
    </article>
  );
}
