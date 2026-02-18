"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import {
  BookOpenIcon,
  MoonIcon,
  HeartIcon,
  TargetIcon,
  GiftIcon,
  UsersIcon,
  LayoutDashboardIcon,
} from "lucide-react";

const navItems = [
  { href: "/planner", key: "dashboard" as const, icon: LayoutDashboardIcon },
  { href: "/planner/pre-ramadan", key: "preRamadan" as const, icon: TargetIcon },
  { href: "/planner/quran", key: "quran" as const, icon: BookOpenIcon },
  { href: "/planner/prayers", key: "prayers" as const, icon: MoonIcon },
  { href: "/planner/dua", key: "dua" as const, icon: HeartIcon },
  { href: "/planner/habits", key: "habits" as const, icon: TargetIcon },
  { href: "/planner/charity", key: "charity" as const, icon: GiftIcon },
  { href: "/planner/children", key: "children" as const, icon: UsersIcon },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-56 flex-col border-r border-border bg-card print:hidden",
        className
      )}
      aria-label="Planner navigation"
    >
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              {t(item.key)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
