import { describe, it, expect } from "vitest";
import { availableSlots, normalizeEthiopianPhone, bookingSchema, ALL_SLOTS } from "./booking";

// 2026-11-12 is a Thursday. 07:00 UTC = 10:00 in Addis Ababa.
const now = new Date("2026-11-12T07:00:00Z");

describe("booking rules", () => {
  it("offers 30-minute slots from 08:30 to 17:00", () => {
    expect(ALL_SLOTS[0]).toBe("08:30");
    expect(ALL_SLOTS.at(-1)).toBe("17:00");
    expect(ALL_SLOTS).toHaveLength(18);
  });
  it("excludes past times today in Addis Ababa", () => {
    expect(availableSlots("2026-11-12", now)[0]).toBe("10:30");
  });
  it("blocks weekends and past dates", () => {
    expect(availableSlots("2026-11-14", now)).toEqual([]);
    expect(availableSlots("2026-11-11", now)).toEqual([]);
  });
  it("normalizes Ethiopian phone formats", () => {
    expect(normalizeEthiopianPhone("+251 911 234 567")).toBe("+251911234567");
    expect(normalizeEthiopianPhone("0911234567")).toBe("+251911234567");
    expect(normalizeEthiopianPhone("0711234567")).toBe("+251711234567");
    expect(normalizeEthiopianPhone("12345")).toBeNull();
  });
  it("rejects unknown services", () => {
    const r = bookingSchema(now).safeParse({
      firstName: "A",
      lastName: "B",
      email: "a@b.co",
      phone: "0911234567",
      date: "2026-11-13",
      time: "09:00",
      service: "Cooking",
      notes: "",
    });
    expect(r.success).toBe(false);
  });
});
