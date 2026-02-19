"use client";

import { usePlannerStore } from "@/lib/stores/planner-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useCallback } from "react";
import { useTranslations } from "next-intl";
import type { PlannerData } from "@/lib/types/planner";

export default function ChildrenPage() {
  const { data, update, isLoading, error } = usePlannerStore();
  const t = useTranslations("common");
  const tChildren = useTranslations("children");

  const handleChildrenUpdate = useCallback(
    (updater: (d: PlannerData["children"]) => PlannerData["children"]) => {
      update((d) => ({ ...d, children: updater(d.children) }));
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

  const children = data.children;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold sm:text-2xl">{tChildren("title")}</h2>
        <p className="text-muted-foreground">{tChildren("description")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tChildren("activitiesTitle")}</CardTitle>
          <CardDescription>{tChildren("activitiesDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {children.activities.map((act) => (
            <div
              key={act.week}
              className="rounded-lg border border-border p-4 space-y-3"
            >
              <h4 className="font-medium">{t("week")} {act.week}</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">
                    {tChildren("iftarPrep")}
                  </label>
                  <Textarea
                    value={act.iftarPrep}
                    onChange={(e) => {
                      handleChildrenUpdate((p) => ({
                        ...p,
                        activities: p.activities.map((a) =>
                          a.week === act.week ? { ...a, iftarPrep: e.target.value } : a
                        ),
                      }));
                    }}
                    placeholder={tChildren("simpleTasksPlaceholder")}
                    rows={2}
                    className="resize-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">
                    {tChildren("quranReading")}
                  </label>
                  <Textarea
                    value={act.quranReading}
                    onChange={(e) => {
                      handleChildrenUpdate((p) => ({
                        ...p,
                        activities: p.activities.map((a) =>
                          a.week === act.week ? { ...a, quranReading: e.target.value } : a
                        ),
                      }));
                    }}
                    placeholder={tChildren("readingPlanPlaceholder")}
                    rows={2}
                    className="resize-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">
                    {tChildren("tarawih")}
                  </label>
                  <Textarea
                    value={act.tarawih}
                    onChange={(e) => {
                      handleChildrenUpdate((p) => ({
                        ...p,
                        activities: p.activities.map((a) =>
                          a.week === act.week ? { ...a, tarawih: e.target.value } : a
                        ),
                      }));
                    }}
                    placeholder={tChildren("masjidPlaceholder")}
                    rows={2}
                    className="resize-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">
                    {tChildren("hadithSharing")}
                  </label>
                  <Textarea
                    value={act.hadithSharing}
                    onChange={(e) => {
                      handleChildrenUpdate((p) => ({
                        ...p,
                        activities: p.activities.map((a) =>
                          a.week === act.week ? { ...a, hadithSharing: e.target.value } : a
                        ),
                      }));
                    }}
                    placeholder={tChildren("hadithPlaceholder")}
                    rows={2}
                    className="resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
