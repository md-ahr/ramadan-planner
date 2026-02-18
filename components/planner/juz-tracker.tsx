"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { JuzProgress } from "@/lib/types/planner";

interface JuzTrackerProps {
  progress: JuzProgress[];
  onChange: (juzIndex: number, completedDate: string | null) => void;
}

export function JuzTracker({ progress, onChange }: JuzTrackerProps) {
  const t = useTranslations("quran");
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("readingJourney")}</CardTitle>
        <CardDescription>{t("juzDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
          {progress.map((j, i) => (
            <div
              key={j.juz}
              className={cn(
                "flex flex-col gap-1 rounded-lg border p-2",
                j.completedDate
                  ? "border-primary/50 bg-primary/5"
                  : "border-border"
              )}
            >
              <span className="text-sm font-medium">Juz {j.juz}</span>
              <Input
                type="date"
                value={j.completedDate ?? ""}
                onChange={(e) =>
                  onChange(i, e.target.value || null)
                }
                className="h-8 text-xs"
                aria-label={t("juzCompletedAria", { n: j.juz })}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
