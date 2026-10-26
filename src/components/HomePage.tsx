import React from 'react';
import { PageId } from '../data/darkDocsData';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <article className="py-8 sm:py-16 space-y-10 max-w-2xl">
      {/* Breadcrumb / Meta */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
        <span>INTRODUÇÃO</span>
        <span>/</span>
        <span className="text-zinc-300">INÍCIO</span>
      </div>

      {/* Title & Subtitle */}
      <header className="space-y-3 border-b border-zinc-800/80 pb-8">
        <div className="inline-block text-xs font-mono uppercase tracking-widest text-purple-400/80">
          Halloween Edition
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 doc-title-glitch">
          SM CLICK DOCS
        </h1>
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed pt-1">
          “Uma documentação sobre os principais responsáveis pelos maiores pesadelos do suporte.”
        </p>
      </header>

      {/* Short Technical Introduction */}
      <div className="space-y-5 text-sm sm:text-base text-zinc-400 leading-relaxed">
        <p>
          Bem-vindo ao arquivo técnico de incidentes recorrentes. Embora a maioria dos chamados comece com a afirmação de que um número parou de funcionar sem motivo aparente, a análise dos registros costuma revelar padrões bastante específicos.
        </p>
        <p>
          Esta documentação cataloga as entidades operacionais responsáveis por transformar contas saudáveis em números desconectados, bloqueados ou banidos.
        </p>
      </div>

      {/* Single Clean Call to Action */}
      <div className="pt-4">
        <button
          type="button"
          onClick={() => onNavigate('os-monstros')}
          className="group inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[#25D366] hover:text-[#34e275] transition-colors py-2 focus:outline-none"
        >
          <span className="underline decoration-[#25D366]/40 group-hover:decoration-[#25D366] underline-offset-4">
            Conheça os monstros
          </span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
    </article>
  );
};
