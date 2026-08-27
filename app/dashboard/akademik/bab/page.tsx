import { db } from "@/db";
import { akademikMatkul, akademikBab } from "@/db/schema";
import { asc } from "drizzle-orm";
import { getCmsResource } from "@/lib/cms-config";
import { requireSection, toPlain } from "@/lib/dashboard-guard";
import ResourceManager from "@/app/dashboard/components/ResourceManager";

export const dynamic = "force-dynamic";

export default async function AkademikBabAdminPage() {
  await requireSection("akademik");
  const config = getCmsResource("akademik-bab")!;
  const rows = toPlain(
    await db.select().from(akademikBab).orderBy(asc(akademikBab.id))
  );
  const matkuls = await db.select().from(akademikMatkul).orderBy(asc(akademikMatkul.id));
  const selectOptions = {
    matkulId: matkuls.map((m) => ({ value: String(m.id), label: `${m.shortName} — ${m.name}` })),
  };
  return <ResourceManager config={config} rows={rows} selectOptions={selectOptions} />;
}
