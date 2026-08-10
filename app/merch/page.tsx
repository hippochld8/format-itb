"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Plus, Minus, X, MapPin, Store } from "lucide-react";
import { productList, shippingZones, WA_ADMIN_NUMBER, QRIS_IMAGE, type Product } from "@/lib/merch";

interface CartItem {
  productId: string;
  size?: string;
  qty: number;
}

type DeliveryMethod = "ambil" | "kirim";

export default function MerchPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("ambil");
  const [address, setAddress] = useState("");
  const [shippingZoneId, setShippingZoneId] = useState<string>(shippingZones[0].id);
  const [buyerName, setBuyerName] = useState("");
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({});

  // Load cart dari localStorage saat pertama mount
  useEffect(() => {
    const saved = localStorage.getItem("format-merch-cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);

  // Simpan cart setiap berubah
  useEffect(() => {
    localStorage.setItem("format-merch-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const size = selectedSize[product.id];
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.productId === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { productId: product.id, size, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (index: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev];
      next[index].qty += delta;
      if (next[index].qty <= 0) {
        next.splice(index, 1);
      }
      return next;
    });
  };

  const removeItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const cartDetails = cart.map((item) => ({
    ...item,
    product: productList.find((p) => p.id === item.productId)!,
  }));

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cartDetails.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );
  const selectedZone = shippingZones.find((z) => z.id === shippingZoneId);
  const shippingCost = deliveryMethod === "kirim" ? selectedZone?.price ?? 0 : 0;
  const total = subtotal + shippingCost;

  const formatRupiah = (n: number) =>
    "Rp" + n.toLocaleString("id-ID");

  const buildWaMessage = () => {
  const lines = [
    `Halo, saya mau pesan merch FORMAT ITB.`,
    ``,
    `Nama: ${buyerName || "-"}`,
    `Metode: ${deliveryMethod === "ambil" ? "Ambil sendiri" : "Dikirim"}`,
  ];
  if (deliveryMethod === "kirim") {
    lines.push(`Alamat: ${address || "-"}`);
    lines.push(`Zona pengiriman: ${selectedZone?.label ?? "-"}`);
  }
  lines.push(``, `Rincian pesanan:`);
  cartDetails.forEach((item) => {
    lines.push(
      `- ${item.product.name}${item.size ? ` (${item.size})` : ""} x${item.qty} = ${formatRupiah(item.product.price * item.qty)}`
    );
  });
  lines.push(``, `Subtotal barang: ${formatRupiah(subtotal)}`);
  if (deliveryMethod === "kirim") {
    lines.push(`Ongkos kirim (${selectedZone?.label}): ${formatRupiah(shippingCost)}`);
  }
  lines.push(`Total: ${formatRupiah(total)}`);
  lines.push(``, `Saya sudah transfer via QRIS, mohon dicek ya kak.`);
  return lines.join("\n");
};

  const canCheckout =
    cart.length > 0 &&
    buyerName.trim() !== "" &&
    (deliveryMethod === "ambil" || address.trim() !== "");

  return (
    <main className="relative w-full min-h-screen px-6 md:px-16 py-24">
      <div className="hero-fade-overlay" />

      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <div className="relative flex items-center justify-center">
            <Link
              href="/"
              aria-label="Kembali ke Beranda"
              className="absolute left-0 inline-flex items-center justify-center w-8 h-8 rounded-full transition-transform hover:scale-105 mt-10"
              style={{ backgroundColor: "#A3C544" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#13202C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </Link>

            <h1 className="text-3xl md:text-5xl font-bold text-white mt-8">
              Merch
            </h1>
          </div>

          <p className="mt-3 text-center text-white/70 text-sm md:text-base">
            Merchandise resmi FORMAT ITB
          </p>
        </div>

        {/* Grid produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productList.map((product) => (
            <div key={product.id} className="merch-product-card">
              <div className="w-full aspect-square overflow-hidden rounded-2xl bg-white/5 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-white font-semibold mb-1">{product.name}</h3>
              <p className="text-white/50 text-xs mb-2 leading-relaxed">
                {product.description}
              </p>
              <p className="text-[#A3C544] font-bold mb-3">
                {formatRupiah(product.price)}
              </p>

              {product.sizes && (
                <div className="flex gap-1.5 mb-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setSelectedSize((prev) => ({ ...prev, [product.id]: size }))
                      }
                      className={`merch-size-btn ${
                        selectedSize[product.id] === size ? "merch-size-btn-active" : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => addToCart(product)}
                disabled={!!product.sizes && !selectedSize[product.id]}
                className="merch-add-btn"
              >
                {product.sizes && !selectedSize[product.id]
                  ? "Pilih ukuran dulu"
                  : "Tambah ke Keranjang"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Floating cart button */}
      <button
        onClick={() => setCartOpen(true)}
        className="merch-cart-fab"
        aria-label="Buka keranjang"
      >
        <ShoppingBag size={22} />
        {totalItems > 0 && <span className="merch-cart-badge">{totalItems}</span>}
      </button>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="merch-drawer-overlay" onClick={() => setCartOpen(false)}>
          <div className="merch-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Keranjang</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="org-modal-close"
                aria-label="Tutup keranjang"
              >
                <X size={18} />
              </button>
            </div>

            {cartDetails.length === 0 ? (
              <p className="text-white/50 text-sm text-center py-10">
                Keranjang masih kosong.
              </p>
            ) : (
              <>
                <div className="flex flex-col gap-4 mb-6 overflow-y-auto flex-1">
                  {cartDetails.map((item, i) => (
                    <div key={i} className="merch-cart-item">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="merch-cart-item-img"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">
                          {item.product.name}
                        </p>
                        {item.size && (
                          <p className="text-white/50 text-xs">Ukuran: {item.size}</p>
                        )}
                        <p className="text-[#A3C544] text-sm font-semibold">
                          {formatRupiah(item.product.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(i, -1)}
                          className="merch-qty-btn"
                          aria-label="Kurangi"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-white text-sm w-4 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(i, 1)}
                          className="merch-qty-btn"
                          aria-label="Tambah"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(i)}
                        className="merch-remove-btn"
                        aria-label="Hapus"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 mb-4">
                  <div className="flex justify-between text-white font-semibold">
                    <span>Subtotal</span>
                    <span>{formatRupiah(subtotal)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCartOpen(false);
                    setCheckoutOpen(true);
                  }}
                  className="merch-checkout-btn"
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Checkout modal */}
      {checkoutOpen && (
        <div className="merch-drawer-overlay" onClick={() => setCheckoutOpen(false)}>
          <div className="merch-checkout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Checkout</h2>
              <button
                onClick={() => setCheckoutOpen(false)}
                className="org-modal-close"
                aria-label="Tutup checkout"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <label className="merch-form-label">Nama Pemesan</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Nama lengkap"
                  className="merch-form-input"
                />
              </div>

              <div>
                <label className="merch-form-label">Metode Pengambilan</label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button
                    onClick={() => setDeliveryMethod("ambil")}
                    className={`merch-method-btn ${
                      deliveryMethod === "ambil" ? "merch-method-btn-active" : ""
                    }`}
                  >
                    <Store size={18} />
                    Ambil Sendiri
                  </button>
                  <button
                    onClick={() => setDeliveryMethod("kirim")}
                    className={`merch-method-btn ${
                      deliveryMethod === "kirim" ? "merch-method-btn-active" : ""
                    }`}
                  >
                    <MapPin size={18} />
                    Dikirim
                  </button>
                </div>
              </div>

{deliveryMethod === "kirim" && (
  <>
    <div>
      <label className="merch-form-label">Alamat Lengkap</label>
      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Nama jalan, nomor rumah, kecamatan, kota, kode pos"
        rows={3}
        className="merch-form-input resize-none"
      />
    </div>

    <div>
      <label className="merch-form-label">Zona Pengiriman</label>
      <div className="flex flex-col gap-2 mt-2">
        {shippingZones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => setShippingZoneId(zone.id)}
            className={`merch-zone-btn ${
              shippingZoneId === zone.id ? "merch-zone-btn-active" : ""
            }`}
          >
            <span>{zone.label}</span>
            <span>{formatRupiah(zone.price)}</span>
          </button>
        ))}
      </div>
    </div>
  </>
)}

<div className="border-t border-white/10 pt-4 flex flex-col gap-1.5">
  <div className="flex justify-between text-white/70 text-sm">
    <span>Subtotal barang</span>
    <span>{formatRupiah(subtotal)}</span>
  </div>
  {deliveryMethod === "kirim" && (
    <div className="flex justify-between text-white/70 text-sm">
      <span>Ongkos kirim</span>
      <span>{formatRupiah(shippingCost)}</span>
    </div>
  )}
  <div className="flex justify-between text-white font-bold text-base pt-1 border-t border-white/10 mt-1">
    <span>Total</span>
    <span>{formatRupiah(total)}</span>
  </div>
</div>

              <div className="merch-qris-box">
                <p className="text-white/70 text-sm mb-3 text-center">
                  Scan QRIS untuk membayar
                </p>
                <img src={QRIS_IMAGE} alt="QRIS FORMAT ITB" className="merch-qris-img" />
                <p className="text-white/40 text-xs text-center mt-3">
                  Setelah transfer, klik tombol di bawah untuk konfirmasi via
                  WhatsApp
                </p>
              </div>

              <a
                href={
                  canCheckout
                    ? `https://wa.me/${WA_ADMIN_NUMBER}?text=${encodeURIComponent(buildWaMessage())}`
                    : undefined
                }
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!canCheckout) e.preventDefault();
                }}
                className={`merch-checkout-btn ${!canCheckout ? "merch-checkout-btn-disabled" : ""}`}
              >
                Konfirmasi Pesanan via WhatsApp
              </a>

              {!canCheckout && (
                <p className="text-white/40 text-xs text-center">
                  Lengkapi nama {deliveryMethod === "kirim" ? "dan alamat " : ""}dulu ya
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}