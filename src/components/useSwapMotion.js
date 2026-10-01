import { useEffect, useRef } from 'react';

// Short, compositor-only movement. Content stays fully visible throughout.
export default function useSwapMotion(ref, value) {
  const previous = useRef(value);
  useEffect(() => {
    if (previous.current === value) return;
    previous.current = value;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const animation = ref.current?.animate?.(
      [{ transform: 'translateY(7px)' }, { transform: 'translateY(0)' }],
      { duration: 180, easing: 'cubic-bezier(.2,.7,.3,1)' },
    );
    return () => animation?.cancel();
  }, [ref, value]);
}
