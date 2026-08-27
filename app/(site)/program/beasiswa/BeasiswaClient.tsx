"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Users, ExternalLink } from "lucide-react";
import type { Beasiswa, BeasiswaStatus } from "@/lib/beasiswa";

const filters: { label: string; value: BeasiswaStatus | "semua" }[] = [
  { label: "Semua", value: "semua" },
  { label: "Dibuka", value: "buka" },
  { label: "Segera Tutup", value: "segera-tutup" },
  { label: "Ditutup", value: "tutup" },
];

const statusLabel: Record<BeasiswaStatus, string> = {
  buka: "Dibuka",
  "segera-tutup": "Segera Tutup",
  tutup: "Ditutup",
};

export default function BeasiswaClient({ beasiswaList }: { beasiswaList: Beasiswa[] }) {
  const [activeFilter, setActiveFilter] = useState<BeasiswaStatus | "semua">("semua");

  const filtered =
    activeFilter === "semua"
      ? beasiswaList
      : beasiswaList.filter((b) => b.status === activeFilter);

  return (
    <main className="relative w-full min-h-screen px-6 md:px-16 py-24">
      <div className="hero-fade-overlay" />

      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="relative flex items-center justify-center">
            <Link
              href="/"
              aria-label="Kembali ke Beranda"
              className="absolute left-0 inline-flex items-center justify-center w-8 h-8 rounded-full transition-transform hover:scale-105 mt-10"
              style={{ backgroundColor: "#A3C544" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#13202C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </Link>

            <h1 className="text-3xl md:text-5xl font-bold text-white mt-8">
              Beasiswa
            </h1>
          </div>

          <p className="mt-3 text-center text-white/70 text-sm md:text-base">
            Info beasiswa untuk Baraya FORMAT, diperbarui tiap bulan
          </p>
        </div>

        {/* Filter status */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`beasiswa-filter-btn ${
                activeFilter === f.value ? "beasiswa-filter-btn-active" : ""
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* List beasiswa */}
        <div className="flex flex-col gap-4">
          {filtered.length === 0 && (
            <p className="text-center text-white/50 text-sm py-10">
              Belum ada beasiswa untuk kategori ini.
            </p>
          )}

          {filtered.map((b) => (
            <div key={b.id} className={`beasiswa-card beasiswa-card-${b.status}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className={`beasiswa-status-badge beasiswa-status-${b.status}`}>
                    {statusLabel[b.status]}
                  </span>
                  <span className="text-xs text-white/50">{b.provider}</span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-1.5">
                  {b.name}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-3">
                  {b.description}
                </p>

                <div className="flex flex-wrap gap-4 text-xs text-white/50">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {b.deadline}
                  </span>
                  {b.quota && (
                    <span className="flex items-center gap-1.5">
                      <Users size={13} />
                      {b.quota}
                    </span>
                  )}
                </div>
              </div>

              {b.status !== "tutup" && (
                <a
                  href={b.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="beasiswa-cta-btn"
                >
                  Daftar
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
