import React, { useState } from 'react';
import { TabNav } from './components/TabNav';
import ResumePage from './pages/Resume';
import ActivitiesPage from './pages/Activities';
import BlogPage from './pages/Blog';

export default function App() {

    const [tab, setTab] = useState<'resume' | 'activities' | 'blog'>('resume');
    const [activitiesKey, setActivitiesKey] = useState(0);

    const handleTabChange = (next: 'resume' | 'activities' | 'blog') => {
        setTab(next);
        if (next === 'activities') {
            setActivitiesKey((k) => k + 1);
        }
    };

    return (
        <div className="page">
            <header>
                <div className="container brand">

                    <h1>Lucas Iovdij</h1>
                    <div className="badge">Honors Student of Computer Science at TU/e</div>

                </div>

                <div className="container nav-row">

                    <TabNav current={tab} onChange={handleTabChange} />

                </div>
            </header>

            <main>
                <div className="container layout">
                    <div className="main-panel">
                        {tab === 'resume' && <ResumePage />}
                        {tab === 'activities' && <ActivitiesPage animateKey={activitiesKey} />}
                        {tab === 'blog' && <BlogPage />}
                    </div>

                    <aside className="stamp" aria-label="Profile">
                        <div className="stamp-inner">
                            <img className="stamp-photo" src="/profile.svg" alt="Lucas Iovdij" />
                            <div className="stamp-name">Lucas Iovdij</div>
                            <div className="stamp-role">Computer Science</div>

                            <div className="stamp-links" aria-label="Social links">
                                <a className="stamp-link" href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.08c.62-1.17 2.14-2.4 4.4-2.4 4.7 0 5.56 3.1 5.56 7.12V24h-5v-7.3c0-1.74-.03-3.98-2.43-3.98-2.44 0-2.81 1.9-2.81 3.86V24h-5V8z" />
                                    </svg>
                                </a>
                                <a className="stamp-link" href="https://github.com/sceptysm" target="_blank" rel="noreferrer" aria-label="GitHub">
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.28 3.44 9.78 8.2 11.36.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.24 1.83 1.24 1.08 1.84 2.83 1.31 3.52 1 .11-.78.42-1.31.77-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.47 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.58C20.56 22.28 24 17.78 24 12.5 24 5.87 18.63.5 12 .5z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

        </div>
    )

}
