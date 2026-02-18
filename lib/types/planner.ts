export const PLANNER_VERSION = 1 as const;

export interface RamadanDates {
  start: string;
  end: string;
  hijriYear: number;
}

export interface PreRamadanTask {
  id: string;
  label: string;
  done: boolean;
}

export interface PreRamadanData {
  repentance: boolean;
  dua: boolean;
  tasks: PreRamadanTask[];
  tasksCompleted: string[];
  books: string[];
  booksCompleted: boolean[];
  missedFastsDays: number;
  missedFastsDone: boolean;
  shaabanFastingDays: number;
  shaabanFastingDone: boolean;
  preRamadanQuranPlan: string;
  preRamadanDua: string;
}

export interface JuzProgress {
  juz: number;
  completedDate: string | null;
}

export interface QuranReadingData {
  juzProgress: JuzProgress[];
  alKahfWeeks: boolean[];
}

export interface MemorizationDay {
  day: number;
  ayahRange: string;
  memorized: boolean;
  tafsirLearned: boolean;
}

export interface QuranMemorizationData {
  surahName: string;
  days: MemorizationDay[];
}

export interface DuaListData {
  duniya: string;
  akhirah: string;
  muslims: string;
  relatives: string;
  friends: string;
  spouse: string;
  parents: string;
  children: string;
  neighbors: string;
}

export interface AdhkarItem {
  id: string;
  arabic: string;
  translation: string;
  source: string;
  weekMemorized: number | null;
}

export interface AdhkarData {
  items: AdhkarItem[];
}

export interface HabitsData {
  build: string[];
  giveUp: string[];
}

export interface DayPrayerLog {
  fajr: boolean;
  zuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
  taraweeh: boolean;
  tahajud: boolean;
  witr: boolean;
}

export interface NightPrayerData {
  days: DayPrayerLog[];
  duhaWeeks: boolean[];
}

export interface SunnahRawatibDay {
  rakaat: number;
}

export interface SunnahRawatibData {
  days: SunnahRawatibDay[];
}

export interface CharityWeekData {
  acts: string[];
}

export interface IftarGathering {
  date: string;
  menu: string;
  guests: string;
  activitiesBeforeIftar: string;
  tarawihLocation: string;
}

export interface CharityData {
  weeklyActs: CharityWeekData[];
  iftarGatherings: IftarGathering[];
  childrenActs: string[];
}

export interface ChildrenActivity {
  week: number;
  iftarPrep: string;
  quranReading: string;
  tarawih: string;
  hadithSharing: string;
}

export interface ChildrenData {
  activities: ChildrenActivity[];
}

export interface PlannerData {
  version: typeof PLANNER_VERSION;
  ramadanYear: number;
  ramadanStart: string;
  ramadanEnd: string;
  preRamadan: PreRamadanData;
  quranReading: QuranReadingData;
  quranMemorization: QuranMemorizationData;
  duaList: DuaListData;
  adhkar: AdhkarData;
  habits: HabitsData;
  nightPrayers: NightPrayerData;
  sunnahRawatib: SunnahRawatibData;
  charity: CharityData;
  children: ChildrenData;
}
