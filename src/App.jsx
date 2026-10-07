// src/App.jsx
import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Intro from './components/Intro.jsx'
import Home from './components/Home.jsx'
import NewsletterLetter from './components/NewsletterLetter.jsx'
import { CatGuideProvider } from './components/CatGuide.jsx'

// Travel pages in src/Travel
import ParisTrip from './Travel/ParisTrip.jsx'
import AsiaTrip from './Travel/AsiaTrip.jsx'
import KenyaTrip from './Travel/KenyaTrip.jsx'
import IcelandTrip from './Travel/IcelandTrip.jsx'
import ScotlandTrip from './Travel/ScotlandTrip.jsx'




export default function App() {
  const { pathname } = useLocation()
  const [showIntro, setShowIntro] = useState(() => pathname === '/')
  const isTravelLetter = pathname.startsWith('/travel/')
  const showCatGuide = pathname === '/' && !showIntro

  return (
    <CatGuideProvider enabled={showCatGuide && !isTravelLetter}>
      {showIntro && pathname === '/'
        ? <Intro onFinish={() => setShowIntro(false)} />
        : (
          <>
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Travel blog pages */}
              <Route path="/travel/kenya" element={<KenyaTrip />} />
              <Route path="/travel/paris" element={<ParisTrip />} />
              <Route path="/travel/asia" element={<AsiaTrip />} />
              <Route path="/travel/iceland" element={<IcelandTrip />} />
              <Route path="/travel/scotland" element={<ScotlandTrip />} />
            </Routes>
            <NewsletterLetter />
          </>
        )}
    </CatGuideProvider>
  )
}
