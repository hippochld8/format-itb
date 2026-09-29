"use client";

import Link from "next/link";
import { PageHeader } from "../_components/PageHeader";
import { useInView } from "@/lib/hooks/use-in-view";
import type { CintaLokalSummary } from "@/lib/types";

export default function CintaLokalClient({ articles }: { articles: CintaLokalSummary[] }) {
  const { ref: sectionRef, inView: visible } = useInView({ threshold: 0.1 });

  return (
    <main className="relative w-full min-h-screen px-6 md:px-16 pt-36 pb-24">
      <div className="hero-fade-overlay" />

      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Cinta Lokal"
          subtitle="Seluruh riset dan cerita seputar Garut dari FORMAT ITB"
        />

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
