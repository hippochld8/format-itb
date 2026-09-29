import { db } from "@/db";
import { akademikMatkul } from "@/db/schema";
import { asc } from "drizzle-orm";
import { renderCmsResource } from "../_lib/render-cms-resource";

export const dynamic = "force-dynamic";

export default function AkademikAdminPage() {
  return renderCmsResource({
    section: "akademik",
    resource: "akademik",
    load: () =>
      db.select().from(akademikMatkul).orderBy(asc(akademikMatkul.id)),
  });
}
