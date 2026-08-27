"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  tags: string[];
}

export default function CintaLokalClient({ articles }: { articles: Article[] }) {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative w-full min-h-screen px-6 md:px-16 py-24">
      <div className="hero-fade-overlay" />

      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
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
              Cinta Lokal
            </h1>
          </div>

          <p className="mt-3 text-center text-white/70 text-sm md:text-base">
            Seluruh riset dan cerita seputar Garut dari FORMAT ITB
          </p>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
        >
          {articles.map((article, i) => (
            <Link
              key={article.slug}
              href={`/cilok/${article.slug}`}
              className={`kegiatan-card rounded-2xl overflow-hidden group ${
                visible ? "kegiatan-card-visible" : ""
              }`}
              style={{ transitionDelay: `${(i % 4) * 100}ms` }}
            >
              <div className="w-full aspect-square overflow-hidden bg-white/5">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <span className="text-xs text-white/50">{article.date}</span>
                <h3 className="text-lg font-semibold text-white mt-1 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="kegiatan-divider" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
