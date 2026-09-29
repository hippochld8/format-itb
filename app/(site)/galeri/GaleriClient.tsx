"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { PageHeader } from "../_components/PageHeader";
import type { GaleriAlbum } from "@/lib/types";

export default function GaleriClient({ galeriAlbums }: { galeriAlbums: GaleriAlbum[] }) {
  const [activeSlug, setActiveSlug] = useState(galeriAlbums[0]?.slug);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.getAttribute("data-slug") || "");
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToAlbum = (slug: string) => {
    sectionRefs.current[slug]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <main className="relative w-full min-h-screen px-6 md:px-16 pt-36 pb-24">
      <div className="hero-fade-overlay" />

      <div className="max-w-6xl mx-auto">
        <PageHeader title="Galeri" subtitle="Forum Mahasiswa Garut ITB" />

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10">
          {/* Sidebar */}
          <aside className="hidden md:block">
            <div className="galeri-sidebar lg-glass-subtle lg-r-lg sticky top-28 px-5 py-6">
              <span className="galeri-sidebar-eyebrow">Album Kegiatan</span>
              <p className="galeri-sidebar-hint">Lompat ke bagian di bawah.</p>

              <nav className="flex flex-col mt-6">
                {galeriAlbums.map((album) => (
                  <button
                    key={album.slug}
                    onClick={() => scrollToAlbum(album.slug)}
                    className={`galeri-sidebar-link ${
                      activeSlug === album.slug ? "galeri-sidebar-link-active" : ""
                    }`}
                  >
                    {album.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex flex-col gap-20">
            {galeriAlbums.map((album) => (
              <div
                key={album.slug}
                data-slug={album.slug}
                ref={(el) => {
                  sectionRefs.current[album.slug] = el;
                }}
                className="scroll-mt-28"
              >
                <span className="galeri-album-number">{album.number}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
                  {album.title}
                </h2>
                <p className="mt-2 text-white/70 text-sm md:text-base">
                  {album.subtitle}
                </p>

                <div className="galeri-divider" />

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {album.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setLightbox(img)}
                      className="galeri-thumb overflow-hidden aspect-square group"
                    >
                      <img
                        src={img}
                        alt={`${album.title} ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="galeri-lightbox-overlay"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Tutup"
            className="galeri-lightbox-close"
            onClick={() => setLightbox(null)}
          >
            <X size={20} />
          </button>
          <img
            src={lightbox}
            alt=""
            className="galeri-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
