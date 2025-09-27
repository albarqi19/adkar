import { useCallback, useEffect, useState } from "react";

type StorageValue<T> = T | (() => T);

const isBrowser = typeof window !== "undefined";

export function useLocalStorage<T>(key: string, defaultValue: StorageValue<T>) {
  const [value, setValue] = useState<T>(() => {
    if (!isBrowser) {
      return typeof defaultValue === "function"
        ? (defaultValue as () => T)()
        : defaultValue;
    }

    try {
      const stored = window.localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored) as T;
      }
    } catch (error) {
      console.warn(`Failed parsing localStorage key "${key}":`, error);
    }

    return typeof defaultValue === "function"
      ? (defaultValue as () => T)()
      : defaultValue;
  });

  useEffect(() => {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Failed setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  const remove = useCallback(() => {
    if (!isBrowser) return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed removing localStorage key "${key}":`, error);
    }
  }, [key]);

  return [value, setValue, remove] as const;
}
