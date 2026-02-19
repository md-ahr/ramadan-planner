"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

interface AlKahfTrackerProps {
  weeks: boolean[];
  onChange: (weekIndex: number, checked: boolean) => void;
}

export function AlKahfTracker({ weeks, onChange }: AlKahfTrackerProps) {
  const t = useTranslations("quran");
  const tCommon = useTranslations("common");
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("alKahfTitle")}</CardTitle>
        <CardDescription>{t("alKahfDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {weeks.map((done, i) => (
            <label
              key={i}
              className="flex cursor-pointer items-center gap-2 rounded border border-input px-3 py-2 has-[:checked]:border-primary has-[:checked]:bg-primary/10"
            >
              <input
                type="checkbox"
                checked={done}
                onChange={(e) => onChange(i, e.target.checked)}
                className="size-4 rounded border-input"
                aria-label={`${tCommon("week")} ${i + 1}`}
              />
              <span className="text-sm">{tCommon("week")} {i + 1}</span>
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
