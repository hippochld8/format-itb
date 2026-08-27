import { notFound } from "next/navigation";
import { getAkademikBySlug } from "@/db/queries";
import AkademikDetailClient from "./AkademikDetailClient";

export const dynamic = "force-dynamic";

export default async function AkademikDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getAkademikBySlug(slug);

  if (!course) notFound();

  return <AkademikDetailClient course={course} />;
}
