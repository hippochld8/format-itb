"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

// localStorage itu "external store", jadi dibaca lewat useSyncExternalStore
// (bukan setState di dalam effect) supaya tidak ada render berlapis.
// parsedValue di-cache berdasarkan string mentah supaya getSnapshot selalu
// mengembalikan referensi yang sama — tanpa itu useSyncExternalStore loop.
const parsedCache = new Map<string, { raw: string | null; value: unknown }>();
const listeners = new Map<string, Set<() => void>>();

function emit(key: string) {
  listeners.get(key)?.forEach((listener) => listener());
}

function subscribe(key: string) {
  return (onStoreChange: () => void) => {
    let set = listeners.get(key);
    if (!set) {
      set = new Set();
      listeners.set(key, set);
    }
    set.add(onStoreChange);

    const onStorage = (event: StorageEvent) => {
      if (event.key === key) onStoreChange();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      set.delete(onStoreChange);
      if (set.size === 0) listeners.delete(key);
      window.removeEventListener("storage", onStorage);
    };
  };
}

function readValue<T>(key: string, fallback: T): T {
  const raw = window.localStorage.getItem(key);
  const cached = parsedCache.get(key);
  if (cached && cached.raw === raw) return cached.value as T;

  let value = fallback;
  if (raw !== null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = fallback;
    }
  }
  parsedCache.set(key, { raw, value });
  return value;
}

export function useLocalStorage<T>(
  key: string,
  fallback: T
): [T, (next: T | ((prev: T) => T)) => void] {
  const fallbackRef = useRef(fallback);

  const getSnapshot = useCallback(
    () => readValue<T>(key, fallbackRef.current),
    [key]
  );
  const getServerSnapshot = useCallback(() => fallbackRef.current, []);

  const value = useSyncExternalStore(
    subscribe(key),
    getSnapshot,
    getServerSnapshot
  );

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const current = readValue<T>(key, fallbackRef.current);
      const resolved =
        typeof next === "function" ? (next as (prev: T) => T)(current) : next;
      window.localStorage.setItem(key, JSON.stringify(resolved));
      emit(key);
    },
    [key]
  );

  return [value, setValue];
}

export function removeLocalStorageItem(key: string) {
  window.localStorage.removeItem(key);
  parsedCache.delete(key);
  emit(key);
}
