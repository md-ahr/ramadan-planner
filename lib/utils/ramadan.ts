const RAMADAN_DATES_FALLBACK: Record<number, { start: string; end: string; hijriYear: number }> = {
  2025: { start: "2025-02-28", end: "2025-03-29", hijriYear: 1446 },
  2026: { start: "2026-02-18", end: "2026-03-19", hijriYear: 1447 },
  2027: { start: "2027-02-08", end: "2027-03-09", hijriYear: 1448 },
  2028: { start: "2028-01-28", end: "2028-02-26", hijriYear: 1449 },
  2029: { start: "2029-01-16", end: "2029-02-14", hijriYear: 1450 },
  2030: { start: "2030-01-06", end: "2030-02-04", hijriYear: 1451 },
};

export function getRamadanYears(): number[] {
  const currentYear = new Date().getFullYear();
  return [currentYear, currentYear + 1, currentYear - 1]
    .sort((a, b) => a - b)
    .filter((y, i, arr) => arr.indexOf(y) === i);
}

export function getFallbackRamadanDates(gregorianYear: number): {
  start: string;
  end: string;
  hijriYear: number;
} | null {
  return RAMADAN_DATES_FALLBACK[gregorianYear] ?? null;
}

export function getDayOfRamadan(date: string, ramadanStart: string): number | null {
  const start = new Date(ramadanStart);
  const d = new Date(date);
  if (d < start) return null;
  const diffTime = d.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays >= 30) return null;
  return diffDays + 1;
}
