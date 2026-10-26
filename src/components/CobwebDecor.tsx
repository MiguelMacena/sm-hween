import React from 'react';

interface CobwebProps {
  position?: 'top-left' | 'top-right';
  className?: string;
}

export const CobwebCorner: React.FC<CobwebProps> = ({
  position = 'top-right',
  className = ''
}) => {
  const rotation = position === 'top-right' ? 'rotate-90' : 'rotate-0';

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none w-24 h-24 text-zinc-600/20 ${rotation} ${className}`}
      aria-hidden="true"
    >
      <line x1="0" y1="0" x2="100" y2="0" stroke="currentColor" strokeWidth="0.75" />
      <line x1="0" y1="0" x2="95" y2="32" stroke="currentColor" strokeWidth="0.75" />
      <line x1="0" y1="0" x2="80" y2="62" stroke="currentColor" strokeWidth="0.75" />
      <line x1="0" y1="0" x2="62" y2="80" stroke="currentColor" strokeWidth="0.75" />
      <line x1="0" y1="0" x2="32" y2="95" stroke="currentColor" strokeWidth="0.75" />
      <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.75" />
      <path
        d="M 28 0 Q 24 9 26 9 Q 19 16 20 19 Q 12 24 9 26 Q 4 25 0 28"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <path
        d="M 56 0 Q 48 12 52 17 Q 42 28 44 33 Q 29 41 33 44 Q 16 46 17 52 Q 6 49 0 56"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <path
        d="M 86 0 Q 75 16 80 26 Q 65 40 70 50 Q 46 62 50 70 Q 26 72 26 80 Q 10 76 0 86"
        stroke="currentColor"
        strokeWidth="0.75"
      />
    </svg>
  );
};

export const DiscreteSpider: React.FC = () => {
  return (
    <div
      className="pointer-events-none select-none flex flex-col items-center animate-spider-hang opacity-45"
      aria-hidden="true"
    >
      <div className="w-px h-10 bg-zinc-700/70" />
      <span className="text-xs leading-none">🕷️</span>
    </div>
  );
};
