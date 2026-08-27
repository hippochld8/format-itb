import { getAllCintaLokal } from "@/db/queries";
import CintaLokalClient from "./CintaLokalClient";

export const dynamic = "force-dynamic";

export default async function CintaLokalPage() {
  const rows = await getAllCintaLokal();

  const articles = rows.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    image: a.image,
    date: a.date,
    tags: a.tags,
  }));

  return <CintaLokalClient articles={articles} />;
}
