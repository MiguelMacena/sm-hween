import React from 'react';
import { SIDEBAR_SECTIONS, PageId } from '../data/darkDocsData';
import { Menu, X } from 'lucide-react';

interface DocsSidebarProps {
  activePage: PageId;
  onSelectPage: (page: PageId) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const DocsSidebar: React.FC<DocsSidebarProps> = ({
  activePage,
  onSelectPage,
  mobileOpen,
  setMobileOpen
}) => {
  const handleNavigate = (id: PageId) => {
    onSelectPage(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Header Bar */}
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 h-14 bg-[#0a0a0c]/95 backdrop-blur border-b border-zinc-800/80">
        <button
          type="button"
          onClick={() => handleNavigate('inicio')}
          className="flex items-center gap-2.5 text-left focus:outline-none"
        >
          <img
            src="/halloween/logo_sm.jpg"
            alt="SM Click Docs — Halloween Edition"
            className="h-9 sm:h-10 max-h-10 w-auto max-w-[160px] sm:max-w-[180px] object-contain rounded select-none"
          />
        </button>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Abrir navegação"
          className="p-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/70 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Fixed Sidebar (Desktop) & Slide-over Drawer (Mobile) */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 shrink-0 bg-[#0c0c0f] border-r border-zinc-800/80 flex flex-col justify-between transition-transform duration-200 ease-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 overflow-y-auto space-y-8">
          {/* Sidebar Brand Header */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleNavigate('inicio')}
              className="group flex flex-col text-left focus:outline-none"
            >
              <img
                src="/halloween/logo_sm.jpg"
                alt="SM Click Docs — Halloween Edition"
                className="h-10 sm:h-11 md:h-12 max-h-12 w-auto max-w-[170px] md:max-w-[200px] object-contain rounded select-none transition-opacity group-hover:opacity-90"
              />
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Fechar menu"
              className="md:hidden p-1 text-zinc-500 hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Documentation Navigation Tree */}
          <nav className="space-y-7" aria-label="Documentação">
            {SIDEBAR_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-2">
                <h2 className="text-[11px] font-mono font-semibold uppercase tracking-widest text-zinc-500 px-2.5">
                  {section.title}
                </h2>
                <ul className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive = activePage === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => handleNavigate(item.id)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-sm transition-colors text-left ${
                            isActive
                              ? 'bg-[#25D366]/10 text-[#25D366] font-medium border-l-2 border-[#25D366]'
                              : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/70'
                          }`}
                        >
                          <span>{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Minimal Footer inside Sidebar */}
        <div className="p-6 border-t border-zinc-900 text-[11px] font-mono text-zinc-600 flex items-center justify-between">
          <span>v2026.10</span>
          <span className="text-purple-400/60">internal-parody</span>
        </div>
      </aside>
    </>
  );
};
