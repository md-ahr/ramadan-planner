"use client";

import { create } from "zustand";
import type { PlannerData } from "@/lib/types/planner";
import { loadPlanner, savePlanner } from "@/lib/storage/planner-storage";

interface PlannerState {
  data: PlannerData | null;
  year: number;
  isLoading: boolean;
  error: string | null;
  setYear: (year: number) => void;
  load: (year: number) => Promise<void>;
  update: (updater: (d: PlannerData) => PlannerData) => Promise<void>;
}

export const usePlannerStore = create<PlannerState>((set, get) => ({
  data: null,
  year: new Date().getFullYear(),
  isLoading: false,
  error: null,
  setYear: (year) => set({ year }),
  load: async (year) => {
    set({ isLoading: true, error: null });
    try {
      const data = await loadPlanner(year);
      set({ data, year, isLoading: false, error: null });
    } catch (e) {
      set({
        isLoading: false,
        error: e instanceof Error ? e.message : "Failed to load planner",
      });
    }
  },
  update: async (updater) => {
    const { data } = get();
    if (!data) return;
    const next = updater(data);
    try {
      await savePlanner(next);
      set({ data: next });
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : "Failed to save",
      });
    }
  },
}));
