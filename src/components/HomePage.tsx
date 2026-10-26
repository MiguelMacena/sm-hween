import React, { useState } from 'react';
import { PageId } from '../data/darkDocsData';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [gifError, setGifError] = useState(false);
  const [gifLoaded, setGifLoaded] = useState(false);

  return (
    <article className="py-8 sm:py-16 space-y-10 w-full">
      {/* Breadcrumb / Meta */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
        <span>INTRODUÇÃO</span>
        <span>/</span>
        <span className="text-zinc-300">INÍCIO</span>
      </div>

      {/* Hero Section: Title, Subtitle & Halloween Animation */}
      <header className="border-b border-zinc-800/80 pb-8 sm:pb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 lg:gap-8">
          {/* Left Column: Title & Brief Description */}
          <div className="space-y-3 md:flex-1 min-w-0">
            <div className="inline-block text-xs font-mono uppercase tracking-widest text-purple-400/80">
              Halloween Edition
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 doc-title-glitch">
              SM CLICK DOCS
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed pt-1">
              “Uma documentação sobre os principais responsáveis pelos maiores pesadelos do suporte.”
            </p>
          </div>

          {/* Right Column (Desktop/Tablet) / Bottom Centered (Mobile): Halloween GIF */}
          <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-none md:w-[38%] lg:w-[40%] mx-auto md:mx-0 shrink-0">
            <div className="relative">
              {/* Subtle ambient glow integrating the cartoon scene into the dark docs theme */}
              <div
                className="
                  absolute -inset-1.5 rounded-2xl
                  bg-gradient-to-tr from-purple-900/20 via-purple-600/10 to-[#25D366]/10
                  blur-xl opacity-75 pointer-events-none
                "
                aria-hidden="true"
              />

              <div
                className="relative rounded-xl overflow-hidden bg-[#150d24] border border-purple-500/20 shadow-[0_0_28px_-10px_rgba(147,51,234,0.28)] aspect-video"
                style={
                  !gifLoaded && !gifError
                    ? {
                        backgroundImage: "url('/halloween/smclick-halloween.png')",
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }
                    : undefined
                }
              >
                <img
                  src={
                    gifError
                      ? '/halloween/smclick-halloween.png'
                      : '/halloween/smclick-halloween.gif'
                  }
                  alt="Robô da SM Click em perseguição cartoon de Halloween contra o WhatsApp"
                  width={640}
                  height={360}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setGifLoaded(true)}
                  onError={() => setGifError(true)}
                  className="w-full h-auto block object-contain select-none"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Short Technical Introduction */}
      <div className="space-y-5 text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
        <p>
          Bem-vindo ao arquivo técnico de incidentes recorrentes. Embora a maioria dos chamados comece com a afirmação de que um número parou de funcionar sem motivo aparente, a análise dos registros costuma revelar padrões bastante específicos.
        </p>
        <p>
          Esta documentação cataloga as entidades operacionais responsáveis por transformar contas saudáveis em números desconectados, bloqueados ou banidos.
        </p>
      </div>

      {/* Single Clean Call to Action */}
      <div className="pt-4 max-w-2xl">
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
