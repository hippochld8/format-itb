import { getAllKonselor } from "@/db/queries";
import { getCmsResource } from "@/lib/cms-config";
import { requireSection, toPlain } from "@/lib/dashboard-guard";
import ResourceManager from "@/app/dashboard/components/ResourceManager";

export const dynamic = "force-dynamic";

export default async function KonsultasiAdminPage() {
  await requireSection("konsultasi");
  const config = getCmsResource("konsultasi")!;
  const rows = toPlain(await getAllKonselor());
  return <ResourceManager config={config} rows={rows} />;
}
