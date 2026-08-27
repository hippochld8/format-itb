import { getAllBeasiswa } from "@/db/queries";
import { getCmsResource } from "@/lib/cms-config";
import { requireSection, toPlain } from "@/lib/dashboard-guard";
import ResourceManager from "@/app/dashboard/components/ResourceManager";

export const dynamic = "force-dynamic";

export default async function BeasiswaAdminPage() {
  await requireSection("beasiswa");
  const config = getCmsResource("beasiswa")!;
  const rows = toPlain(await getAllBeasiswa());
  return <ResourceManager config={config} rows={rows} />;
}
