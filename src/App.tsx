import React, { useState, useEffect } from 'react';
import { MONSTER_PAGES, PageId, PAGE_ORDER } from './data/darkDocsData';
import { DocsSidebar } from './components/DocsSidebar';
import { HomePage } from './components/HomePage';
import { MonstersOverviewPage } from './components/MonstersOverviewPage';
import { MonsterDocPage } from './components/MonsterDocPage';
import { CobwebCorner } from './components/CobwebDecor';

function getInitialPageFromHash(): PageId {
  const hash = window.location.hash.replace('#', '').trim() as PageId;
  if (PAGE_ORDER.includes(hash)) {
    return hash;
  }
  return 'inicio';
}

export function App() {
  const [activePage, setActivePage] = useState<PageId>(getInitialPageFromHash);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      setActivePage(getInitialPageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    window.location.hash = page;
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentMonster = MONSTER_PAGES[activePage];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#e4e4e7] flex flex-col md:flex-row relative">
      {/* Subtle cobweb in the top-right corner of the viewport */}
      <CobwebCorner position="top-right" className="fixed top-0 right-0 z-10" />

      {/* Sidebar Navigation */}
      <DocsSidebar
        activePage={activePage}
        onSelectPage={handleNavigate}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Documentation Content Area */}
      <div className="flex-1 min-w-0 flex flex-col justify-between px-5 sm:px-10 md:px-16 lg:px-24">
        <main className="w-full max-w-3xl">
          {activePage === 'inicio' && <HomePage onNavigate={handleNavigate} />}

          {activePage === 'os-monstros' && (
            <MonstersOverviewPage onNavigate={handleNavigate} />
          )}

          {currentMonster && (
            <MonsterDocPage
              data={currentMonster}
              onNavigate={handleNavigate}
            />
          )}
        </main>

        {/* Minimalist Technical Footer */}
        <footer className="w-full max-w-3xl py-8 mt-12 border-t border-zinc-900 text-xs text-zinc-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>SM Click Docs — Halloween Edition</span>
          <span>Projeto interno de humor • Nenhuma informação é coletada</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
