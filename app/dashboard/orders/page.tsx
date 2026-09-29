import { getAllMerchOrders } from "@/db/queries";
import { renderCmsResource } from "../_lib/render-cms-resource";

export const dynamic = "force-dynamic";

export default function OrdersAdminPage() {
  return renderCmsResource({
    section: "orders",
    resource: "orders",
    load: getAllMerchOrders,
  });
}
