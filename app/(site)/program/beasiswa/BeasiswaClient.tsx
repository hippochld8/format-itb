"use client";

import { useState } from "react";
import { Calendar, Users, ExternalLink } from "lucide-react";
import type { Beasiswa, BeasiswaStatus } from "@/lib/types";
import { PageHeader } from "../../_components/PageHeader";

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
    <main className="relative w-full min-h-screen px-6 md:px-16 pt-36 pb-24">
      <div className="hero-fade-overlay" />

      <div className="max-w-5xl mx-auto">
        <PageHeader
          title="Beasiswa"
          subtitle="Info beasiswa untuk Baraya FORMAT, diperbarui tiap bulan"
          className="mb-10"
        />

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
