import React, { useState, useEffect } from 'react';
import { MonsterPageData, PageId, PAGE_ORDER, SIDEBAR_SECTIONS } from '../data/darkDocsData';
import { Play, AlertCircle, RotateCcw } from 'lucide-react';
import { DiscreteSpider } from './CobwebDecor';

interface MonsterDocPageProps {
  data: MonsterPageData;
  onNavigate: (page: PageId) => void;
}

const EVADE_OFFSETS = [
  { x: 0, y: 0 },
  { x: 18, y: -6 },
  { x: -14, y: 8 },
  { x: 24, y: 6 },
  { x: -8, y: -10 },
  { x: 12, y: 10 }
];

export const MonsterDocPage: React.FC<MonsterDocPageProps> = ({
  data,
  onNavigate
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoadError, setVideoLoadError] = useState(false);
  const [mysteryRevealed, setMysteryRevealed] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState(false);
  const [evadeStep, setEvadeStep] = useState(0);
  const [safeLinkClicked, setSafeLinkClicked] = useState(false);
  const [massBlockFeedback, setMassBlockFeedback] = useState<'sim' | 'nao' | null>(null);
  const [supportDisappeared, setSupportDisappeared] = useState(false);
  const [pingStage, setPingStage] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [lastSeenRevealed, setLastSeenRevealed] = useState(false);

  // Reset interactive states when switching monster pages
  useEffect(() => {
    setIsPlaying(false);
    setVideoLoadError(false);
    setMysteryRevealed(false);
    setHelpfulClicked(false);
    setEvadeStep(0);
    setSafeLinkClicked(false);
    setMassBlockFeedback(null);
    setSupportDisappeared(false);
    setPingStage(0);
    setLastSeenRevealed(false);

    if (data.id === 'o-numero-fantasma') {
      const timer = setTimeout(() => {
        setSupportDisappeared(true);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [data.id]);

  const handleTriggerPing = () => {
    if (pingStage > 0 && pingStage < 5) return;
    setPingStage(1);
    setTimeout(() => setPingStage(2), 700);
    setTimeout(() => setPingStage(3), 1400);
    setTimeout(() => setPingStage(4), 2100);
    setTimeout(() => setPingStage(5), 2900);
  };

  // Find Previous / Next pages for clean doc navigation at the bottom
  const currentIndex = PAGE_ORDER.indexOf(data.id);
  const prevPageId = currentIndex > 0 ? PAGE_ORDER[currentIndex - 1] : null;
  const nextPageId =
    currentIndex >= 0 && currentIndex < PAGE_ORDER.length - 1
      ? PAGE_ORDER[currentIndex + 1]
      : null;

  const getLabelForPage = (id: PageId | null) => {
    if (!id) return '';
    for (const sec of SIDEBAR_SECTIONS) {
      const found = sec.items.find((i) => i.id === id);
      if (found) return found.label;
    }
    return id;
  };

  const accentBorderMap = {
    green: 'border-[#25D366]/30',
    red: 'border-red-500/30',
    purple: 'border-purple-500/30',
    zinc: 'border-zinc-700'
  };

  const accentBadgeMap = {
    green: 'text-[#25D366] bg-[#25D366]/10 border-[#25D366]/25',
    red: 'text-red-400 bg-red-950/40 border-red-500/30',
    purple: 'text-purple-300 bg-purple-950/40 border-purple-500/30',
    zinc: 'text-zinc-300 bg-zinc-900 border-zinc-700'
  };

  const currentOffset = EVADE_OFFSETS[evadeStep % EVADE_OFFSETS.length];

  return (
    <article className="relative py-8 sm:py-16 space-y-10 max-w-2xl">
      {/* Optional discrete spider hanging in top right of specific monster pages */}
      {data.showDiscreteSpider && (
        <div className="absolute top-0 right-2 sm:right-6">
          <DiscreteSpider />
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
        <span>{data.sectionLabel}</span>
      </div>

      {/* Header: Title, Suspicious Quote, Short Description */}
      <header className="space-y-6">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-100 doc-title-glitch">
          {data.title}
        </h1>

        <blockquote className="pl-4 border-l-2 border-zinc-700 text-zinc-300 italic text-sm sm:text-base">
          {data.quote}
        </blockquote>

        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          {data.description}
        </p>
      </header>

      {/* Large Video Player Area */}
      <section className="space-y-3 pt-2" aria-label="Tutorial em vídeo">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-sm sm:text-base font-semibold text-zinc-200">
            {data.videoSubtitle ?? data.videoTitle}
          </h2>
          <span className="text-xs font-mono text-zinc-500 shrink-0">
            {data.videoDuration}
          </span>
        </div>

        {/* Video Frame */}
        <div
          className={`relative w-full aspect-video rounded-lg overflow-hidden bg-[#0e0e12] border ${
            accentBorderMap[data.thumbnailTheme.accentColor]
          } transition-colors`}
        >
          {!isPlaying ? (
            /* Custom Technical Thumbnail + Subtle Animated PLAY Button */
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="group relative w-full h-full flex flex-col justify-between p-4 sm:p-6 text-left focus:outline-none bg-[#0c0c10] hover:bg-[#0f0f15] transition-colors"
            >
              {/* Top Technical Overlay in Thumbnail */}
              <div className="w-full flex items-center justify-between gap-2 z-10">
                <span className="text-[10px] sm:text-xs font-mono text-zinc-500 tracking-wider">
                  {data.thumbnailTheme.codeLabel}
                </span>
                <span
                  className={`text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded border ${
                    accentBadgeMap[data.thumbnailTheme.accentColor]
                  }`}
                >
                  {data.thumbnailTheme.metricLabel}: {data.thumbnailTheme.metricValue}
                </span>
              </div>

              {/* Center Play Button + Video Title */}
              <div className="my-auto flex flex-col items-center justify-center text-center gap-3 z-10 px-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-zinc-900/90 border border-zinc-700 group-hover:border-[#25D366] flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-lg">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-[#25D366] fill-[#25D366] ml-0.5 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="space-y-1 max-w-md">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                    TUTORIAL OFICIAL
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white transition-colors line-clamp-2">
                    {data.videoTitle}
                  </p>
                </div>
              </div>

              {/* Bottom Terminal Log Lines inside Thumbnail */}
              <div className="w-full border-t border-zinc-800/80 pt-2.5 hidden sm:block z-10">
                <div className="space-y-0.5 font-mono text-[11px] text-zinc-500">
                  {data.thumbnailTheme.terminalPreview.map((line, i) => (
                    <div key={i} className="truncate">
                      <span className="text-zinc-600 mr-2">&gt;</span>
                      <span className={i === 2 ? 'text-red-400/80' : 'text-zinc-400'}>
                        {line}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Progress Bar Decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-900">
                <div className="w-1/4 h-full bg-[#25D366]/60 group-hover:w-1/3 transition-all duration-500" />
              </div>
            </button>
          ) : (
            /* Active Video Player Area (supports real local file or clean placeholder) */
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#08080b] p-6 text-center relative">
              {!videoLoadError ? (
                <video
                  src={data.videoFilePlaceholder}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  onError={() => setVideoLoadError(true)}
                />
              ) : (
                <div className="space-y-4 max-w-md font-mono">
                  <AlertCircle className="w-7 h-7 text-red-400/80 mx-auto" />
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-zinc-200 font-sans font-medium">
                      {data.videoTitle}
                    </p>
                    <p className="text-xs text-zinc-500">
                      Arquivo de vídeo aguardando inserção em:{' '}
                      <code className="text-zinc-300">public{data.videoFilePlaceholder}</code>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPlaying(false)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Voltar para a capa</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Procedimento Section */}
      <section className="space-y-4 pt-2 border-t border-zinc-800/80">
        <h3 className="text-base sm:text-lg font-semibold text-zinc-100">
          Procedimento
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-zinc-300">
          {data.procedure.map((step, index) => (
            <li key={index} className="leading-relaxed">
              <span className="text-zinc-300">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Resultado esperado Section */}
      <section className="space-y-3 pt-2 border-t border-zinc-800/80">
        <h3 className="text-sm font-semibold text-zinc-200">
          Resultado esperado:
        </h3>
        <div className="space-y-2 text-sm sm:text-base font-mono text-zinc-300">
          <div>🟢 {data.expectedResult.green}</div>
          <div>🟡 {data.expectedResult.yellow}</div>
          <div className="text-red-400">🔴 {data.expectedResult.red}</div>
        </div>
      </section>

      {/* Seção de Avaliações / Depoimentos */}
      {data.testimonials && data.testimonialsMeta && (
        <section
          className="pt-10 mt-10 border-t border-zinc-800/80 space-y-8"
          aria-label="Avaliações dos alunos"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-zinc-100 tracking-tight">
                ⭐ O que nossos alunos estão dizendo
              </h3>
              <p className="text-sm text-zinc-400">
                {data.testimonialsMeta.subtitle}
              </p>
            </div>

            {data.testimonialsMeta.ratingSummary && (
              <div className="p-4 rounded-lg bg-[#0f0f14] border border-zinc-800/80 inline-flex flex-col gap-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg font-bold text-zinc-100 font-mono">
                    {data.testimonialsMeta.ratingSummary.score}
                  </span>
                  <span className="text-xs tracking-widest select-none" aria-label="5 de 5 estrelas">
                    ⭐⭐⭐⭐⭐
                  </span>
                  <span className="text-xs font-medium text-zinc-300">
                    {data.testimonialsMeta.ratingSummary.totalCount}
                  </span>
                </div>
                <p className="text-xs text-zinc-500">
                  {data.testimonialsMeta.ratingSummary.subtext}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {data.testimonials.map((item) => (
              <div
                key={item.name}
                className="p-5 rounded-lg bg-[#0f0f14] border border-zinc-800/80 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div
                    className="text-xs tracking-widest select-none"
                    aria-label="5 de 5 estrelas"
                  >
                    ⭐⭐⭐⭐⭐
                  </div>

                  {item.isMysteryIdentity ? (
                    <div
                      role="button"
                      tabIndex={0}
                      onMouseEnter={() => setMysteryRevealed(true)}
                      onMouseLeave={() => setMysteryRevealed(false)}
                      onClick={() => setMysteryRevealed((prev) => !prev)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setMysteryRevealed((prev) => !prev);
                        }
                      }}
                      className="cursor-pointer select-none focus:outline-none"
                    >
                      {mysteryRevealed ? (
                        <span className="text-sm font-medium text-zinc-200 italic block">
                          “Você realmente achou que descobriria?”
                        </span>
                      ) : (
                        <div className="space-y-0.5">
                          <span className="text-sm font-semibold text-zinc-100 block">
                            {item.name}
                          </span>
                          <span className="text-xs text-zinc-500 block">
                            {item.location}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <span className="text-sm font-semibold text-zinc-100">
                        {item.name}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {' '}
                        — {item.location}
                      </span>
                    </div>
                  )}

                  <blockquote className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                    {item.quote}
                  </blockquote>
                </div>

                <div className="pt-2 border-t border-zinc-800/60 space-y-3">
                  <span className="inline-block text-[11px] font-mono text-zinc-400 bg-zinc-900/90 border border-zinc-800 px-2.5 py-0.5 rounded">
                    {item.badge}
                  </span>

                  {/* Detalhe escondido em um dos cards da Aranha dos Links */}
                  {item.hasHelpfulPrompt && (
                    <div className="pt-2 border-t border-zinc-800/40 text-[11px] text-zinc-500 space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span>Esta avaliação foi útil?</span>
                        <div className="inline-flex items-center gap-1.5 font-mono">
                          <button
                            type="button"
                            onClick={() => setHelpfulClicked(false)}
                            className="hover:text-zinc-300 transition-colors"
                          >
                            Sim
                          </button>
                          <span>|</span>
                          <button
                            type="button"
                            onClick={() => setHelpfulClicked(false)}
                            className="hover:text-zinc-300 transition-colors"
                          >
                            Não
                          </button>
                          <span>|</span>
                          <button
                            type="button"
                            onClick={() => setHelpfulClicked(true)}
                            className="text-zinc-400 underline decoration-zinc-700 hover:text-[#25D366] transition-colors"
                          >
                            Clique aqui
                          </button>
                        </div>
                      </div>

                      {helpfulClicked && (
                        <p className="text-[11px] font-mono text-red-400">
                          ⚠️ A Aranha dos Links agradece pela colaboração.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Detalhe especial exclusivo da página "A Aranha dos Links" */}
          {data.id === 'a-aranha-dos-links' && (
            <div className="pt-2 space-y-2">
              <div className="inline-block">
                <button
                  type="button"
                  onMouseEnter={() => setEvadeStep((prev) => prev + 1)}
                  onClick={() => setSafeLinkClicked(true)}
                  style={{
                    transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`
                  }}
                  className="text-xs font-mono text-[#25D366]/90 hover:text-[#25D366] underline decoration-[#25D366]/40 underline-offset-4 transition-transform duration-150 focus:outline-none text-left"
                >
                  → Clique aqui para verificar se este link é seguro
                </button>
              </div>

              {safeLinkClicked && (
                <div className="p-3.5 rounded-lg bg-[#0f0f14] border border-zinc-800/80 space-y-1 max-w-md">
                  <p className="text-xs sm:text-sm font-medium text-zinc-200">
                    🕷️ Sério que você clicou?
                  </p>
                  <p className="text-xs text-zinc-400">
                    Depois de tudo que você acabou de ler?
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Detalhe especial exclusivo da página "O Bloqueio em Massa" */}
          {data.id === 'o-bloqueio-em-massa' && (
            <div className="pt-4 border-t border-zinc-800/80 space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
                  🏆 CONQUISTAS DESBLOQUEADAS
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-lg bg-[#0c0c10] border border-zinc-800/70 space-y-1">
                    <div className="text-xs font-mono font-semibold text-zinc-200">
                      🥉 PRIMEIROS PASSOS
                    </div>
                    <p className="text-xs text-zinc-400">
                      Receba seus primeiros 10 bloqueios.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#0c0c10] border border-zinc-800/70 space-y-1">
                    <div className="text-xs font-mono font-semibold text-zinc-200">
                      🥈 TÁ DANDO CERTO
                    </div>
                    <p className="text-xs text-zinc-400">
                      Seja bloqueado por 100 pessoas.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#0c0c10] border border-zinc-800/70 space-y-1">
                    <div className="text-xs font-mono font-semibold text-zinc-200">
                      🥇 PROFISSIONAL
                    </div>
                    <p className="text-xs text-zinc-400">
                      Ultrapasse 1.000 bloqueios.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#0c0c10] border border-zinc-800/70 space-y-1">
                    <div className="text-xs font-mono font-semibold text-zinc-200">
                      💀 LENDA DO SUPORTE
                    </div>
                    <p className="text-xs text-zinc-400">
                      Faça o suporte perguntar:{' '}
                      <strong className="text-zinc-300 font-medium">
                        “Mas o que você fez?”
                      </strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Pequena interação discreta */}
              <div className="text-xs text-zinc-400 space-y-2">
                <div className="flex items-center gap-2.5">
                  <span>Este conteúdo foi útil?</span>
                  <div className="inline-flex items-center gap-2 font-mono">
                    <button
                      type="button"
                      onClick={() => setMassBlockFeedback('sim')}
                      className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition-colors"
                    >
                      Sim
                    </button>
                    <span className="text-zinc-600">|</span>
                    <button
                      type="button"
                      onClick={() => setMassBlockFeedback('nao')}
                      className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition-colors"
                    >
                      Não
                    </button>
                  </div>
                </div>

                {massBlockFeedback === 'nao' && (
                  <p className="text-xs font-mono text-red-400">
                    Você bloqueou este conteúdo.
                  </p>
                )}

                {massBlockFeedback === 'sim' && (
                  <p className="text-xs font-mono text-zinc-300">
                    Obrigado! Sua opinião será ignorada com sucesso.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Detalhe especial exclusivo da página "O Número Fantasma" */}
          {data.id === 'o-numero-fantasma' && (
            <div className="pt-4 border-t border-zinc-800/80 space-y-6">
              {/* 🔎 ÚLTIMA LOCALIZAÇÃO CONHECIDA */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
                  🔎 ÚLTIMA LOCALIZAÇÃO CONHECIDA
                </h4>

                <div className="p-4 rounded-lg bg-[#0c0c10] border border-zinc-800/80 font-mono text-xs space-y-2 text-zinc-300">
                  <div>
                    <strong className="text-zinc-400">Status:</strong> ❌ Offline
                  </div>
                  <div>
                    <strong className="text-zinc-400">Última atividade:</strong> Ontem
                  </div>
                  <div>
                    <strong className="text-zinc-400">Última mensagem:</strong> “Só um momento.”
                  </div>
                  <div>
                    <strong className="text-zinc-400">Última resposta:</strong> Nenhuma
                  </div>
                  <div>
                    <strong className="text-zinc-400">Responsável pelo desaparecimento:</strong> Desconhecido
                  </div>
                  <div>
                    <strong className="text-zinc-400">Previsão de retorno:</strong> Em análise
                  </div>
                  <div>
                    <strong className="text-zinc-400">Probabilidade de voltar sozinho:</strong> 3%
                  </div>
                </div>

                <blockquote className="pl-3 border-l-2 border-zinc-700 text-xs sm:text-sm font-medium text-zinc-300 transition-opacity duration-500">
                  {supportDisappeared
                    ? 'O suporte também desapareceu.'
                    : 'O suporte continua procurando.'}
                </blockquote>
              </div>

              {/* Easter Egg — "PING" & Outro Easter Egg ("Última vez visto") */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pt-1">
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={handleTriggerPing}
                    disabled={pingStage > 0 && pingStage < 5}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 disabled:opacity-60 border border-zinc-800 text-xs font-mono text-zinc-200 transition-colors"
                  >
                    <span>📡 PINGAR NÚMERO</span>
                  </button>

                  {pingStage > 0 && (
                    <div className="p-3 rounded-lg bg-[#0c0c10] border border-zinc-800/80 font-mono text-xs space-y-1 text-zinc-400">
                      <div>Enviando ping...</div>
                      {pingStage >= 2 && <div>...</div>}
                      {pingStage >= 3 && <div>......</div>}
                      {pingStage >= 4 && <div>.........</div>}
                      {pingStage === 5 && (
                        <div className="pt-1 space-y-1">
                          <div className="text-red-400 font-semibold">
                            ❌ Nenhuma resposta
                          </div>
                          <div className="text-zinc-300">
                            Ele sabe que você está procurando.
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Outro Easter Egg: Última vez visto */}
                <div
                  role="button"
                  tabIndex={0}
                  onMouseEnter={() => setLastSeenRevealed(true)}
                  onMouseLeave={() => setLastSeenRevealed(false)}
                  onClick={() => setLastSeenRevealed((prev) => !prev)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setLastSeenRevealed((prev) => !prev);
                    }
                  }}
                  className="text-xs font-mono text-zinc-500 cursor-pointer select-none focus:outline-none sm:text-right"
                >
                  <span className="block text-zinc-500">Última vez visto:</span>
                  <span className="text-zinc-300 font-medium">
                    {lastSeenRevealed ? '“Sempre ontem.”' : '“Ontem.”'}
                  </span>
                </div>
              </div>
            </div>
          )}

          <p className="text-xs text-zinc-500 leading-relaxed pt-2">
            {data.testimonialsMeta.disclaimer}
          </p>
        </section>
      )}

      {/* Standard Documentation Footer Navigation (Prev / Next) */}
      <nav
        className="pt-8 mt-12 border-t border-zinc-800/80 flex items-center justify-between gap-4 text-xs sm:text-sm"
        aria-label="Paginação"
      >
        {prevPageId ? (
          <button
            type="button"
            onClick={() => onNavigate(prevPageId)}
            className="text-left text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <span className="block text-[11px] font-mono text-zinc-500">Anterior</span>
            <span className="font-medium">← {getLabelForPage(prevPageId)}</span>
          </button>
        ) : (
          <div />
        )}

        {nextPageId ? (
          <button
            type="button"
            onClick={() => onNavigate(nextPageId)}
            className="text-right text-zinc-400 hover:text-[#25D366] transition-colors"
          >
            <span className="block text-[11px] font-mono text-zinc-500">Próximo</span>
            <span className="font-medium">{getLabelForPage(nextPageId)} →</span>
          </button>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
};
