import { getAllKegiatan } from "@/db/queries";
import { getCmsResource } from "@/lib/cms-config";
import { requireSection, toPlain } from "@/lib/dashboard-guard";
import ResourceManager from "@/app/dashboard/components/ResourceManager";

export const dynamic = "force-dynamic";

export default async function KegiatanAdminPage() {
  await requireSection("kegiatan");
  const config = getCmsResource("kegiatan")!;
  const rows = toPlain(await getAllKegiatan());
  return <ResourceManager config={config} rows={rows} />;
}
