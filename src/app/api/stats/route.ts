import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/stats?days=14 — aggregate appointment stats for the admin dashboard
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const days = Math.min(Math.max(parseInt(url.searchParams.get("days") || "14", 10) || 14, 1), 90);

    const all = await db.appointment.findMany({
      select: {
        status: true,
        service: true,
        createdAt: true,
      },
    });

    // Total counts by status
    const byStatus = {
      pending: 0,
      confirmed: 0,
      cancelled: 0,
    };
    for (const a of all) {
      if (a.status === "pending") byStatus.pending++;
      else if (a.status === "confirmed") byStatus.confirmed++;
      else if (a.status === "cancelled") byStatus.cancelled++;
    }

    // Appointments per day for the last N days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const perDay: { date: string; label: string; count: number }[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const next = new Date(d);
      next.setDate(d.getDate() + 1);
      const count = all.filter(
        (a) => a.createdAt >= d && a.createdAt < next
      ).length;
      perDay.push({
        date: d.toISOString().split("T")[0],
        label: d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }),
        count,
      });
    }

    // Top services (by count, within the date range)
    const rangeStart = new Date(today);
    rangeStart.setDate(today.getDate() - (days - 1));
    const inRange = all.filter((a) => a.createdAt >= rangeStart);
    const serviceCount: Record<string, number> = {};
    for (const a of inRange) {
      const key = a.service || "Autre";
      serviceCount[key] = (serviceCount[key] || 0) + 1;
    }
    const topServices = Object.entries(serviceCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return NextResponse.json({
      ok: true,
      data: {
        total: all.length,
        rangeTotal: inRange.length,
        byStatus,
        perDay,
        topServices,
        days,
      },
    });
  } catch (err) {
    console.error("[stats] error:", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
