"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ChevronDown, FileText, User } from "lucide-react";
import { getCourseBySlug } from "@/lib/akademik";

export default function AkademikDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const course = getCourseBySlug(slug);
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  if (!course) notFound();

  return (
    <main className="relative w-full min-h-screen px-6 md:px-16 py-24">
      <div className="hero-fade-overlay" />

      <div className="max-w-3xl mx-auto">
        <Link href="/program/akademik" className="cilok-back-link">
          ← Kembali ke Akademik
        </Link>

        <div className="mt-6 mb-4">
          <div className="akademik-badge">{course.shortName}</div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mt-4">
            {course.name}
          </h1>
          <p className="mt-3 text-white/70 text-sm md:text-base">
            {course.description}
          </p>
        </div>

        {/* Materi per bab */}
        <div className="cilok-detail-glass rounded-3xl px-6 py-8 md:px-10 md:py-10 mb-8">
          <span className="kabinet-eyebrow">Materi</span>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-2 mb-6">
            Bab & Topik
          </h2>

          <div className="flex flex-col gap-2">
            {course.chapters.map((chapter, i) => (
              <div key={chapter.title} className="akademik-accordion">
                <button
                  onClick={() => setOpenChapter(openChapter === i ? null : i)}
                  className="akademik-accordion-header"
                >
                  <span>{chapter.title}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${
                      openChapter === i ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`akademik-accordion-body ${
                    openChapter === i ? "akademik-accordion-body-open" : ""
                  }`}
                >
                  <a
                    href={chapter.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="akademik-drive-link"
                  >
                    <FileText size={16} />
                    Buka materi di Google Drive
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tutor */}
        <div className="cilok-detail-glass rounded-3xl px-6 py-8 md:px-10 md:py-10">
          <span className="kabinet-eyebrow">Tutor</span>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-2 mb-6">
            Tutor {course.name}
          </h2>

          <div className="akademik-tutor-card">
            <div className="ketua-photo-placeholder">
              <User size={28} />
            </div>
            <div>
              <p className="text-white font-semibold">Ganti Nama Tutor</p>
              <p className="text-white/50 text-sm">Jadwal & kontak menyusul</p>
            </div>
          </div>

          <p className="text-white/50 text-xs mt-4">
            Belum ada tutor terjadwal? Hubungi PIC Akademik untuk request sesi.
          </p>
        </div>
      </div>
    </main>
  );
}