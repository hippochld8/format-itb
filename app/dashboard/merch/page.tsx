import { getAllMerchProducts } from "@/db/queries";
import { getCmsResource } from "@/lib/cms-config";
import { requireSection, toPlain } from "@/lib/dashboard-guard";
import ResourceManager from "@/app/dashboard/components/ResourceManager";

export const dynamic = "force-dynamic";

export default async function MerchAdminPage() {
  await requireSection("merch");
  const config = getCmsResource("merch")!;
  const rows = toPlain(await getAllMerchProducts());
  return <ResourceManager config={config} rows={rows} />;
}
