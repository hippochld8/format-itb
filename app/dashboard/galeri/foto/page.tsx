import { db } from "@/db";
import { galeriAlbum, galeriFoto } from "@/db/schema";
import { asc } from "drizzle-orm";
import { getCmsResource } from "@/lib/cms-config";
import { requireSection, toPlain } from "@/lib/dashboard-guard";
import ResourceManager from "@/app/dashboard/components/ResourceManager";

export const dynamic = "force-dynamic";

export default async function GaleriFotoAdminPage() {
  await requireSection("galeri");
  const config = getCmsResource("galeri-foto")!;
  const rows = toPlain(
    await db.select().from(galeriFoto).orderBy(asc(galeriFoto.id))
  );
  const albums = await db.select().from(galeriAlbum).orderBy(asc(galeriAlbum.number));
  const selectOptions = {
    albumId: albums.map((a) => ({ value: String(a.id), label: `${a.number} — ${a.title}` })),
  };
  return <ResourceManager config={config} rows={rows} selectOptions={selectOptions} />;
}
