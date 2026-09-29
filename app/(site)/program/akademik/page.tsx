import Link from "next/link";
import { getAllAkademikCourses } from "@/db/queries";
import { PageHeader } from "../../_components/PageHeader";

export const dynamic = "force-dynamic";

export default async function AkademikPage() {
  const courses = await getAllAkademikCourses();

  return (
    <main className="relative w-full min-h-screen px-6 md:px-16 pt-36 pb-24">
      <div className="hero-fade-overlay" />

      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Akademik"
          subtitle="Materi kuliah dan tutor untuk Baraya FORMAT"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.slug}
              href={`/program/akademik/${course.slug}`}
              className="akademik-card lg-r-md p-6 group kegiatan-card-visible"
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
                Lihat Materi dan Tutor →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
