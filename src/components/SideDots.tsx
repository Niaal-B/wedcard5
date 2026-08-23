import React, { useEffect, useState } from 'react';
import { sections } from '../data/wedding';

export function SideDots() {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.
        filter((entry) => entry.isIntersecting).
        sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.5, 0.75] }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
      
      {sections.map((section) => {
        const isActive = section.id === active;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-label={section.label}
            aria-current={isActive ? 'true' : undefined}
            className="group flex h-4 w-4 items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
            
            <span
              className={`block rounded-full transition-[width,height,background-color] duration-200 ease-out ${
              isActive ?
              'h-2 w-2 bg-gold' :
              'h-1.5 w-1.5 bg-ink/25 group-hover:bg-gold/60'}`
              } />
            
          </a>);

      })}
    </nav>);

}