import { getAllMerchProducts } from "@/db/queries";
import { renderCmsResource } from "../_lib/render-cms-resource";

export const dynamic = "force-dynamic";

export default function MerchAdminPage() {
  return renderCmsResource({
    section: "merch",
    resource: "merch",
    load: getAllMerchProducts,
  });
}
