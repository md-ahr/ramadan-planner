import { getFallbackRamadanDates } from "@/lib/utils/ramadan";
import type { RamadanDates } from "@/lib/types/planner";

const ALADHAN_BASE = "https://api.aladhan.com/v1";
const DATES_CACHE_KEY = "ramadan-dates";

function gregorianToApproxHijriYear(gregorianYear: number): number {
  return Math.floor((gregorianYear - 622) * (33 / 32));
}

async function fetchRamadanFromApi(
  gregorianYear: number
): Promise<{ start: string; end: string; hijriYear: number } | null> {
  const hijriYear = gregorianToApproxHijriYear(gregorianYear);
  const url = `${ALADHAN_BASE}/hToGCalendar/9/${hijriYear}`;

  const res = await fetch(url);
  if (!res.ok) return null;

  const data = await res.json();
  const calendar = data?.data;
  if (!Array.isArray(calendar) || calendar.length === 0) return null;

  const firstDay = calendar[0];
  const lastDay = calendar[calendar.length - 1];

  const startGregorian = firstDay?.gregorian;
  const endGregorian = lastDay?.gregorian;

  if (!startGregorian || !endGregorian) return null;

  const pad = (n: number | string) => String(n).padStart(2, "0");
  const start = `${startGregorian.year}-${pad(startGregorian.month?.number ?? 1)}-${pad(startGregorian.day)}`;
  const end = `${endGregorian.year}-${pad(endGregorian.month?.number ?? 1)}-${pad(endGregorian.day)}`;

  return { start, end, hijriYear };
}

export async function getRamadanDates(
  gregorianYear: number
): Promise<RamadanDates> {
  if (typeof window !== "undefined") {
    const cached = localStorage.getItem(`${DATES_CACHE_KEY}-${gregorianYear}`);
    if (cached) {
      try {
        return JSON.parse(cached) as RamadanDates;
      } catch {
        // invalid cache
      }
    }
  }

  const fromApi = await fetchRamadanFromApi(gregorianYear);
  const fallback = getFallbackRamadanDates(gregorianYear);

  const result: RamadanDates = fromApi ?? fallback ?? {
    start: `${gregorianYear}-03-01`,
    end: `${gregorianYear}-03-30`,
    hijriYear: gregorianToApproxHijriYear(gregorianYear),
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(`${DATES_CACHE_KEY}-${gregorianYear}`, JSON.stringify(result));
  }

  return result;
}
