"use client";

import { useSyncExternalStore } from "react";

// Nilai selalu stabil, jadi aman dipakai sebagai snapshot useSyncExternalStore.
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

// true setelah komponen ter-hydrate di browser, false saat SSR.
// Dipakai untuk animasi atau menu yang sengaja baru jalan setelah mount.
export function useMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
