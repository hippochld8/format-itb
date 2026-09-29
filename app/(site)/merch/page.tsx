import { getAllMerchProducts } from "@/db/queries";
import { shippingZones, WA_ADMIN_NUMBER, QRIS_IMAGE } from "@/lib/merch-config";
import MerchClient from "./MerchClient";

export const dynamic = "force-dynamic";

export default async function MerchPage() {
  const rows = await getAllMerchProducts();

  const products = rows.map((p) => ({
    id: String(p.id),
    name: p.name,
    price: p.price,
    image: p.image,
    description: p.description,
    sizes: p.sizes ?? undefined,
    variants: p.variants ?? undefined,
  }));

  return (
    <MerchClient
      products={products}
      shippingZones={shippingZones}
      waAdminNumber={WA_ADMIN_NUMBER}
      qrisImage={QRIS_IMAGE}
    />
  );
}
