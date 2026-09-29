"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[dashboard-error]", error);
  }, [error]);

  return (
    <div className="lg-glass lg-r-lg p-8 text-center">
      <div className="relative z-[2]">
        <h2 className="text-xl font-bold text-white">Halaman gagal dimuat</h2>
        <p className="text-sm text-white/60 mt-2">
          Ada kesalahan saat memuat data dashboard. Coba muat ulang halaman. Kalau tetap
          gagal,hubungi admin website.
        </p>
        {error.digest && (
          <p className="text-xs text-white/40 mt-3">
            Kode error: <span className="font-mono">{error.digest}</span>
          </p>
        )}
        <button onClick={reset} className="lg-btn lg-btn-primary mt-5 px-5 py-2.5 text-sm">
          Coba lagi
        </button>
      </div>
    </div>
  );
}
