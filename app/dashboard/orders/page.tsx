import { getAllMerchOrders } from "@/db/queries";
import { getCmsResource } from "@/lib/cms-config";
import { requireSection, toPlain } from "@/lib/dashboard-guard";
import ResourceManager from "@/app/dashboard/components/ResourceManager";

export const dynamic = "force-dynamic";

export default async function OrdersAdminPage() {
  await requireSection("orders");
  const config = getCmsResource("orders")!;
  const rows = toPlain(await getAllMerchOrders());
  return <ResourceManager config={config} rows={rows} />;
}
