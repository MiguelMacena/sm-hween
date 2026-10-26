import React, { useState } from 'react';
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
  const [gifLoaded, setGifLoaded] = useState(false);

  return (
    <article className="py-8 sm:py-16 space-y-10 w-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
        <span>INTRODUÇÃO</span>
        <span>/</span>
        <span className="text-zinc-300">OS MONSTROS</span>
      </div>

      {/* Header: Title, Text & Monsters Gathering GIF */}
      <header className="border-b border-zinc-800/80 pb-8 sm:pb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 lg:gap-8">
          {/* Left Column: Title & Text */}
          <div className="space-y-3 md:flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 doc-title-glitch">
              Os Monstros
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Cada seção desta documentação descreve um comportamento clássico capaz de comprometer a reputação de um número no WhatsApp, acompanhado do respectivo procedimento técnico e resultado esperado.
            </p>
          </div>

          {/* Right Column (Desktop/Tablet) / Bottom Centered (Mobile): Monsters GIF */}
          <div className="w-full max-w-[300px] sm:max-w-[340px] md:max-w-none md:w-[40%] lg:w-[44%] mx-auto md:mx-0 shrink-0">
            <div className="relative">
              {/* Subtle ambient glow matching the documentation identity */}
              <div
                className="
                  absolute -inset-1.5 rounded-2xl
                  bg-gradient-to-tr from-purple-900/20 via-purple-600/10 to-[#25D366]/10
                  blur-xl opacity-75 pointer-events-none
                "
                aria-hidden="true"
              />

              <div className="relative rounded-xl overflow-hidden bg-[#150d24] border border-purple-500/20 shadow-[0_0_28px_-10px_rgba(147,51,234,0.28)] aspect-video">
                <img
                  src="/halloween/monstros.gif"
                  alt="Os monstros do suporte reunidos na edição de Halloween da SM Click"
                  width={640}
                  height={360}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setGifLoaded(true)}
                  className={`w-full h-auto block object-contain select-none transition-opacity duration-500 ${
                    gifLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
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
