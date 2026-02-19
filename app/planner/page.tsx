"use client";

import { usePlannerStore } from "@/lib/stores/planner-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { computeProgress } from "@/lib/utils/progress";
import { getFallbackRamadanDates } from "@/lib/utils/ramadan";
import { useTranslations } from "next-intl";
import {
  BookOpenIcon,
  MoonIcon,
  HeartIcon,
  TargetIcon,
  GiftIcon,
  UsersIcon,
  ChevronRightIcon,
} from "lucide-react";

const sections = [
  { href: "/planner/pre-ramadan", key: "preRamadan" as const, icon: TargetIcon },
  { href: "/planner/quran", key: "quran" as const, icon: BookOpenIcon },
  { href: "/planner/prayers", key: "prayers" as const, icon: MoonIcon },
  { href: "/planner/dua", key: "dua" as const, icon: HeartIcon },
  { href: "/planner/habits", key: "habits" as const, icon: TargetIcon },
  { href: "/planner/charity", key: "charity" as const, icon: GiftIcon },
  { href: "/planner/children", key: "children" as const, icon: UsersIcon },
];

export default function PlannerDashboardPage() {
  const { data, isLoading, error } = usePlannerStore();
  const t = useTranslations("common");
  const tPlanner = useTranslations("planner");
  const tNav = useTranslations("nav");

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        {error}
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">{t("loadingPlanner")}</div>
      </div>
    );
  }

  const progress = computeProgress(data);

  const startDate = new Date(data.ramadanStart).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const endDate = new Date(data.ramadanEnd).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fallback = getFallbackRamadanDates(data.ramadanYear);
  const ah = fallback ? String(fallback.hijriYear).slice(-2) : String(data.ramadanYear - 622).slice(-2);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold sm:text-2xl">{tNav("dashboard")}</h2>
        <p className="text-muted-foreground">
          {tPlanner("welcome", { year: data.ramadanYear })}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("progress")}</CardTitle>
          <CardDescription>{t("overallCompletion")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-2xl font-bold">{progress.overall}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progress.overall}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tPlanner("ramadanDates", { year: data.ramadanYear })}</CardTitle>
          <CardDescription>{tPlanner("ramadanRange", { ah })}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          <p>
            <strong>{t("start")}:</strong> {startDate}
          </p>
          <p>
            <strong>{t("end")}:</strong> {endDate}
          </p>
        </CardContent>
      </Card>

      <div>
        <h3 className="mb-4 text-base font-medium sm:text-lg">{t("quickNavigation")}</h3>
        <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {sections.map(({ href, key, icon: Icon }) => (
            <Link key={href} href={href}>
              <Card className="transition-colors hover:bg-muted/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base">{tNav(key)}</CardTitle>
                  <Icon className="size-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${progress[key]}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{progress[key]}%</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-auto p-0">
                    {t("open")} <ChevronRightIcon className="ml-1 size-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
