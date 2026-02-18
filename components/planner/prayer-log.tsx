"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import type { DayPrayerLog } from "@/lib/types/planner";

interface PrayerLogProps {
  days: DayPrayerLog[];
  onChange: (dayIndex: number, prayer: keyof DayPrayerLog, value: boolean) => void;
  dailyTitle: string;
  dailyDescription: string;
  nightTitle: string;
  nightDescription: string;
}

function usePrayerLabels() {
  const t = useTranslations("prayers");
  return {
    DAILY_PRAYERS: [
      { key: "fajr" as const, label: t("fajr") },
      { key: "zuhr" as const, label: t("zuhr") },
      { key: "asr" as const, label: t("asr") },
      { key: "maghrib" as const, label: t("maghrib") },
      { key: "isha" as const, label: t("isha") },
    ] as const,
    NIGHT_PRAYERS: [
      { key: "taraweeh" as const, label: t("taraweeh") },
      { key: "tahajud" as const, label: t("tahajud") },
      { key: "witr" as const, label: t("witr") },
    ] as const,
  };
}

function PrayerTable({
  days,
  prayers,
  onChange,
  title,
  description,
  dayLabel,
}: {
  days: DayPrayerLog[];
  prayers: readonly { key: keyof DayPrayerLog; label: string }[];
  onChange: PrayerLogProps["onChange"];
  title: string;
  description: string;
  dayLabel: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="sticky left-0 z-10 bg-card py-2 text-left">{dayLabel}</th>
              {prayers.map((p) => (
                <th key={p.key} className="py-2 text-center">
                  {p.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, i) => (
              <tr key={i} className="border-b">
                <td className="sticky left-0 z-10 bg-background py-1.5 font-medium">{i + 1}</td>
                {prayers.map((p) => (
                  <td key={p.key} className="text-center">
                    <input
                      type="checkbox"
                      checked={day[p.key] ?? false}
                      onChange={(e) => onChange(i, p.key, e.target.checked)}
                      className="size-4 rounded border-input"
                      aria-label={`Day ${i + 1} ${p.label}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export function PrayerLog({
  days,
  onChange,
  dailyTitle,
  dailyDescription,
  nightTitle,
  nightDescription,
}: PrayerLogProps) {
  const { DAILY_PRAYERS, NIGHT_PRAYERS } = usePrayerLabels();
  const t = useTranslations("common");
  return (
    <>
      <PrayerTable
        days={days}
        prayers={DAILY_PRAYERS}
        onChange={onChange}
        title={dailyTitle}
        description={dailyDescription}
        dayLabel={t("day")}
      />
      <PrayerTable
        days={days}
        prayers={NIGHT_PRAYERS}
        onChange={onChange}
        title={nightTitle}
        description={nightDescription}
        dayLabel={t("day")}
      />
    </>
  );
}
