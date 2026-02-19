"use client";

import { usePlannerStore } from "@/lib/stores/planner-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PrayerLog } from "@/components/planner/prayer-log";
import { useCallback } from "react";
import { useTranslations } from "next-intl";
import type { PlannerData } from "@/lib/types/planner";

export default function PrayersPage() {
  const { data, update, isLoading, error } = usePlannerStore();
  const t = useTranslations("common");
  const tPrayers = useTranslations("prayers");

  const handlePrayersUpdate = useCallback(
    (updater: (d: PlannerData["nightPrayers"]) => PlannerData["nightPrayers"]) => {
      update((d) => ({ ...d, nightPrayers: updater(d.nightPrayers) }));
    },
    [update]
  );

  const handleSunnahUpdate = useCallback(
    (updater: (d: PlannerData["sunnahRawatib"]) => PlannerData["sunnahRawatib"]) => {
      update((d) => ({ ...d, sunnahRawatib: updater(d.sunnahRawatib) }));
    },
    [update]
  );

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
        <div className="text-muted-foreground">{t("loading")}</div>
      </div>
    );
  }

  const np = data.nightPrayers;
  const sr = data.sunnahRawatib;
  const weekdayKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold sm:text-2xl">{tPrayers("title")}</h2>
        <p className="text-muted-foreground">{tPrayers("description")}</p>
      </div>

      <PrayerLog
        days={np.days}
        dailyTitle={tPrayers("dailyTitle")}
        dailyDescription={tPrayers("dailyDescription")}
        nightTitle={tPrayers("nightTitle")}
        nightDescription={tPrayers("nightDescription")}
        onChange={(dayIndex, prayer, value) => {
          handlePrayersUpdate((p) => {
            const next = [...p.days];
            next[dayIndex] = { ...next[dayIndex], [prayer]: value };
            return { ...p, days: next };
          });
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle>{tPrayers("duhaTitle")}</CardTitle>
          <CardDescription>{tPrayers("duhaDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {np.duhaWeeks.map((done, i) => (
              <label
                key={i}
                className="flex cursor-pointer items-center gap-2 rounded border border-input px-3 py-2 has-[:checked]:border-primary has-[:checked]:bg-primary/10"
              >
                <input
                  type="checkbox"
                  checked={done}
                  onChange={(e) => {
                    const next = [...np.duhaWeeks];
                    next[i] = e.target.checked;
                    handlePrayersUpdate((p) => ({ ...p, duhaWeeks: next }));
                  }}
                  className="size-4 rounded border-input"
                  aria-label={`${t("week")} ${i + 1} Duha`}
                />
                <span className="text-sm">{t("week")} {i + 1}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tPrayers("sunnahTitle")}</CardTitle>
          <CardDescription>{tPrayers("sunnahDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-7">
            {weekdayKeys.map((key, i) => (
              <div key={key} className="space-y-1">
                <label className="text-sm font-medium">{tPrayers(key)}</label>
                <input
                  type="number"
                  min={0}
                  max={12}
                  value={sr.days[i]?.rakaat ?? 0}
                  onChange={(e) => {
                    const next = [...sr.days];
                    next[i] = { rakaat: parseInt(e.target.value, 10) || 0 };
                    handleSunnahUpdate((p) => ({ ...p, days: next }));
                  }}
                  className="w-full rounded border border-input px-2 py-1 text-sm"
                  aria-label={`${tPrayers(key)} rakaat`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tPrayers("lastTenTitle")}</CardTitle>
          <CardDescription>{tPrayers("lastTenDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">{tPrayers("lastTenDua")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
