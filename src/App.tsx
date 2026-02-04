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
                            <img className="stamp-photo" src="/sceptysm.resume.io/profile.png" alt="Lucas Iovdij" />
                        </div>
                    </aside>
                </div>
            </main>

        </div>
    )

}
