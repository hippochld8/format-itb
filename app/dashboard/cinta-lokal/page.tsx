import { getAllCintaLokal } from "@/db/queries";
import { getCmsResource } from "@/lib/cms-config";
import { requireSection, toPlain } from "@/lib/dashboard-guard";
import ResourceManager from "@/app/dashboard/components/ResourceManager";

export const dynamic = "force-dynamic";

export default async function CintaLokalAdminPage() {
  await requireSection("cinta-lokal");
  const config = getCmsResource("cinta-lokal")!;
  const rows = toPlain(await getAllCintaLokal());
  return <ResourceManager config={config} rows={rows} />;
}
