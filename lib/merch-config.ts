import type { ShippingZone } from "./types";

// Konfigurasi operasional merch. Data produk sendiri ada di database
// (tabel merch_product) dan dikelola lewat dashboard.
export const shippingZones: ShippingZone[] = [
  { id: "bandung", label: "Dalam Kota Bandung", price: 12000 },
  { id: "garut", label: "Garut dan Sekeliling", price: 20000 },
  { id: "luar", label: "Luar Jawa Barat", price: 35000 },
];

export const WA_ADMIN_NUMBER = "6281234567890"; // ganti ke nomor PIC Merch
export const QRIS_IMAGE = "/qris-format.png"; // ganti ke QRIS asli
