import React, { useState } from 'react';
import { TabNav } from './components/TabNav';
import ResumePage from './pages/Resume';
import ActivitiesPage from './pages/Activities';
import BlogPage from './pages/Blog';

export default function App() {

    const [tab, setTab] = useState <'resume' | 'activities' | 'blog'> ('resume');

    return (
        <div>
            <header>
                <div className = "container brand">

                    <h1>Lucas Iovdij</h1>
                    <div className = "badge">Honors Student of Computer Science at TU/e</div>

                </div>

                <div className = "container" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>

                    <TabNav current = {tab} onChange = {setTab} />

                </div>
            </header>

            <main>
                <div className = "container">
                    {tab === 'resume' && <ResumePage />}
                    {tab === 'activities' && <ActivitiesPage />}
                    {tab === 'blog' && <BlogPage />}
                </div>
            </main>

        </div>
    )

}
