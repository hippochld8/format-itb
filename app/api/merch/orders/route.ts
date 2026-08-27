import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { merchOrder, type OrderItem } from "@/db/schema";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const items: OrderItem[] = body?.items;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Invalid order" }, { status: 400 });
    }

    for (const item of items) {
      if (
        !item?.productId ||
        typeof item?.name !== "string" ||
        typeof item?.price !== "number" ||
        typeof item?.qty !== "number" ||
        item.qty <= 0
      ) {
        return NextResponse.json({ error: "Invalid order item" }, { status: 400 });
      }
    }

    const subtotal = Number(body.subtotal);
    const shippingCost = Number(body.shippingCost ?? 0);
    const total = Number(body.total);
    const deliveryMethod: "ambil" | "kirim" =
      body.deliveryMethod === "kirim" ? "kirim" : "ambil";

    if (
      Number.isNaN(subtotal) ||
      Number.isNaN(shippingCost) ||
      Number.isNaN(total)
    ) {
      return NextResponse.json({ error: "Invalid total" }, { status: 400 });
    }

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
        address:
          deliveryMethod === "kirim" && typeof body.address === "string"
            ? body.address
            : null,
        shippingZone:
          deliveryMethod === "kirim" && typeof body.shippingZone === "string"
            ? body.shippingZone
            : null,
      })
      .returning({ id: merchOrder.id });

    return NextResponse.json({ id: inserted[0].id });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
