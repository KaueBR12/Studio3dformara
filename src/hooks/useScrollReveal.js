import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          obs.unobserve(el);
        }
      },
      { 
        threshold: 0.05,
        rootMargin: '0px 0px 200px 0px' // Triggers 200px before entering viewport
      }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}
