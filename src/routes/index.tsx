import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Misganaw Tefera Mulat — Authorized Accounting Firm | Addis Ababa" },
      { name: "description", content: "Accounting, tax, audit, valuation and advisory services in Addis Ababa, licensed by AABE." },
      { property: "og:title", content: "Misganaw Tefera Mulat — Authorized Accounting Firm" },
      { property: "og:description", content: "Accounting built on a foundation of trust in Addis Ababa." },
    ],
  }),
  component: () => <HomePage />,
});
