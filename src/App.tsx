import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { RamadanProvider } from './context/RamadanContext';
import { HomePage } from './pages/HomePage';
import { IntentionPage } from './pages/IntentionPage';
import { WorshipPage } from './pages/WorshipPage';
import { TimePage } from './pages/TimePage';
import { KindnessPage } from './pages/KindnessPage';
import { ReflectionPage } from './pages/ReflectionPage';
import { SummaryPage } from './pages/SummaryPage';
export function App() {
  return (
    <RamadanProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/intention" element={<IntentionPage />} />
          <Route path="/worship" element={<WorshipPage />} />
          <Route path="/time" element={<TimePage />} />
          <Route path="/kindness" element={<KindnessPage />} />
          <Route path="/reflection" element={<ReflectionPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </HashRouter>
    </RamadanProvider>);

}