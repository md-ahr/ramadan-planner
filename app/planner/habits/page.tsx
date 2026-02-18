"use client";

import { usePlannerStore } from "@/lib/stores/planner-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useCallback } from "react";
import { useTranslations } from "next-intl";
import type { PlannerData } from "@/lib/types/planner";

export default function HabitsPage() {
  const { data, update, isLoading, error } = usePlannerStore();
  const t = useTranslations("common");
  const tHabits = useTranslations("habits");

  const handleHabitsUpdate = useCallback(
    (updater: (d: PlannerData["habits"]) => PlannerData["habits"]) => {
      update((d) => ({ ...d, habits: updater(d.habits) }));
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

  const habits = data.habits;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">{tHabits("title")}</h2>
        <p className="text-muted-foreground">{tHabits("description")}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{tHabits("buildTitle")}</CardTitle>
            <CardDescription>{tHabits("buildDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {habits.build.map((h, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  value={h}
                  onChange={(e) => {
                    const next = [...habits.build];
                    next[idx] = e.target.value;
                    handleHabitsUpdate((p) => ({ ...p, build: next }));
                  }}
                  placeholder={tHabits("buildPlaceholder")}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    handleHabitsUpdate((p) => ({
                      ...p,
                      build: p.build.filter((_, i) => i !== idx),
                    }));
                  }}
                  aria-label={t("remove")}
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleHabitsUpdate((p) => ({ ...p, build: [...p.build, ""] }))
              }
            >
              <PlusIcon className="mr-1 size-4" />
              {t("add")}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{tHabits("giveUpTitle")}</CardTitle>
            <CardDescription>{tHabits("giveUpDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {habits.giveUp.map((h, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  value={h}
                  onChange={(e) => {
                    const next = [...habits.giveUp];
                    next[idx] = e.target.value;
                    handleHabitsUpdate((p) => ({ ...p, giveUp: next }));
                  }}
                  placeholder={tHabits("giveUpPlaceholder")}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    handleHabitsUpdate((p) => ({
                      ...p,
                      giveUp: p.giveUp.filter((_, i) => i !== idx),
                    }));
                  }}
                  aria-label={t("remove")}
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleHabitsUpdate((p) => ({ ...p, giveUp: [...p.giveUp, ""] }))
              }
            >
              <PlusIcon className="mr-1 size-4" />
              {t("add")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
