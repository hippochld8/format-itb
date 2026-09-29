import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCintaLokalBySlug } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function CintaLokalDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getCintaLokalBySlug(slug);

  if (!article) notFound();

  return (
    <article className="pt-40 md:pt-48 px-6 md:px-16 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Link href="/cilok" className="cilok-back-link">
          <ArrowLeft size={16} />
          Kembali ke Cinta Lokal
        </Link>

        <div className="cilok-detail-hero rounded-3xl overflow-hidden mt-6 mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full aspect-video object-cover"
          />
        </div>

        <div className="flex gap-2 mb-3">
          {article.tags.map((tag) => (
            <span key={tag} className="cilok-tag">
              #{tag}
            </span>
          ))}
        </div>

        <span className="text-sm text-white/50">{article.date}</span>
        <h1 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-8">
          {article.title}
        </h1>

        <div className="cilok-detail-glass rounded-3xl px-8 py-10 md:px-12 md:py-12 flex flex-col gap-6">
          {article.sections.map((section, i) => {
            if (section.type === "paragraph") {
              return (
                <p key={i} className="text-white/80 text-base leading-relaxed">
                  {section.text}
                </p>
              );
            }

            if (section.type === "gallery") {
              return (
                <div key={i} className="grid grid-cols-3 gap-3">
                  {section.images.map((img, j) => (
                    <div key={j} className="cilok-gallery-item rounded-xl overflow-hidden aspect-square">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              );
            }

            if (section.type === "callout") {
              return (
                <div key={i} className="cilok-callout">
                  {section.text}
                </div>
              );
            }

            if (section.type === "quote") {
              return (
                <div key={i} className="cilok-quote-block">
                  <span className="cilok-quote-speaker">{section.speaker}</span>
                  <div className="flex flex-col gap-3 mt-3">
                    {section.lines.map((line, j) => (
                      <p key={j} className="cilok-quote-bubble">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              );
            }

            if (section.type === "list") {
              return (
                <div key={i}>
                  <span className="cilok-list-title">{section.title}</span>
                  <ol className="cilok-list mt-3">
                    {section.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ol>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </article>
  );
}