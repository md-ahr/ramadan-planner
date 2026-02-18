import type { PlannerData } from "@/lib/types/planner";

export function computeProgress(data: PlannerData): {
  overall: number;
  preRamadan: number;
  quran: number;
  prayers: number;
  dua: number;
  habits: number;
  charity: number;
  children: number;
} {
  const preItems = [
    data.preRamadan.repentance,
    data.preRamadan.dua,
    ...data.preRamadan.tasks.map((t) => t.done),
    data.preRamadan.missedFastsDone,
    data.preRamadan.shaabanFastingDone,
  ].filter(Boolean);
  const preTotal = 2 + data.preRamadan.tasks.length + 2;
  const preRamadan = preTotal > 0 ? (preItems.length / preTotal) * 100 : 0;

  const juzDone = data.quranReading.juzProgress.filter((j) => j.completedDate).length;
  const alKahfDone = data.quranReading.alKahfWeeks.filter(Boolean).length;
  const quran = ((juzDone / 30) * 80 + (alKahfDone / 5) * 20);

  const dailyPrayerCount = data.nightPrayers.days.reduce(
    (acc, d) =>
      acc +
      [d.fajr, d.zuhr, d.asr, d.maghrib, d.isha].filter(Boolean).length,
    0
  );
  const nightPrayerDays = data.nightPrayers.days.filter(
    (d) => d.taraweeh || d.tahajud || d.witr
  ).length;
  const duhaWeeks = data.nightPrayers.duhaWeeks.filter(Boolean).length;
  const prayers =
    (dailyPrayerCount / 150) * 40 + (nightPrayerDays / 30) * 40 + (duhaWeeks / 4) * 20;

  const duaHasContent = Object.values(data.duaList).some((v) => v.trim().length > 0);
  const dua = duaHasContent ? 50 : 0;
  const adhkarMemorized = data.adhkar.items.filter((a) => a.weekMemorized != null).length;
  const duaTotal = dua + (adhkarMemorized / 4) * 50;

  const habitsTotal =
    data.habits.build.filter(Boolean).length + data.habits.giveUp.filter(Boolean).length;
  const habits = habitsTotal > 0 ? Math.min(100, habitsTotal * 25) : 0;

  const charityActs = data.charity.weeklyActs.reduce(
    (acc, w) => acc + w.acts.filter(Boolean).length,
    0
  );
  const charityGatherings = data.charity.iftarGatherings.filter((g) => g.date || g.menu).length;
  const charity = Math.min(100, charityActs * 5 + charityGatherings * 20);

  const childrenActs = data.children.activities.filter(
    (a) =>
      a.iftarPrep || a.quranReading || a.tarawih || a.hadithSharing
  ).length;
  const children = (childrenActs / 4) * 100;

  const overall =
    (preRamadan + quran + prayers + duaTotal + habits + charity + children) / 7;

  return {
    overall: Math.round(overall),
    preRamadan: Math.round(preRamadan),
    quran: Math.round(quran),
    prayers: Math.round(prayers),
    dua: Math.round(duaTotal),
    habits: Math.round(habits),
    charity: Math.round(charity),
    children: Math.round(children),
  };
}
