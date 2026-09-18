import { NextResponse } from "next/server";

// Generate the next N available slots for the cabinet, starting tomorrow.
// In a real app this would consult a bookings database; here we generate
// deterministic-looking slots based on the cabinet opening hours.

type DayName = "Lundi" | "Mardi" | "Mercredi" | "Jeudi" | "Vendredi" | "Samedi" | "Dimanche";

const HOURS: Record<DayName, { open: string; close: string } | null> = {
  Lundi: { open: "08:30", close: "19:00" },
  Mardi: { open: "08:30", close: "19:00" },
  Mercredi: { open: "08:30", close: "19:00" },
  Jeudi: { open: "08:30", close: "19:00" },
  Vendredi: { open: "08:30", close: "12:00" },
  Samedi: { open: "09:00", close: "14:00" },
  Dimanche: null,
};

const DAY_NAMES_FR: DayName[] = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

function slotsForDate(date: Date): { date: Date; time: string }[] {
  const dayName = DAY_NAMES_FR[date.getDay()];
  const hours = HOURS[dayName];
  if (!hours) return [];

  const [openH, openM] = hours.open.split(":").map(Number);
  const [closeH, closeM] = hours.close.split(":").map(Number);
  const openMin = openH * 60 + openM;
  const closeMin = closeH * 60 + closeM;

  const slots: { date: Date; time: string }[] = [];
  // Skip lunch break 12:30–14:00
  for (let m = openMin; m + 45 <= closeMin; m += 60) {
    if (m >= 12 * 60 + 30 && m < 14 * 60) continue; // lunch
    const h = Math.floor(m / 60);
    const min = m % 60;
    const time = `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
    // Randomly mark ~70% of slots as available for realism
    const seed = date.getDate() * 100 + m;
    const isAvailable = (seed * 9301 + 49297) % 233280 / 233280 < 0.7;
    if (isAvailable) {
      slots.push({ date: new Date(date), time });
    }
  }
  return slots;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const count = Math.min(parseInt(url.searchParams.get("count") || "3", 10) || 3, 10);

    const slots: { date: string; time: string; dayLabel: string; dateLabel: string }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= 30 && slots.length < count; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const daySlots = slotsForDate(date);
      for (const s of daySlots) {
        if (slots.length >= count) break;
        slots.push({
          date: s.date.toISOString().split("T")[0],
          time: s.time,
          dayLabel: DAY_NAMES_FR[s.date.getDay()],
          dateLabel: s.date.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
          }),
        });
      }
    }

    return NextResponse.json({
      ok: true,
      data: slots,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[availability] error:", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
