import { db } from "@/db";
import { galeriAlbum } from "@/db/schema";
import { asc } from "drizzle-orm";
import { renderCmsResource } from "../_lib/render-cms-resource";

export const dynamic = "force-dynamic";

export default function GaleriAdminPage() {
  return renderCmsResource({
    section: "galeri",
    resource: "galeri",
    load: () =>
      db.select().from(galeriAlbum).orderBy(asc(galeriAlbum.number)),
  });
}
