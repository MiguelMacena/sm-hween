import React from 'react';
import { MONSTER_PAGES, PageId } from '../data/darkDocsData';

interface MonstersOverviewPageProps {
  onNavigate: (page: PageId) => void;
}

const ORDERED_MONSTER_IDS: PageId[] = [
  'o-spam',
  'o-disparo-em-massa',
  'o-desconhecido',
  'a-aranha-dos-links',
  'o-bloqueio-em-massa',
  'o-numero-fantasma',
  'freddy-krueger'
];

export const MonstersOverviewPage: React.FC<MonstersOverviewPageProps> = ({
  onNavigate
}) => {
  return (
    <article className="py-8 sm:py-16 space-y-10 max-w-2xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
        <span>INTRODUÇÃO</span>
        <span>/</span>
        <span className="text-zinc-300">OS MONSTROS</span>
      </div>

      {/* Header */}
      <header className="space-y-3 border-b border-zinc-800/80 pb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 doc-title-glitch">
          Os Monstros
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Cada seção desta documentação descreve um comportamento clássico capaz de comprometer a reputação de um número no WhatsApp, acompanhado do respectivo procedimento técnico e resultado esperado.
        </p>
      </header>

      {/* Clean Documentation Index List */}
      <div className="divide-y divide-zinc-800/70 border-t border-b border-zinc-800/70">
        {ORDERED_MONSTER_IDS.map((id) => {
          const item = MONSTER_PAGES[id];
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className="w-full py-4 flex items-baseline justify-between gap-4 text-left group hover:bg-zinc-900/30 px-2 -mx-2 rounded transition-colors"
            >
              <div className="space-y-1">
                <span className="text-sm sm:text-base font-medium text-zinc-200 group-hover:text-[#25D366] transition-colors block">
                  {item.title}
                </span>
                <span className="text-xs sm:text-sm text-zinc-500 block">
                  {item.videoTitle}
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-500 group-hover:text-[#25D366] shrink-0 transition-transform group-hover:translate-x-0.5">
                Ler →
              </span>
            </button>
          );
        })}
      </div>
    </article>
  );
};
