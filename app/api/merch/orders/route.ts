import { NextResponse } from "next/server";
import { inArray } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { merchOrder, merchProduct, type OrderItem } from "@/db/schema";
import { shippingZones } from "@/lib/merch-config";

const MAX_ITEMS = 20;
const MAX_QTY_PER_ITEM = 20;
const MAX_ADDRESS_LENGTH = 500;

// Limiter best-effort: state-nya in-memory, jadi di Vercel (serverless) hanya
// berlaku per instance. Cukup menahan spam dari satu akun, bukan anti-DDoS.
const orderAttempts = new Map<string, number[]>();
const ATTEMPT_WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function isRateLimited(userId: string) {
  const now = Date.now();
  const recent = (orderAttempts.get(userId) ?? []).filter(
    (t) => now - t < ATTEMPT_WINDOW_MS
  );
  recent.push(now);
  orderAttempts.set(userId, recent);
  return recent.length > MAX_ATTEMPTS;
}

type RequestedItem = {
  productId?: unknown;
  size?: unknown;
  variant?: unknown;
  qty?: unknown;
};

function parseRequestedItems(raw: unknown): RequestedItem[] | null {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_ITEMS) {
    return null;
  }
  const items: RequestedItem[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") return null;
    const { productId, size, variant, qty } = entry as RequestedItem;

    const id = Number(productId);
    if (!Number.isInteger(id) || id <= 0) return null;
    if (typeof qty !== "number" || !Number.isInteger(qty)) return null;
    if (qty <= 0 || qty > MAX_QTY_PER_ITEM) return null;
    if (size !== undefined && typeof size !== "string") return null;
    if (variant !== undefined && typeof variant !== "string") return null;

    items.push({ productId: id, size, variant, qty });
  }
  return items;
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (isRateLimited(session.user.id)) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan. Coba lagi nanti." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const requested = parseRequestedItems(body?.items);

    if (!requested) {
      return NextResponse.json({ error: "Invalid order" }, { status: 400 });
    }

    const ids = [...new Set(requested.map((i) => i.productId as number))];
    const products = await db
      .select({
        id: merchProduct.id,
        name: merchProduct.name,
        price: merchProduct.price,
        sizes: merchProduct.sizes,
        variants: merchProduct.variants,
      })
      .from(merchProduct)
      .where(inArray(merchProduct.id, ids));

    const byId = new Map(products.map((p) => [p.id, p]));
    if (byId.size !== ids.length) {
      return NextResponse.json({ error: "Unknown product" }, { status: 400 });
    }

    // Harga, nama, subtotal, ongkir, dan total selalu dihitung ulang di server.
    // Nilai yang dikirim client hanya dipakai sebagai id/kuantitas/opsi.
    const items: OrderItem[] = requested.map((item) => {
      const product = byId.get(item.productId as number)!;
      const size =
        product.sizes && typeof item.size === "string" && product.sizes.includes(item.size)
          ? item.size
          : undefined;
      const variant =
        product.variants &&
        typeof item.variant === "string" &&
        product.variants.includes(item.variant)
          ? item.variant
          : undefined;

      return {
        productId: String(product.id),
        name: product.name,
        price: product.price,
        size,
        variant,
        qty: item.qty as number,
      };
    });

    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    const deliveryMethod: "ambil" | "kirim" =
      body.deliveryMethod === "kirim" ? "kirim" : "ambil";

    let shippingCost = 0;
    let shippingZone: string | null = null;
    let address: string | null = null;

    if (deliveryMethod === "kirim") {
      const zone = shippingZones.find((z) => z.id === body.shippingZoneId);
      if (!zone) {
        return NextResponse.json({ error: "Invalid shipping zone" }, { status: 400 });
      }
      if (typeof body.address !== "string" || body.address.trim() === "") {
        return NextResponse.json({ error: "Address required" }, { status: 400 });
      }
      shippingCost = zone.price;
      shippingZone = zone.label;
      address = body.address.trim().slice(0, MAX_ADDRESS_LENGTH);
    }

    const total = subtotal + shippingCost;

    const inserted = await db
      .insert(merchOrder)
      .values({
        userId: session.user.id,
        userName: session.user.name,
        userEmail: session.user.email,
        items,
        subtotal,
        shippingCost,
        total,
        deliveryMethod,
        address,
        shippingZone,
      })
      .returning({ id: merchOrder.id });

    orderAttempts.delete(session.user.id);

    return NextResponse.json({ id: inserted[0].id, total });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
