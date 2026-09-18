import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("E-mail invalide"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "E-mail invalide" },
        { status: 400 }
      );
    }

    try {
      const entry = await db.newsletter.create({
        data: { email: parsed.data.email },
      });
      return NextResponse.json({ ok: true, id: entry.id }, { status: 201 });
    } catch {
      // Email déjà inscrit — on répond ok sans doublon
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }
  } catch (err) {
    console.error("[newsletter] error:", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
