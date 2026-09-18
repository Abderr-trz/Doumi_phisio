import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

type Params = { params: Promise<{ id: string }> };

const patchSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

// PATCH /api/appointments/[id] — update status
export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Statut invalide" },
        { status: 400 }
      );
    }

    // Verify the appointment exists
    const existing = await db.appointment.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Rendez-vous introuvable" },
        { status: 404 }
      );
    }

    const updated = await db.appointment.update({
      where: { id },
      data: { status: parsed.data.status },
    });

    return NextResponse.json({ ok: true, id: updated.id, status: updated.status });
  } catch (err) {
    console.error("[appointments PATCH] error:", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// DELETE /api/appointments/[id] — remove appointment
export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const existing = await db.appointment.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Rendez-vous introuvable" },
        { status: 404 }
      );
    }

    await db.appointment.delete({ where: { id } });
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("[appointments DELETE] error:", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
