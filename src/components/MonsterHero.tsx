import React from 'react';

export type HeroContentPosition =
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'center-left'
  | 'center';

export interface MonsterHeroProps {
  gifSrc: string;
  title: string;
  subtitle: string;
  badge?: string;
  contentPosition?: HeroContentPosition;
}

export const MonsterHero: React.FC<MonsterHeroProps> = ({
  gifSrc,
  title,
  subtitle,
  badge = 'Halloween Edition'
}) => {
  return (
    <section
      aria-label={title}
      className="w-full rounded-xl bg-[#0e0e13] border border-zinc-800/80 p-5 sm:p-7 lg:p-8 shadow-[0_0_32px_-12px_rgba(147,51,234,0.18)]"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-7 lg:gap-10">
        {/* Left Column: Editorial Presentation (~45% on Desktop) */}
        <div className="w-full md:w-[45%] space-y-3 sm:space-y-4 min-w-0">
          {badge && (
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
              <span>{badge}</span>
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-100 leading-tight doc-title-glitch">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Right Column: Independent GIF Animation (~55% on Desktop, Centered Below on Mobile) */}
        <div className="w-full md:w-[55%] shrink-0">
          <div className="relative mx-auto w-full rounded-lg overflow-hidden bg-[#150d24] border border-purple-500/20 aspect-video">
            <img
              src={gifSrc}
              alt={title}
              width={640}
              height={360}
              loading="eager"
              decoding="async"
              className="w-full h-full block object-contain select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
