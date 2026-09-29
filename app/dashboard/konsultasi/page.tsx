import { getAllKonselor } from "@/db/queries";
import { renderCmsResource } from "../_lib/render-cms-resource";

export const dynamic = "force-dynamic";

export default function KonsultasiAdminPage() {
  return renderCmsResource({
    section: "konsultasi",
    resource: "konsultasi",
    load: getAllKonselor,
  });
}
