import { db } from "@/db";
import { galeriAlbum, galeriFoto } from "@/db/schema";
import { asc } from "drizzle-orm";
import { renderCmsResource } from "../../_lib/render-cms-resource";

export const dynamic = "force-dynamic";

export default function GaleriFotoAdminPage() {
  return renderCmsResource({
    section: "galeri",
    resource: "galeri-foto",
    load: () => db.select().from(galeriFoto).orderBy(asc(galeriFoto.id)),
    loadSelectOptions: async () => ({
      albumId: (
        await db.select().from(galeriAlbum).orderBy(asc(galeriAlbum.number))
      ).map((a) => ({ value: String(a.id), label: `${a.number} — ${a.title}` })),
    }),
  });
}
