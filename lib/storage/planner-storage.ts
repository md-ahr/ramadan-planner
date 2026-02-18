"use client";

import { db } from "./planner-db";
import { createDefaultPlannerData } from "./defaults";
import type { PlannerData } from "@/lib/types/planner";
import { getRamadanDates } from "@/lib/api/aladhan";

export async function loadPlanner(year: number): Promise<PlannerData> {
  const existing = await db.planners.get(year);
  if (existing) return existing;

  const dates = await getRamadanDates(year);
  const defaultData = createDefaultPlannerData(
    year,
    dates.start,
    dates.end
  );
  await db.planners.put(defaultData);
  return defaultData;
}

export async function savePlanner(data: PlannerData): Promise<void> {
  await db.planners.put(data);
}

export async function getPlanner(year: number): Promise<PlannerData | undefined> {
  return db.planners.get(year);
}
