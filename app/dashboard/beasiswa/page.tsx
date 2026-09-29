import { getAllBeasiswa } from "@/db/queries";
import { renderCmsResource } from "../_lib/render-cms-resource";

export const dynamic = "force-dynamic";

export default function BeasiswaAdminPage() {
  return renderCmsResource({
    section: "beasiswa",
    resource: "beasiswa",
    load: getAllBeasiswa,
  });
}
