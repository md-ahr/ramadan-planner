import Dexie, { type Table } from "dexie";
import type { PlannerData } from "@/lib/types/planner";

export class PlannerDatabase extends Dexie {
  planners!: Table<PlannerData, number>;

  constructor() {
    super("ramadan-planner");
    this.version(1).stores({
      planners: "ramadanYear",
    });
  }
}

export const db = new PlannerDatabase();
