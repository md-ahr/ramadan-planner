"use client";

import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePlannerStore } from "@/lib/stores/planner-store";
import { getRamadanYears } from "@/lib/utils/ramadan";
import { useTranslations } from "next-intl";

export function YearSelector() {
  const { year, setYear, load } = usePlannerStore();
  const years = getRamadanYears();
  const t = useTranslations("common");
  const tPlanner = useTranslations("planner");

  useEffect(() => {
    load(year);
  }, [year, load]);

  return (
    <Select
      value={String(year)}
      onValueChange={(v) => setYear(Number(v))}
    >
      <SelectTrigger
        id="ramadan-year"
        className="min-w-[100px] w-full max-w-[140px]"
        aria-label={tPlanner("selectRamadanYear")}
      >
        <SelectValue placeholder={t("year")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {years.map((y) => (
            <SelectItem key={y} value={String(y)}>
              {tPlanner("ramadanYearLabel", { year: y })}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
