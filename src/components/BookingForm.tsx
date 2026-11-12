import { useMemo, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, AlertCircle, Phone, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  BOOKING_SERVICES,
  availableSlots,
  bookingSchema,
  formatAddisDate,
  upcomingDates,
} from "@/lib/booking";

type Values = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  notes: string;
};
const EMPTY: Values = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  service: "",
  notes: "",
};

const inputCls =
  "w-full min-w-0 rounded-xl border border-input bg-background/50 px-4 py-3.5 text-base outline-none placeholder:text-muted-foreground/60 focus:border-primary/60 aria-[invalid=true]:border-destructive sm:py-3 sm:text-sm";

export function BookingForm() {
  const [v, setV] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState("");
  // Same id is reused on retry so a request is never stored twice.
  const requestId = useRef<string>("");
  const inFlight = useRef(false);

  const dates = useMemo(() => upcomingDates(20), []);
  const slots = useMemo(() => (v.date ? availableSlots(v.date) : []), [v.date]);

  const set =
    (k: keyof Values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const val = e.target.value;
      setV((p) => ({ ...p, [k]: val, ...(k === "date" ? { time: "" } : {}) }));
      setErrors((p) => ({ ...p, [k]: undefined }));
      if (k !== "notes") requestId.current = ""; // details changed → new request
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inFlight.current) return;
    const parsed = bookingSchema().safeParse(v);
    if (!parsed.success) {
      const fe: typeof errors = {};
      for (const i of parsed.error.issues) fe[i.path[0] as keyof Values] ??= i.message;
      setErrors(fe);
      document.getElementById(`bk-${Object.keys(fe)[0]}`)?.focus();
      return;
    }
    inFlight.current = true;
    setStatus("sending");
    setServerError("");
    if (!requestId.current) requestId.current = crypto.randomUUID();
    const d = parsed.data;
    try {
      const { data, error } = await supabase.rpc("submit_booking_request", {
        p_id: requestId.current,
        p_first_name: d.firstName,
        p_last_name: d.lastName,
        p_email: d.email,
        p_phone: d.phone,
        p_preferred_date: d.date,
        p_preferred_time: d.time,
        p_service: d.service,
        p_notes: d.notes,
      });
      if (error || !data) throw new Error(error?.message ?? "No reference returned");
      setReference(data);
      setStatus("done");
    } catch (err) {
      console.error("Booking request failed", err);
      const msg = err instanceof Error ? err.message : "";
      setServerError(
        /future weekday/i.test(msg)
          ? "That time has just passed. Please choose another time."
          : "We couldn't send your request. Please check your connection and try again, or call/Telegram us.",
      );
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  };

  if (status === "done") {
    return (
      <div
        className="flex flex-col items-center gap-4 py-12 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-gold shadow-gold">
          <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
        </div>
        <h3 className="font-display text-3xl">Request received — pending confirmation</h3>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Your reference</p>
        <p className="break-all rounded-lg border border-primary/40 bg-primary/5 px-4 py-2 font-mono text-sm text-primary">
          {reference}
        </p>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Your requested time ({formatAddisDate(v.date)}, {v.time} Addis Ababa time) is not
          confirmed yet. The firm will contact you by phone or email to confirm or suggest another
          time.
        </p>
        <button
          type="button"
          onClick={() => {
            setV(EMPTY);
            setStatus("idle");
            setReference("");
            requestId.current = "";
          }}
          className="mt-2 rounded-full border border-border px-6 py-2.5 text-sm hover:bg-secondary"
        >
          Send another request
        </button>
      </div>
    );
  }

  const err = (k: keyof Values) =>
    errors[k] ? (
      <p id={`bk-${k}-err`} className="mt-1.5 text-xs text-destructive">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Values) => ({
    id: `bk-${k}`,
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `bk-${k}-err` : undefined,
  });
  const Label = ({ k, children }: { k: keyof Values; children: React.ReactNode }) => (
    <label
      htmlFor={`bk-${k}`}
      className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
    >
      {children}
    </label>
  );
  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={sending}>
      <fieldset disabled={sending} className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label k="firstName">First Name</Label>
          <input
            {...aria("firstName")}
            autoComplete="given-name"
            maxLength={100}
            value={v.firstName}
            onChange={set("firstName")}
            placeholder="Your first name"
            className={inputCls}
          />
          {err("firstName")}
        </div>
        <div>
          <Label k="lastName">Last Name</Label>
          <input
            {...aria("lastName")}
            autoComplete="family-name"
            maxLength={100}
            value={v.lastName}
            onChange={set("lastName")}
            placeholder="Your last name"
            className={inputCls}
          />
          {err("lastName")}
        </div>
        <div>
          <Label k="email">Email Address</Label>
          <input
            {...aria("email")}
            type="email"
            autoComplete="email"
            maxLength={255}
            value={v.email}
            onChange={set("email")}
            placeholder="you@example.com"
            className={inputCls}
          />
          {err("email")}
        </div>
        <div>
          <Label k="phone">Phone Number</Label>
          <input
            {...aria("phone")}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            value={v.phone}
            onChange={set("phone")}
            placeholder="+251 9XX XXX XXX or 09…"
            className={inputCls}
          />
          {err("phone")}
        </div>
        <div>
          <Label k="date">Preferred Date (Mon–Fri)</Label>
          <select
            {...aria("date")}
            value={v.date}
            onChange={set("date")}
            className={`${inputCls} appearance-none`}
          >
            <option value="" disabled>
              Select a weekday…
            </option>
            {dates.map((d) => (
              <option key={d} value={d}>
                {formatAddisDate(d)}
              </option>
            ))}
          </select>
          {err("date")}
        </div>
        <div>
          <Label k="time">Preferred Time (Addis Ababa)</Label>
          <select
            {...aria("time")}
            value={v.time}
            onChange={set("time")}
            disabled={!v.date}
            className={`${inputCls} appearance-none disabled:opacity-60`}
          >
            <option value="" disabled>
              {v.date ? "Select a time…" : "Choose a date first"}
            </option>
            {slots.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {err("time")}
        </div>
        <div className="sm:col-span-2">
          <Label k="service">Service Interest</Label>
          <select
            {...aria("service")}
            value={v.service}
            onChange={set("service")}
            className={`${inputCls} appearance-none`}
          >
            <option value="" disabled>
              Select…
            </option>
            {BOOKING_SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {err("service")}
        </div>
        <div className="sm:col-span-2">
          <Label k="notes">Additional Notes (optional)</Label>
          <textarea
            {...aria("notes")}
            rows={4}
            maxLength={2000}
            value={v.notes}
            onChange={set("notes")}
            placeholder="Tell us about your business needs…"
            className={inputCls}
          />
          {err("notes")}
        </div>
      </fieldset>

      {status === "error" && (
        <div
          role="alert"
          className="mt-5 flex gap-3 rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
          <div className="min-w-0">
            <p>{serverError}</p>
            <p className="mt-2 flex flex-wrap gap-4 text-muted-foreground">
              <a
                href="tel:+251964972181"
                className="inline-flex items-center gap-1.5 hover:text-primary"
              >
                <Phone className="h-3.5 w-3.5" /> +251 964 972 181
              </a>
              <a
                href="https://t.me/mtaccountant"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-primary"
              >
                <Send className="h-3.5 w-3.5" /> @mtaccountant
              </a>
            </p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-7 py-4 text-sm font-medium text-primary-foreground shadow-gold transition hover:opacity-90 disabled:opacity-70"
      >
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending request…
          </>
        ) : status === "error" ? (
          <>
            Try again <ArrowRight className="h-4 w-4" />
          </>
        ) : (
          <>
            Request Consultation <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
        Requests are reviewed by the firm during office hours (Mon–Fri, 08:30–17:00). A request is
        not a confirmed appointment.
      </p>
    </form>
  );
}
