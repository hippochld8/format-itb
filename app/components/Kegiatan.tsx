"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type KegiatanItem = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export default function Kegiatan({ kegiatanList }: { kegiatanList: KegiatanItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full px-6 md:px-16 py-20">
      {/* Fade transisi dari Hero */}
      <div className="hero-fade-overlay" />

      <div
        ref={sectionRef}
        className="mx-auto rounded-3xl px-8 py-6 md:px-14 md:py-8"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
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
              className={`kegiatan-card rounded-2xl overflow-hidden group ${visible ? "kegiatan-card-visible" : ""}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-full aspect-square overflow-hidden bg-white/5">
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
            className="px-6 py-3 rounded-full font-medium text-[#13202C] transition-transform hover:scale-105"
            style={{ backgroundColor: "#A3C544" }}
          >
            Lihat Lebih Banyak
          </Link>
        </div>
      </div>
    </section>
  );
}