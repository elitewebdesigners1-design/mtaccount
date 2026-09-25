import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/HomePage";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Misganaw Tefera Mulat Accounting | Addis Ababa" },
      { name: "description", content: "Accounting, tax consultancy, pre-audit, advisory and asset valuation services in Addis Ababa." },
      { property: "og:title", content: "Our Services — Misganaw Tefera Mulat Accounting" },
      { property: "og:description", content: "Accounting, tax, pre-audit, advisory and asset valuation services." },
    ],
  }),
  component: () => <HomePage initialSection="services" />,
});
