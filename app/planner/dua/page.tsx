"use client";

import { usePlannerStore } from "@/lib/stores/planner-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useCallback } from "react";
import { useTranslations } from "next-intl";
import type { PlannerData } from "@/lib/types/planner";

const DUA_KEYS = [
  { key: "duniya" as const, tKey: "forDuniya" },
  { key: "akhirah" as const, tKey: "forAkhirah" },
  { key: "muslims" as const, tKey: "forMuslims" },
  { key: "relatives" as const, tKey: "forRelatives" },
  { key: "friends" as const, tKey: "forFriends" },
  { key: "spouse" as const, tKey: "forSpouse" },
  { key: "parents" as const, tKey: "forParents" },
  { key: "children" as const, tKey: "forChildren" },
  { key: "neighbors" as const, tKey: "forNeighbors" },
] as const;

export default function DuaPage() {
  const { data, update, isLoading, error } = usePlannerStore();
  const t = useTranslations("common");
  const tDua = useTranslations("dua");

  const handleDuaUpdate = useCallback(
    (key: (typeof DUA_KEYS)[number]["key"], value: string) => {
      update((d) => ({
        ...d,
        duaList: { ...d.duaList, [key]: value },
      }));
    },
    [update]
  );

  const handleAdhkarUpdate = useCallback(
    (updater: (d: PlannerData["adhkar"]) => PlannerData["adhkar"]) => {
      update((d) => ({ ...d, adhkar: updater(d.adhkar) }));
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

  const duaList = data.duaList;
  const adhkar = data.adhkar;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold sm:text-2xl">{tDua("title")}</h2>
        <p className="text-muted-foreground">{tDua("description")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tDua("listTitle")}</CardTitle>
          <CardDescription>{tDua("listDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {DUA_KEYS.map(({ key, tKey }) => (
            <div key={key}>
              <label htmlFor={`dua-${key}`} className="mb-1 block text-sm font-medium">
                {tDua(tKey)}
              </label>
              <Textarea
                id={`dua-${key}`}
                value={duaList[key] ?? ""}
                onChange={(e) => handleDuaUpdate(key, e.target.value)}
                placeholder={tDua("duaPlaceholder")}
                rows={3}
                className="resize-none"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tDua("adhkarTitle")}</CardTitle>
          <CardDescription>{tDua("adhkarDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {adhkar.items.map((item, idx) => (
            <div
              key={item.id}
              className="rounded-lg border border-border p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{t("week")} {idx + 1}</span>
                <select
                  value={item.weekMemorized ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleAdhkarUpdate((p) => ({
                      ...p,
                      items: p.items.map((x, i) =>
                        i === idx
                          ? { ...x, weekMemorized: val ? parseInt(val, 10) : null }
                          : x
                      ),
                    }));
                  }}
                  className="rounded border border-input px-2 py-1 text-sm"
                  aria-label={tDua("weekMemorized", { n: idx + 1 })}
                >
                  <option value="">{t("notYet")}</option>
                  <option value="1">{tDua("weekMemorized", { n: 1 })}</option>
                  <option value="2">{tDua("weekMemorized", { n: 2 })}</option>
                  <option value="3">{tDua("weekMemorized", { n: 3 })}</option>
                  <option value="4">{tDua("weekMemorized", { n: 4 })}</option>
                </select>
              </div>
              <p className="text-lg leading-relaxed" dir="rtl" style={{ fontFamily: "system-ui, 'Segoe UI', sans-serif" }}>
                {item.arabic}
              </p>
              <p className="text-muted-foreground text-sm">{item.translation}</p>
              <p className="text-muted-foreground text-xs">({item.source})</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
