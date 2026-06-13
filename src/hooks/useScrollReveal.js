import { useEffect, useRef } from 'react';

export function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('sr-visible');
            obs.unobserve(el);
          }
        },
        { threshold }
      );
      obs.observe(el);
      return () => obs.disconnect();
    } else {
      el.classList.add('sr-visible');
    }
  }, [threshold]);

  return ref;
}
