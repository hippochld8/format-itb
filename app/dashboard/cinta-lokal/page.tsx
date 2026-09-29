import { getAllCintaLokal } from "@/db/queries";
import { renderCmsResource } from "../_lib/render-cms-resource";

export const dynamic = "force-dynamic";

export default function CintaLokalAdminPage() {
  return renderCmsResource({
    section: "cinta-lokal",
    resource: "cinta-lokal",
    load: getAllCintaLokal,
  });
}
