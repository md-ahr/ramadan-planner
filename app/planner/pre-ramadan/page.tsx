"use client";

import { usePlannerStore } from "@/lib/stores/planner-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChecklistCard } from "@/components/planner/checklist-card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useCallback } from "react";
import { useTranslations } from "next-intl";
import type { PlannerData } from "@/lib/types/planner";

export default function PreRamadanPage() {
  const { data, update, isLoading, error } = usePlannerStore();
  const t = useTranslations("common");
  const tPre = useTranslations("preRamadan");

  const handlePreRamadanUpdate = useCallback(
    (updater: (d: PlannerData["preRamadan"]) => PlannerData["preRamadan"]) => {
      update((d) => ({ ...d, preRamadan: updater(d.preRamadan) }));
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

  const pre = data.preRamadan;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">{tPre("title")}</h2>
        <p className="text-muted-foreground">{tPre("description")}</p>
      </div>

      <ChecklistCard
        title={tPre("corePreparations")}
        description={tPre("essentialActions")}
        items={[
          { id: "repentance", label: tPre("repentance"), done: pre.repentance },
          { id: "dua", label: tPre("dua"), done: pre.dua },
          ...pre.tasks.map((t) => ({ id: t.id, label: t.label, done: t.done })),
        ]}
        onToggle={(id, done) => {
          if (id === "repentance") {
            handlePreRamadanUpdate((p) => ({ ...p, repentance: done }));
          } else if (id === "dua") {
            handlePreRamadanUpdate((p) => ({ ...p, dua: done }));
          } else {
            handlePreRamadanUpdate((p) => ({
              ...p,
              tasks: p.tasks.map((t) => (t.id === id ? { ...t, done } : t)),
            }));
          }
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle>{tPre("tasksTitle")}</CardTitle>
          <CardDescription>{tPre("tasksDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pre.tasks.map((task) => (
            <label
              key={task.id}
              className="flex items-center gap-3 rounded-md p-2 hover:bg-muted/50"
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={(e) =>
                  handlePreRamadanUpdate((p) => ({
                    ...p,
                    tasks: p.tasks.map((t) =>
                      t.id === task.id ? { ...t, done: e.target.checked } : t
                    ),
                  }))
                }
                className="size-4 rounded border-input"
              />
              <span className={task.done ? "text-muted-foreground line-through" : ""}>
                {task.label}
              </span>
            </label>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tPre("booksTitle")}</CardTitle>
          <CardDescription>{tPre("booksDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pre.books.map((book, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={pre.booksCompleted[idx] ?? false}
                onChange={(e) => {
                  const completed = [...pre.booksCompleted];
                  completed[idx] = e.target.checked;
                  handlePreRamadanUpdate((p) => ({ ...p, booksCompleted: completed }));
                }}
                className="size-4 rounded border-input"
              />
              <Input
                value={book}
                onChange={(e) => {
                  const books = [...pre.books];
                  books[idx] = e.target.value;
                  handlePreRamadanUpdate((p) => ({ ...p, books }));
                }}
                placeholder={tPre("bookTitle")}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  handlePreRamadanUpdate((p) => ({
                    ...p,
                    books: p.books.filter((_, i) => i !== idx),
                    booksCompleted: p.booksCompleted.filter((_, i) => i !== idx),
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
              handlePreRamadanUpdate((p) => ({
                ...p,
                books: [...p.books, ""],
                booksCompleted: [...p.booksCompleted, false],
              }))
            }
          >
            <PlusIcon className="mr-1 size-4" />
            {tPre("addBook")}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tPre("missedFastsTitle")}</CardTitle>
          <CardDescription>{tPre("missedFastsDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field>
            <FieldLabel htmlFor="missed-fasts">{tPre("missedDays")}</FieldLabel>
            <Input
              id="missed-fasts"
              type="number"
              min={0}
              value={pre.missedFastsDays || ""}
              onChange={(e) =>
                handlePreRamadanUpdate((p) => ({
                  ...p,
                  missedFastsDays: parseInt(e.target.value, 10) || 0,
                }))
              }
            />
          </Field>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={pre.missedFastsDone}
              onChange={(e) =>
                handlePreRamadanUpdate((p) => ({ ...p, missedFastsDone: e.target.checked }))
              }
              className="size-4 rounded border-input"
            />
            <span>{tPre("allMissedDone")}</span>
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tPre("shaabanTitle")}</CardTitle>
          <CardDescription>{tPre("shaabanDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field>
            <FieldLabel htmlFor="shaaban-days">{tPre("shaabanDays")}</FieldLabel>
            <Input
              id="shaaban-days"
              type="number"
              min={0}
              value={pre.shaabanFastingDays || ""}
              onChange={(e) =>
                handlePreRamadanUpdate((p) => ({
                  ...p,
                  shaabanFastingDays: parseInt(e.target.value, 10) || 0,
                }))
              }
            />
          </Field>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={pre.shaabanFastingDone}
              onChange={(e) =>
                handlePreRamadanUpdate((p) => ({ ...p, shaabanFastingDone: e.target.checked }))
              }
              className="size-4 rounded border-input"
            />
            <span>{tPre("shaabanDone")}</span>
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tPre("quranPlanTitle")}</CardTitle>
          <CardDescription>{tPre("quranPlanPlaceholder")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={pre.preRamadanQuranPlan}
            onChange={(e) =>
              handlePreRamadanUpdate((p) => ({ ...p, preRamadanQuranPlan: e.target.value }))
            }
            placeholder={tPre("quranPlanPlaceholder")}
            rows={4}
            className="resize-none"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tPre("duaTitle")}</CardTitle>
          <CardDescription>{tPre("duaPlaceholder")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={pre.preRamadanDua}
            onChange={(e) =>
              handlePreRamadanUpdate((p) => ({ ...p, preRamadanDua: e.target.value }))
            }
            placeholder={tPre("duaPlaceholder")}
            rows={4}
            className="resize-none"
          />
        </CardContent>
      </Card>
    </div>
  );
}
