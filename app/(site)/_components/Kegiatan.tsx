"use client";

import Link from "next/link";
import { useInView } from "@/lib/hooks/use-in-view";

type KegiatanItem = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export default function Kegiatan({ kegiatanList }: { kegiatanList: KegiatanItem[] }) {
  const { ref: sectionRef, inView: visible } = useInView();

  return (
    <section className="relative w-full px-6 md:px-16 py-20">
      {/* Fade transisi dari Hero */}
      <div className="hero-fade-overlay" />

      <div
        ref={sectionRef}
        className="mx-auto lg-r-lg px-8 py-6 md:px-14 md:py-8"
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Kegiatan Kami
          </h2>
          <p className="mt-3 text-white/70 text-sm md:text-base">
            Program dan momen yang menghidupkan FORMAT ITB
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {kegiatanList.map((item, i) => (
            <div
              key={item.id}
              className={`kegiatan-card lg-r-md overflow-hidden group ${visible ? "kegiatan-card-visible" : ""}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-full aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {item.description}
                </p>
                <div className="kegiatan-divider" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/kegiatan"
            className="lg-btn lg-btn-primary px-7 py-3.5"
          >
            Lihat Lebih Banyak
          </Link>
        </div>
      </div>
    </section>
  );
}