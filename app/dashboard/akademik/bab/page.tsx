import { db } from "@/db";
import { akademikMatkul, akademikBab } from "@/db/schema";
import { asc } from "drizzle-orm";
import { renderCmsResource } from "../../_lib/render-cms-resource";

export const dynamic = "force-dynamic";

export default function AkademikBabAdminPage() {
  return renderCmsResource({
    section: "akademik",
    resource: "akademik-bab",
    load: () => db.select().from(akademikBab).orderBy(asc(akademikBab.id)),
    loadSelectOptions: async () => ({
      matkulId: (
        await db.select().from(akademikMatkul).orderBy(asc(akademikMatkul.id))
      ).map((m) => ({ value: String(m.id), label: `${m.shortName} — ${m.name}` })),
    }),
  });
}
