"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { YearSelector } from "@/components/planner/year-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { useTranslations } from "next-intl";
import { MenuIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("planner");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Mobile sidebar backdrop */}
      <div
        role="presentation"
        aria-hidden
        className={cn(
          "fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden print:hidden",
          "transition-opacity duration-200",
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Sidebar: drawer on mobile, fixed on desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 transform flex-col border-r border-border bg-card transition-transform duration-200 ease-out print:hidden md:translate-x-0 md:w-56",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Planner navigation"
      >
        <div className="flex h-14 shrink-0 items-center justify-end border-b border-border px-3 md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close menu"
          >
            <XIcon className="size-5" />
          </button>
        </div>
        <Sidebar
          className="flex-1 overflow-hidden"
          onNavigate={() => setMobileMenuOpen(false)}
        />
      </aside>

      {/* Header */}
      <header className="print:hidden fixed top-0 left-0 right-0 z-20 flex h-14 items-center justify-between gap-2 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:left-56 md:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
            aria-label="Open menu"
          >
            <MenuIcon className="size-5" />
          </button>
          <h1 className="truncate text-base font-semibold sm:text-lg">{t("title")}</h1>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <YearSelector />
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="min-h-screen overflow-auto pt-14 md:pl-56">
        <div className="p-4 sm:p-6">{children}</div>
      </main>
    </div>
  );
}
