import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing a value.
 * @param value - The input value to debounce.
 * @param delay - The delay in milliseconds.
 * @returns The debounced value.
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler); // Cleanup on value change
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
