import Link from "next/link";
import { getAllAkademikCourses } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function AkademikPage() {
  const courses = await getAllAkademikCourses();

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
              Akademik
            </h1>
          </div>

          <p className="mt-3 text-center text-white/70 text-sm md:text-base">
            Materi kuliah dan tutor untuk Baraya FORMAT
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.slug}
              href={`/program/akademik/${course.slug}`}
              className="akademik-card rounded-2xl p-6 group kegiatan-card-visible"
            >
              <div className="akademik-badge">{course.shortName}</div>
              <h3 className="text-lg font-semibold text-white mt-4 mb-2">
                {course.name}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {course.description}
              </p>
              <div className="kegiatan-divider" />
              <span className="akademik-card-cta">
                Lihat materi & tutor →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
