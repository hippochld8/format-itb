import { db } from "@/db";
import { galeriAlbum } from "@/db/schema";
import { asc } from "drizzle-orm";
import { getCmsResource } from "@/lib/cms-config";
import { requireSection, toPlain } from "@/lib/dashboard-guard";
import ResourceManager from "@/app/dashboard/components/ResourceManager";

export const dynamic = "force-dynamic";

export default async function GaleriAdminPage() {
  await requireSection("galeri");
  const config = getCmsResource("galeri")!;
  const rows = toPlain(
    await db.select().from(galeriAlbum).orderBy(asc(galeriAlbum.number))
  );
  return <ResourceManager config={config} rows={rows} />;
}
