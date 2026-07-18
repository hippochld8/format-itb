"use client";
 
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
 
const kegiatanList = [
  {
    id: 1,
    title: "Ganesha Untuk Garut",
    description:
      "Roadshow pengenalan ITB ke sekolah-sekolah di Garut, jembatan mimpi adik-adik menuju kampus.",
    image: "gantar.jpg",
  },
  {
    id: 2,
    title: "Malam Keakraban",
    description:
      "Ruang untuk mempererat kekeluargaan antar anggota FORMAT lintas angkatan. Biasanya diadakan setelah Gantar.",
    image: "makrab.jpg",
  },
  {
    id: 3,
    title: "Welcoming Party!",
    description:
      "Penyambutan mahasiswa Garut di ITB yang baru setiap tahun ajaran baru. Berisi pengenalan mengenai FORMAT ITB.",
    image: "welpar.jpg",
  },
  {
    id: 4,
    title: "Syukuran Wisuda",
    description:
      "Acara syukuran setelah ada mahasiswa Garut di ITB wisuda. Biasanya diadakan setiap bulan April dan Oktober.",
    image: "syukwis.jpg",
  },
  {
    id: 5,
    title: "Ganti judul kegiatan 5",
    description: "Ganti deskripsi kegiatan 5.",
    image: "kegiatan5.jpg",
  },
  {
    id: 6,
    title: "Ganti judul kegiatan 6",
    description: "Ganti deskripsi kegiatan 6.",
    image: "kegiatan6.jpg",
  },
  {
    id: 7,
    title: "Ganti judul kegiatan 7",
    description: "Ganti deskripsi kegiatan 7.",
    image: "kegiatan7.jpg",
  },
  {
    id: 8,
    title: "Ganti judul kegiatan 8",
    description: "Ganti deskripsi kegiatan 8.",
    image: "kegiatan8.jpg",
  },
  {
    id: 9,
    title: "Ganti judul kegiatan 9",
    description: "Ganti deskripsi kegiatan 9.",
    image: "kegiatan9.jpg",
  },
  {
    id: 10,
    title: "Ganti judul kegiatan 10",
    description: "Ganti deskripsi kegiatan 10.",
    image: "kegiatan10.jpg",
  },
];
 
export default function KegiatanPage() {
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
              Kegiatan Kami
            </h1>
          </div>
 
          <p className="mt-3 text-center text-white/70 text-sm md:text-base">
            Seluruh program dan momen yang menghidupkan FORMAT ITB
          </p>
        </div>
 
        <div
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
        >
          {kegiatanList.map((item, i) => (
            <div
              key={item.id}
              className={`kegiatan-card rounded-2xl overflow-hidden group ${
                visible ? "kegiatan-card-visible" : ""
              }`}
              style={{ transitionDelay: `${(i % 4) * 100}ms` }}
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
      </div>
    </main>
  );
}