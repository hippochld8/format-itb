import { getAllKegiatan } from "@/db/queries";
import { PageHeader } from "../_components/PageHeader";

export const dynamic = "force-dynamic";

export default async function KegiatanPage() {
  const kegiatanList = await getAllKegiatan();

  return (
    <main className="relative w-full min-h-screen px-6 md:px-16 pt-36 pb-24">
      <div className="hero-fade-overlay" />

      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Kegiatan Kami"
          subtitle="Seluruh program dan momen yang menghidupkan FORMAT ITB"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {kegiatanList.map((item) => (
            <div
              key={item.id}
              className="kegiatan-card lg-r-md overflow-hidden group kegiatan-card-visible"
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
      </div>
    </main>
  );
}