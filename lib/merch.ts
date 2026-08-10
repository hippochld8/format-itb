export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes?: string[];
}

export const productList: Product[] = [
  {
    id: "1",
    name: "Kaos FORMAT ITB",
    price: 85000,
    image: "/merch-kaos.png",
    description: "Kaos cotton combed 24s, sablon logo FORMAT ITB.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "2",
    name: "Hoodie Mandala Galuh",
    price: 165000,
    image: "/merch-hoodie.png",
    description: "Hoodie fleece tebal, bordir logo Mandala Galuh.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "3",
    name: "Totebag FORMAT ITB",
    price: 45000,
    image: "/merch-totebag.png",
    description: "Totebag kanvas tebal, sablon logo FORMAT ITB.",
  },
  {
    id: "4",
    name: "Pin Set Maskot",
    price: 25000,
    image: "/merch-pin.png",
    description: "Set 3 pin akrilik karakter maskot FORMAT ITB.",
  },
];

export interface ShippingZone {
  id: string;
  label: string;
  price: number;
}

export const shippingZones: ShippingZone[] = [
  { id: "bandung", label: "Dalam Kota Bandung", price: 12000 },
  { id: "garut", label: "Garut & Sekitarnya", price: 20000 },
  { id: "luar", label: "Luar Jawa Barat", price: 35000 },
];

export const WA_ADMIN_NUMBER = "6281234567890"; // ganti ke nomor PIC Merch
export const QRIS_IMAGE = "/qris-format.png"; // ganti ke QRIS asli