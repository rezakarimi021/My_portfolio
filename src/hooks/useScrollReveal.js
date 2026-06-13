import { useEffect, useRef } from 'react';

// type: 'up' | 'left' | 'right' | 'fade' | 'scale' | 'stagger'
export function useScrollReveal(options = {}) {
  const {
    threshold = 0.12,
    type = 'up',
    delay = 0,
  } = typeof options === 'number' ? { threshold: options } : options;

  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('sr-init', `sr-${type}`);
    if (delay) el.style.transitionDelay = `${delay}ms`;

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
  }, [threshold, type, delay]);

  return ref;
}
