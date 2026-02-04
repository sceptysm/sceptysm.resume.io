import React from 'react';
import resumeYaml from '../lib/material/resume.yaml?raw';
import { parseResume, WorkItem, EducationItem } from '../lib/content';

const { work, education } = parseResume(resumeYaml);

export default function ResumePage() {

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-greeting">Pleasure to meet you!</h1>
        <h2 className="hero-name">I'm Lucas.</h2>
        <p className="hero-bio">
          Honors Student of Computer Science at TU/e.
        </p>
        <div className="hero-details">
          <div className="hero-detail">
            <svg className="hero-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Eindhoven, NL</span>
          </div>
          <div className="hero-detail">
            <svg className="hero-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <a href="mailto:lucasiovdij@gmail.com" className="hero-link">lucasiovdij@gmail.com</a>
          </div>
          <div className="hero-detail">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hero-link">LinkedIn</a>
            <a href="https://github.com/sceptysm" target="_blank" rel="noreferrer" className="hero-link">GitHub</a>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="card">
        <h2>Work Experience</h2>
        {work.length === 0 && <p className="meta">No items yet.</p>}
        {work.map((w: WorkItem, idx) => (
          <Item key={idx} title={w.title} subtitle={w.company} location={w.location} date={`${w.startDate} – ${w.endDate ?? 'Present'}`} description={w.description} link={w.link} icon={w.icon} />
        ))}
      </section>

      {/* Education */}
      <section className="card">
        <h2>Education</h2>
        {education.length === 0 && <p className="meta">No items yet.</p>}
        {education.map((e: EducationItem, idx) => (
          <Item key={idx} title={e.program} subtitle={e.institution} location={e.location} date={`${e.startDate} – ${e.endDate ?? ''}`} description={e.description} link={e.link} icon={e.icon} />
        ))}
      </section>
    </>
  );
}


// Reusable item component

function Item({ title, subtitle, location, date, description, link, icon }: { title: string; subtitle: string; location: string; date: string; description?: string; link?: string; icon?: string }) {
  const iconSrc = icon ? (icon.startsWith('/') ? icon : `/${icon}`) : undefined;
  return (
    <article className="list-item">
      <div className="item-illustration">
        {iconSrc ? <img src={iconSrc} alt="" loading="lazy" /> : <div className="item-fallback">{title.slice(0, 1)}</div>}
      </div>
      <div className="item-content">
        <div className="item-header">
          <div>
            <div className="title">{title}</div>
            <div className="subtitle">{subtitle}</div>
          </div>
          <div className="item-date">{date}</div>
        </div>
        {description && <p className="item-description">{description}</p>}
        {link && (
          <p className="meta">
            <a className="link" href={link} target="_blank" rel="noreferrer">Learn more</a>
          </p>
        )}
      </div>
    </article>
  );
}
