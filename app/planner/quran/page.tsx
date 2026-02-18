"use client";

import { usePlannerStore } from "@/lib/stores/planner-store";
import { JuzTracker } from "@/components/planner/juz-tracker";
import { AlKahfTracker } from "@/components/planner/al-kahf-tracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCallback } from "react";
import { useTranslations } from "next-intl";
import type { PlannerData } from "@/lib/types/planner";

export default function QuranPage() {
  const { data, update, isLoading, error } = usePlannerStore();
  const t = useTranslations("common");
  const tQuran = useTranslations("quran");

  const handleQuranUpdate = useCallback(
    (updater: (d: PlannerData["quranReading"]) => PlannerData["quranReading"]) => {
      update((d) => ({ ...d, quranReading: updater(d.quranReading) }));
    },
    [update]
  );

  const handleMemorizationUpdate = useCallback(
    (updater: (d: PlannerData["quranMemorization"]) => PlannerData["quranMemorization"]) => {
      update((d) => ({ ...d, quranMemorization: updater(d.quranMemorization) }));
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

  const qr = data.quranReading;
  const qm = data.quranMemorization;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">{tQuran("title")}</h2>
        <p className="text-muted-foreground">{tQuran("description")}</p>
      </div>

      <JuzTracker
        progress={qr.juzProgress}
        onChange={(juzIndex, completedDate) => {
          handleQuranUpdate((p) => {
            const next = [...p.juzProgress];
            next[juzIndex] = { ...next[juzIndex], completedDate };
            return { ...p, juzProgress: next };
          });
        }}
      />

      <AlKahfTracker
        weeks={qr.alKahfWeeks}
        onChange={(weekIndex, checked) => {
          handleQuranUpdate((p) => {
            const next = [...p.alKahfWeeks];
            next[weekIndex] = checked;
            return { ...p, alKahfWeeks: next };
          });
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle>{tQuran("memorizationTitle")}</CardTitle>
          <p className="text-muted-foreground text-sm">{tQuran("memorizationDescription")}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="surah-name" className="mb-1 block text-sm font-medium">
              {tQuran("surahName")}
            </label>
            <Input
              id="surah-name"
              value={qm.surahName}
              onChange={(e) =>
                handleMemorizationUpdate((p) => ({ ...p, surahName: e.target.value }))
              }
              placeholder={tQuran("surahPlaceholder")}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">{t("day")}</th>
                  <th className="py-2 text-left">{tQuran("ayahRange")}</th>
                  <th className="py-2 text-center">{tQuran("memorized")}</th>
                  <th className="py-2 text-center">{tQuran("tafsirLearned")}</th>
                </tr>
              </thead>
              <tbody>
                {qm.days.map((d) => (
                  <tr key={d.day} className="border-b">
                    <td className="py-2">{d.day}</td>
                    <td>
                      <Input
                        value={d.ayahRange}
                        onChange={(e) => {
                          handleMemorizationUpdate((p) => ({
                            ...p,
                            days: p.days.map((x) =>
                              x.day === d.day ? { ...x, ayahRange: e.target.value } : x
                            ),
                          }));
                        }}
                        placeholder={tQuran("ayahPlaceholder")}
                        className="h-8 w-20"
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={d.memorized}
                        onChange={(e) => {
                          handleMemorizationUpdate((p) => ({
                            ...p,
                            days: p.days.map((x) =>
                              x.day === d.day ? { ...x, memorized: e.target.checked } : x
                            ),
                          }));
                        }}
                        aria-label={tQuran("dayMemorizedAria", { day: d.day })}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={d.tafsirLearned}
                        onChange={(e) => {
                          handleMemorizationUpdate((p) => ({
                            ...p,
                            days: p.days.map((x) =>
                              x.day === d.day ? { ...x, tafsirLearned: e.target.checked } : x
                            ),
                          }));
                        }}
                        aria-label={tQuran("dayTafsirAria", { day: d.day })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
