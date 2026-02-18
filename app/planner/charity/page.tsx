"use client";

import { usePlannerStore } from "@/lib/stores/planner-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useCallback } from "react";
import { useTranslations } from "next-intl";
import type { PlannerData } from "@/lib/types/planner";

export default function CharityPage() {
  const { data, update, isLoading, error } = usePlannerStore();
  const t = useTranslations("common");
  const tCharity = useTranslations("charity");

  const handleCharityUpdate = useCallback(
    (updater: (d: PlannerData["charity"]) => PlannerData["charity"]) => {
      update((d) => ({ ...d, charity: updater(d.charity) }));
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

  const charity = data.charity;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">{tCharity("title")}</h2>
        <p className="text-muted-foreground">{tCharity("description")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tCharity("weeklyTitle")}</CardTitle>
          <CardDescription>{tCharity("weeklyDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {charity.weeklyActs.map((week, wi) => (
            <div key={wi} className="space-y-2">
              <label className="text-sm font-medium">{t("week")} {wi + 1}</label>
              <Textarea
                value={week.acts.join("\n")}
                onChange={(e) => {
                  const acts = e.target.value.split("\n").filter(Boolean);
                  handleCharityUpdate((p) => {
                    const next = [...p.weeklyActs];
                    next[wi] = { acts };
                    return { ...p, weeklyActs: next };
                  });
                }}
                placeholder={tCharity("actsPlaceholder")}
                rows={3}
                className="resize-none"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tCharity("iftarTitle")}</CardTitle>
          <CardDescription>{tCharity("iftarDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {charity.iftarGatherings.map((gathering, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-border p-4 space-y-3"
            >
              <div className="flex justify-between">
                <span className="font-medium">{tCharity("gathering")} {idx + 1}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    handleCharityUpdate((p) => ({
                      ...p,
                      iftarGatherings: p.iftarGatherings.filter((_, i) => i !== idx),
                    }));
                  }}
                  aria-label={tCharity("removeGathering")}
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">{tCharity("date")}</label>
                  <Input
                    type="date"
                    value={gathering.date}
                    onChange={(e) => {
                      handleCharityUpdate((p) => ({
                        ...p,
                        iftarGatherings: p.iftarGatherings.map((g, i) =>
                          i === idx ? { ...g, date: e.target.value } : g
                        ),
                      }));
                    }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">{tCharity("menu")}</label>
                  <Input
                    value={gathering.menu}
                    onChange={(e) => {
                      handleCharityUpdate((p) => ({
                        ...p,
                        iftarGatherings: p.iftarGatherings.map((g, i) =>
                          i === idx ? { ...g, menu: e.target.value } : g
                        ),
                      }));
                    }}
                    placeholder={tCharity("menu")}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">{tCharity("guests")}</label>
                <Input
                  value={gathering.guests}
                  onChange={(e) => {
                    handleCharityUpdate((p) => ({
                      ...p,
                      iftarGatherings: p.iftarGatherings.map((g, i) =>
                        i === idx ? { ...g, guests: e.target.value } : g
                      ),
                    }));
                  }}
                  placeholder={tCharity("guests")}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">
                  {tCharity("activitiesBefore")}
                </label>
                <Input
                  value={gathering.activitiesBeforeIftar}
                  onChange={(e) => {
                    handleCharityUpdate((p) => ({
                      ...p,
                      iftarGatherings: p.iftarGatherings.map((g, i) =>
                        i === idx ? { ...g, activitiesBeforeIftar: e.target.value } : g
                      ),
                    }));
                  }}
                  placeholder="e.g. Quran recitation"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">
                  {tCharity("tarawihLocation")}
                </label>
                <Input
                  value={gathering.tarawihLocation}
                  onChange={(e) => {
                    handleCharityUpdate((p) => ({
                      ...p,
                      iftarGatherings: p.iftarGatherings.map((g, i) =>
                        i === idx ? { ...g, tarawihLocation: e.target.value } : g
                      ),
                    }));
                  }}
                  placeholder={tCharity("tarawihPlaceholder")}
                />
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleCharityUpdate((p) => ({
                ...p,
                iftarGatherings: [
                  ...p.iftarGatherings,
                  {
                    date: "",
                    menu: "",
                    guests: "",
                    activitiesBeforeIftar: "",
                    tarawihLocation: "",
                  },
                ],
              }))
            }
          >
            <PlusIcon className="mr-1 size-4" />
            {tCharity("addIftar")}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tCharity("childrenTitle")}</CardTitle>
          <CardDescription>{tCharity("childrenDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={charity.childrenActs.join("\n")}
            onChange={(e) => {
              const acts = e.target.value.split("\n").filter(Boolean);
              handleCharityUpdate((p) => ({ ...p, childrenActs: acts }));
            }}
            placeholder={tCharity("actsPlaceholder")}
            rows={4}
            className="resize-none"
          />
        </CardContent>
      </Card>
    </div>
  );
}
