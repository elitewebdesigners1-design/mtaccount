import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ShieldCheck,
  Building2,
  HandshakeIcon,
  Calculator,
  FileText,
  Search,
  Briefcase,
  Building,
  Users,
  CheckCircle2,
  Circle,
  Loader2,
  ChevronDown,
} from "lucide-react";
import heroTower from "@/assets/hero-skyscraper.jpg";
import teamLead from "@/assets/team-lead.jpg";
import teamLead2 from "@/assets/team-lead-2.jpg";
import officeInterior from "@/assets/office-interior.jpg";
import buildingExterior from "@/assets/building-exterior.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#tracker", label: "Work Tracker" },
  { href: "#contact", label: "Contact" },
];

const SERVICES = [
  {
    icon: Calculator,
    title: "Accounting & Bookkeeping",
    body: "Comprehensive financial record keeping, general ledger, AP/AR management, and monthly reporting aligned to Ethiopian GAAP.",
    tags: ["General Ledger", "AP/AR", "Monthly Reports"],
  },
  {
    icon: FileText,
    title: "Tax Consultancy",
    body: "Expert tax planning, VAT registration and filing, income tax preparation, and strategic advisory to minimize liability with full compliance.",
    tags: ["VAT", "Income Tax", "Tax Planning"],
  },
  {
    icon: Search,
    title: "Pre-Audit",
    body: "Pre-audit preparation and review to ensure statements are accurate and complete. We find issues before external auditors do.",
    tags: ["Pre-Audit Review", "Compliance Check", "Gap Analysis"],
  },
  {
    icon: Briefcase,
    title: "Business Advisory",
    body: "Strategic planning, forecasting, investment analysis, and risk management to help your business thrive in Ethiopia's market.",
    tags: ["Strategy", "Forecasting", "Risk Mgmt"],
  },
  {
    icon: Building,
    title: "Company Formation",
    body: "End-to-end registration including incorporation, trade license, TIN registration, and regulatory setup for new ventures.",
    tags: ["Incorporation", "TIN", "Trade License"],
  },
  {
    icon: Users,
    title: "Payroll & HR",
    body: "Complete payroll processing, pension contribution, employee tax withholding, and HR compliance to keep operations seamless.",
    tags: ["Payroll", "Pension", "Compliance"],
  },
];

const TRACKER_STEPS = [
  {
    icon: CheckCircle2,
    label: "Documents Received",
    date: "Jul 10, 2026",
    body: "All required files uploaded & verified. Financial statements, receipts, and payroll records uploaded via client portal.",
    status: "done",
  },
  {
    icon: CheckCircle2,
    label: "Processing",
    date: "Jul 12, 2026",
    body: "Data entry & analysis underway. Ledger reconciliation completed. VAT calculations verified against ERCA guidelines.",
    status: "done",
  },
  {
    icon: Loader2,
    label: "Under Review",
    date: "Now",
    body: "Senior accountant verification. Lead accountant Misganaw Tefera is currently reviewing the final tax computation before submission.",
    status: "active",
  },
  {
    icon: Circle,
    label: "Completed",
    date: "Pending",
    body: "Submission to ERCA. Final tax return will be submitted electronically once review is complete. Deliverables ready for download.",
    status: "pending",
  },
];

function HomePage() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Nav open={navOpen} setOpen={setNavOpen} scrolled={scrolled} />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Tracker />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------------- Nav ---------------- */
function Nav({
  open,
  setOpen,
  scrolled,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  scrolled: boolean;
}) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8 lg:px-10">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 font-display text-lg text-primary">
            M
          </span>
          <span className="min-w-0 truncate font-display text-lg leading-tight sm:text-xl">
            Misganaw Tefera Mulat
            <span className="hidden text-xs tracking-[0.2em] uppercase text-muted-foreground sm:block">
              Authorized Accounting Firm
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-sm text-muted-foreground">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-primary transition-colors">
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-gold hover:opacity-90 transition"
          >
            Book Consultation <ArrowRight className="h-4 w-4" />
          </a>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden max-h-[calc(100svh-4.5rem)] overflow-y-auto overscroll-contain border-t border-border bg-background/95 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-5 py-4 flex flex-col gap-1 sm:px-8">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-foreground hover:bg-secondary"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden">
      <img
        src={heroTower}
        alt="Modern skyscraper at dusk representing our office tower in Addis Ababa"
        width={1600}
        height={1920}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/40 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-primary backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Authorized · Est. 2026
          </div>
          <p className="mb-4 text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Guji Highland Building · CMC Michael · Addis Ababa
          </p>
          <h1 className="font-display text-[clamp(2.75rem,9vw,7rem)] leading-[1.02]">
            Accounting built on a
            <br />
            <span className="text-gradient-gold italic">foundation of trust.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Premier accounting, tax consultancy, and business advisory services in
            Ethiopia — transforming financial complexity into strategic clarity.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-gold transition hover:opacity-90"
            >
              Book a Consultation <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-7 py-3.5 text-sm text-foreground backdrop-blur-md transition hover:bg-secondary"
            >
              Explore Services
            </a>
          </div>

          <a
            href="https://t.me/mtaccountant"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
          >
            <Send className="h-4 w-4" /> Chat on Telegram @mtaccountant
          </a>
        </div>

        <div className="mt-10 hidden items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground sm:mt-14 sm:flex">
          <ChevronDown className="h-4 w-4 animate-bounce text-primary" />
          Scroll
        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28 lg:py-32">
      <SectionEyebrow>About Us</SectionEyebrow>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <h2 className="max-w-3xl text-4xl leading-[1.1] sm:text-6xl">
          A legacy of <span className="text-gradient-gold italic">financial excellence.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Serving businesses across Ethiopia with integrity, precision, and unwavering
          commitment since our founding.
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-elegant">
              <img
                src={teamLead}
                alt="Misganaw Tefera Mulat — Lead Accountant"
                width={1200}
                height={1504}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-primary">Lead Accountant</p>
                <p className="mt-1 font-display text-2xl">Misganaw Tefera Mulat</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { k: "15+", v: "Years Experience" },
                { k: "500+", v: "Clients Served" },
                { k: "99%", v: "Satisfaction" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-xl border border-border bg-card p-4 text-center"
                >
                  <div className="font-display text-3xl text-gradient-gold">{s.k}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm">
              <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
              <span className="text-muted-foreground">
                Licensed by the Accounting & Auditing Board of Ethiopia
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-3xl sm:text-4xl">Your trusted financial partner.</h3>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Misganaw Tefera Mulat Authorized Accounting Firm is a premier accounting,
              tax consultancy, and business advisory firm based in Addis Ababa, Ethiopia.
              We provide comprehensive financial solutions tailored to the Ethiopian market.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our team of certified professionals combines deep local expertise with
              international best practices to deliver results that drive growth and ensure
              compliance.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  icon: Building2,
                  t: "Government Licensed",
                  d: "Authorized by the Accounting & Auditing Board of Ethiopia (AABE).",
                },
                {
                  icon: MapPin,
                  t: "Strategically Located",
                  d: "CMC Michael, Guji Highland, Addis Ababa — easily accessible.",
                },
                {
                  icon: HandshakeIcon,
                  t: "Client-First Approach",
                  d: "Personalized service with transparent communication at every step.",
                },
              ].map((f) => (
                <div key={f.t} className="flex gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{f.t}</p>
                    <p className="text-sm text-muted-foreground">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-28 lg:py-32 bg-gradient-noir">
      <SectionEyebrow>What We Do</SectionEyebrow>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <h2 className="text-4xl leading-[1.1] sm:text-6xl">
            Comprehensive accounting
            <br />
            <span className="text-gradient-gold italic">services.</span>
          </h2>
          <p className="text-muted-foreground">
            From bookkeeping to strategic advisory, we cover every aspect of your
            financial needs with precision and care.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1 hover:shadow-gold"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/20" />
              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <span className="font-display text-3xl text-muted-foreground/40">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Gallery ---------------- */
function Gallery() {
  const items = [
    { src: buildingExterior, w: 886, h: 1920, title: "Guji Highland Building", sub: "Our office location at CMC Michael" },
    { src: teamLead, w: 1200, h: 1504, title: "Misganaw Tefera Mulat", sub: "Lead Accountant at work" },
    { src: teamLead2, w: 1200, h: 1504, title: "In the Office", sub: "Delivering precision, every day" },
  ];
  return (
    <section id="gallery" className="relative py-20 sm:py-28 lg:py-32">
      <SectionEyebrow>Gallery</SectionEyebrow>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <h2 className="max-w-3xl text-4xl leading-[1.1] sm:text-6xl">
          Our office & <span className="text-gradient-gold italic">team.</span>
        </h2>
        <p className="mt-6 max-w-xl text-muted-foreground">
          A glimpse into our workspace at Guji Highland Building and the team behind
          your financial success.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 sm:mt-14">
          {items.map((it, i) => (
            <figure
              key={it.title}
              className={`group relative overflow-hidden rounded-2xl border border-border ${
                i === 1 ? "md:row-span-2 md:aspect-auto" : ""
              }`}
            >
              <img
                src={it.src}
                alt={it.title}
                width={it.w}
                height={it.h}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  i === 1 ? "h-full min-h-[400px] md:min-h-[560px]" : "aspect-[4/3]"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-primary">
                  {it.title}
                </p>
                <p className="mt-1 font-display text-xl">{it.sub}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Tracker ---------------- */
function Tracker() {
  return (
    <section id="tracker" className="relative py-20 sm:py-28 lg:py-32 bg-gradient-noir">
      <SectionEyebrow>Work Tracker</SectionEyebrow>
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
        <h2 className="text-4xl leading-[1.1] sm:text-6xl">
          Track your work
          <br />
          <span className="text-gradient-gold italic">in real time.</span>
        </h2>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Our transparent task tracking system lets you monitor every stage of your
          financial work with complete clarity.
        </p>

        <div className="mt-14 rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-elegant">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Active Engagement
              </p>
              <p className="mt-1 font-display text-xl sm:text-2xl truncate">
                Q3 2026 Tax Filing — ABC Trading PLC
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              In Progress
            </span>
          </div>

          <ol className="mt-8 space-y-8">
            {TRACKER_STEPS.map((step, i) => (
              <li key={step.label} className="relative flex gap-5">
                {i !== TRACKER_STEPS.length - 1 && (
                  <span className="absolute left-[19px] top-10 h-full w-px bg-border" />
                )}
                <div
                  className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border ${
                    step.status === "done"
                      ? "border-primary/50 bg-primary/20 text-primary"
                      : step.status === "active"
                      ? "border-primary bg-gradient-gold text-primary-foreground shadow-gold"
                      : "border-border bg-secondary text-muted-foreground"
                  }`}
                >
                  <step.icon
                    className={`h-4 w-4 ${step.status === "active" ? "animate-spin" : ""}`}
                  />
                </div>
                <div className="min-w-0 flex-1 pb-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-display text-lg">{step.label}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {step.date}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setSent(true);
    }, 900);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 lg:py-32">
      <SectionEyebrow>Book a Meeting</SectionEyebrow>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <h2 className="max-w-3xl text-4xl leading-[1.1] sm:text-6xl">
          Schedule your <span className="text-gradient-gold italic">consultation.</span>
        </h2>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Book a free initial consultation. Let's discuss how we can help your business grow.
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Info */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-border">
              <img
                src={officeInterior}
                alt="Office boardroom"
                width={1400}
                height={1000}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <h3 className="font-display text-2xl">Let's start a conversation.</h3>
            <div className="space-y-4">
              {[
                { icon: Phone, k: "Phone", v: "+251 964 972 181", href: "tel:+251964972181" },
                { icon: Mail, k: "Email", v: "misgnatefe@gmail.com", href: "mailto:misgnatefe@gmail.com" },
                { icon: MapPin, k: "Office", v: "CMC Michael, Guji Highland, Addis Ababa" },
                { icon: Clock, k: "Business Hours", v: "Mon – Fri · 8:30 AM – 5:00 PM" },
                { icon: Send, k: "Telegram", v: "@mtaccountant", href: "https://t.me/mtaccountant" },
              ].map((c) => (
                <a
                  key={c.k}
                  href={c.href ?? "#"}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition hover:border-primary/50"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                    <c.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {c.k}
                    </p>
                    <p className="truncate">{c.v}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-elegant"
          >
            {sent ? (
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-gold shadow-gold">
                  <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-display text-3xl">Consultation booked.</h3>
                <p className="max-w-md text-muted-foreground">
                  We'll be in touch within one business day to confirm your preferred
                  date and time.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-4 rounded-full border border-border px-6 py-2.5 text-sm hover:bg-secondary"
                >
                  Send another
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First Name" name="first" placeholder="Your first name" />
                  <Field label="Last Name" name="last" placeholder="Your last name" />
                  <Field
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                  <Field label="Phone Number" name="phone" placeholder="+251 9XX XXX XXX" />
                  <Field label="Preferred Date" name="date" type="date" />
                  <SelectField
                    label="Preferred Time"
                    name="time"
                    options={["Morning", "Afternoon", "Evening"]}
                  />
                  <div className="sm:col-span-2">
                    <SelectField
                      label="Service Interest"
                      name="service"
                      options={SERVICES.map((s) => s.title)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      rows={4}
                      placeholder="Tell us about your business needs…"
                      className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary/60"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={pending}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-7 py-4 text-sm font-medium text-primary-foreground shadow-gold transition hover:opacity-90 disabled:opacity-70"
                >
                  {pending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Confirming…
                    </>
                  ) : (
                    <>
                      Confirm Booking <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary/60"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </label>
      <select
        name={name}
        required
        defaultValue=""
        className="w-full appearance-none rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary/60"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="relative border-t border-border bg-ink py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="sm:col-span-2 md:col-span-1" />
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-primary/40 bg-primary/10 font-display text-lg text-primary">
                M
              </span>
              <p className="font-display text-lg">Misganaw Tefera Mulat</p>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              Authorized Accounting Firm providing premier accounting, tax
              consultancy, and business advisory services across Ethiopia. Built on a
              foundation of trust since day one.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Services</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.title}>
                  <a href="#services" className="hover:text-primary transition">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>+251 964 972 181</li>
              <li>misgnatefe@gmail.com</li>
              <li>@mtaccountant · Telegram</li>
              <li>CMC Michael, Guji Highland</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>© 2026 Misganaw Tefera Mulat Authorized Accounting Firm. All rights reserved.</p>
          <p>Licensed by AABE</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Shared ---------------- */
function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto mb-10 max-w-7xl px-5 sm:px-8 lg:px-10">
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary">
        <span className="h-px w-10 bg-primary/50" />
        {children}
      </div>
    </div>
  );
}