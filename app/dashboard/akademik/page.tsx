import { db } from "@/db";
import { akademikMatkul } from "@/db/schema";
import { asc } from "drizzle-orm";
import { getCmsResource } from "@/lib/cms-config";
import { requireSection, toPlain } from "@/lib/dashboard-guard";
import ResourceManager from "@/app/dashboard/components/ResourceManager";

export const dynamic = "force-dynamic";

export default async function AkademikAdminPage() {
  await requireSection("akademik");
  const config = getCmsResource("akademik")!;
  const rows = toPlain(
    await db.select().from(akademikMatkul).orderBy(asc(akademikMatkul.id))
  );
  return <ResourceManager config={config} rows={rows} />;
}
