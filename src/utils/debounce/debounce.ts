// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

export function debounce(
  func: (...args: any[]) => void,
  waitMs: number,
  immediate = false
) {
  let timeout: TimeoutId | undefined;
  return (...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = undefined;
      if (!immediate) func(...args);
    }, waitMs);
    if (immediate && !timeout) func(...args);
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle(func: (...args: any[]) => void, timeFrame: number) {
  let lastTime = 0;
  return (...args: unknown[]) => {
    const now = new Date().getTime();
    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
}
