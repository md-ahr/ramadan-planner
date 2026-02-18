"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { YearSelector } from "@/components/planner/year-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { useTranslations } from "next-intl";

export default function PlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("planner");
  return (
    <div className="min-h-screen">
      <Sidebar className="print:hidden" />
      <header className="print:hidden fixed top-0 left-56 right-0 z-10 flex h-14 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <h1 className="text-lg font-semibold">{t("title")}</h1>
        <div className="flex items-center gap-1">
          <YearSelector />
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </header>
      <main className="min-h-screen pl-56 pt-14 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
