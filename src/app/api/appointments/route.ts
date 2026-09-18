import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const appointmentSchema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z.string().email("E-mail invalide"),
  phone: z.string().min(8, "Téléphone invalide"),
  service: z.string().min(2, "Service requis"),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = appointmentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Données invalides",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const appointment = await db.appointment.create({
      data: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        service: parsed.data.service,
        preferredDate: parsed.data.preferredDate ?? null,
        preferredTime: parsed.data.preferredTime ?? null,
        message: parsed.data.message ?? null,
        status: "pending",
      },
    });

    return NextResponse.json({ ok: true, id: appointment.id }, { status: 201 });
  } catch (err) {
    console.error("[appointments] error:", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur, réessayez plus tard." },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const full = url.searchParams.get("full") === "1";

    const list = await db.appointment.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      ...(full
        ? {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
              service: true,
              preferredDate: true,
              preferredTime: true,
              message: true,
              status: true,
              createdAt: true,
            },
          }
        : {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              service: true,
              status: true,
              preferredDate: true,
              preferredTime: true,
              createdAt: true,
            },
          }),
    });
    return NextResponse.json({ ok: true, data: list });
  } catch (err) {
    console.error("[appointments list] error:", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
