import { z } from "zod";

/** Exact service names accepted by the booking database. */
export const BOOKING_SERVICES = [
  "Accounting & Bookkeeping",
  "Tax Consultancy",
  "Pre-Audit",
  "Business Advisory",
  "Company Formation",
  "Payroll & HR",
  "Asset Valuations",
] as const;

const ADDIS_OFFSET_MIN = 180; // Africa/Addis_Ababa is UTC+3 all year (no DST)
const OPEN_MIN = 8 * 60 + 30;
const CLOSE_MIN = 17 * 60;

export const ALL_SLOTS: string[] = Array.from({ length: (CLOSE_MIN - OPEN_MIN) / 30 + 1 }, (_, i) =>
  toHHMM(OPEN_MIN + i * 30),
);

function toHHMM(m: number) {
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/** Current calendar date (YYYY-MM-DD) and minutes-of-day in Addis Ababa. */
export function addisNow(now: Date = new Date()) {
  const t = new Date(now.getTime() + ADDIS_OFFSET_MIN * 60_000);
  return {
    date: t.toISOString().slice(0, 10),
    minutes: t.getUTCHours() * 60 + t.getUTCMinutes(),
  };
}

export function isWeekday(date: string) {
  const d = new Date(`${date}T00:00:00Z`).getUTCDay();
  return d >= 1 && d <= 5;
}

/** 30-minute choices still in the future for the given Addis date. */
export function availableSlots(date: string, now: Date = new Date()): string[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !isWeekday(date)) return [];
  const n = addisNow(now);
  if (date < n.date) return [];
  if (date > n.date) return ALL_SLOTS;
  return ALL_SLOTS.filter((s) => {
    const [h, m] = s.split(":").map(Number);
    return h * 60 + m > n.minutes;
  });
}

/** Next weekday dates (Addis) that still have at least one slot. */
export function upcomingDates(count = 20, now: Date = new Date()): string[] {
  const out: string[] = [];
  const start = new Date(`${addisNow(now).date}T00:00:00Z`);
  for (let i = 0; out.length < count && i < 60; i++) {
    const d = new Date(start.getTime() + i * 86_400_000).toISOString().slice(0, 10);
    if (availableSlots(d, now).length) out.push(d);
  }
  return out;
}

/** Accepts +251 9/7…, 251 9/7…, 09…, 07… → +2519XXXXXXXX; otherwise null. */
export function normalizeEthiopianPhone(raw: string): string | null {
  const s = raw.replace(/[\s\-().]/g, "");
  const m = s.match(/^(?:\+?251|0)([79]\d{8})$/);
  return m ? `+251${m[1]}` : null;
}

export function bookingSchema(now: Date = new Date()) {
  return z
    .object({
      firstName: z.string().trim().min(1, "Enter your first name").max(100),
      lastName: z.string().trim().min(1, "Enter your last name").max(100),
      email: z.string().trim().email("Enter a valid email address").max(255),
      phone: z.string().transform((v, ctx) => {
        const p = normalizeEthiopianPhone(v);
        if (!p) {
          ctx.addIssue({
            code: "custom",
            message: "Use an Ethiopian number like +251 9…, 09… or 07…",
          });
          return z.NEVER;
        }
        return p;
      }),
      date: z.string().refine((d) => /^\d{4}-\d{2}-\d{2}$/.test(d), "Choose a date"),
      time: z.string().min(1, "Choose a time"),
      service: z.enum(BOOKING_SERVICES, { errorMap: () => ({ message: "Choose a service" }) }),
      notes: z.string().trim().max(2000, "Notes must be under 2000 characters"),
    })
    .superRefine((v, ctx) => {
      if (!isWeekday(v.date))
        ctx.addIssue({ code: "custom", path: ["date"], message: "Choose a weekday (Mon–Fri)" });
      else if (!availableSlots(v.date, now).includes(v.time))
        ctx.addIssue({
          code: "custom",
          path: ["time"],
          message: "Choose a future time between 08:30 and 17:00",
        });
    });
}

export function formatAddisDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}
