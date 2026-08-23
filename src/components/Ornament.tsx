import React from 'react';

type OrnamentProps = {
  tone?: 'gold' | 'light';
  width?: 'sm' | 'md';
  className?: string;
};

export function Ornament({
  tone = 'gold',
  width = 'md',
  className = ''
}: OrnamentProps) {
  const line = tone === 'gold' ? 'bg-gold/45' : 'bg-gold-light/40';
  const dot = tone === 'gold' ? 'bg-gold' : 'bg-gold-light';
  const w = width === 'sm' ? 'w-10' : 'w-16';

  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      aria-hidden="true">
      
      <span className={`h-px ${w} ${line}`} />
      <span className={`h-1.5 w-1.5 rotate-45 ${dot}`} />
      <span className={`h-px ${w} ${line}`} />
    </div>);

}

export function SectionHeading({
  overline,
  title,
  tone = 'dark'




}: {overline: string;title: string;tone?: 'dark' | 'light';}) {
  return (
    <header className="text-center">
      <p
        className={`font-body text-[10px] uppercase tracking-widest2 ${
        tone === 'light' ? 'text-gold-light/80' : 'text-gold'}`
        }>
        
        {overline}
      </p>
      <h2
        className={`mt-4 font-display text-4xl font-light md:text-5xl ${
        tone === 'light' ? 'text-cream-soft' : 'text-emerald-deep'}`
        }>
        
        {title}
      </h2>
      <div className="mt-5 flex justify-center" aria-hidden="true">
        <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      </div>
    </header>);

}