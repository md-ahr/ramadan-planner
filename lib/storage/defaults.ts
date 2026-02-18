import type {
  PlannerData,
  PreRamadanData,
  QuranReadingData,
  QuranMemorizationData,
  DuaListData,
  AdhkarData,
  HabitsData,
  NightPrayerData,
  SunnahRawatibData,
  CharityData,
  ChildrenData,
} from "@/lib/types/planner";
import { PLANNER_VERSION } from "@/lib/types/planner";

const DEFAULT_PRE_RAMADAN: PreRamadanData = {
  repentance: false,
  dua: false,
  tasks: [
    { id: "1", label: "Complete tasks that may distract from worship", done: false },
    { id: "2", label: "Seek knowledge about Ramadan", done: false },
    { id: "3", label: "Read Quran regularly every day", done: false },
  ],
  tasksCompleted: [],
  books: [],
  booksCompleted: [],
  missedFastsDays: 0,
  missedFastsDone: false,
  shaabanFastingDays: 0,
  shaabanFastingDone: false,
  preRamadanQuranPlan: "",
  preRamadanDua: "",
};

const DEFAULT_QURAN_READING: QuranReadingData = {
  juzProgress: Array.from({ length: 30 }, (_, i) => ({
    juz: i + 1,
    completedDate: null,
  })),
  alKahfWeeks: [false, false, false, false, false],
};

const DEFAULT_QURAN_MEMORIZATION: QuranMemorizationData = {
  surahName: "",
  days: Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    ayahRange: "",
    memorized: false,
    tafsirLearned: false,
  })),
};

const DEFAULT_DUA_LIST: DuaListData = {
  duniya: "",
  akhirah: "",
  muslims: "",
  relatives: "",
  friends: "",
  spouse: "",
  parents: "",
  children: "",
  neighbors: "",
};

const DEFAULT_ADHKAR_ITEMS: AdhkarData["items"] = [
  {
    id: "1",
    arabic: "أَصْبَحْنَا عَلَى فِطْرَةِ الإِسْلاَمِ...",
    translation: "We have entered a new day upon the natural religion of Islam...",
    source: "Ahmad, An-Nasa'i, At-Tirmithi",
    weekMemorized: null,
  },
  {
    id: "2",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ: عَدَدَ خَلْقِهِ...",
    translation: "Glory is to Allah, and praise is to Him, by the multitude of His creation...",
    source: "Muslim",
    weekMemorized: null,
  },
  {
    id: "3",
    arabic: "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ...",
    translation: "O Allah, Knower of the unseen and the evident...",
    source: "Sahih At-Tirmithi, Abu Dawud",
    weekMemorized: null,
  },
  {
    id: "4",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا...",
    translation: "O Allah, I ask You for knowledge that is of benefit...",
    source: "Ibn As-Sunni, Ibn Majah",
    weekMemorized: null,
  },
];

const DEFAULT_ADHKAR: AdhkarData = {
  items: DEFAULT_ADHKAR_ITEMS,
};

const DEFAULT_HABITS: HabitsData = {
  build: [],
  giveUp: [],
};

const DEFAULT_NIGHT_PRAYERS: NightPrayerData = {
  days: Array.from({ length: 30 }, () => ({
    fajr: false,
    zuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
    taraweeh: false,
    tahajud: false,
    witr: false,
  })),
  duhaWeeks: [false, false, false, false],
};

const DEFAULT_SUNNAH_RAWATIB: SunnahRawatibData = {
  days: Array.from({ length: 7 }, () => ({ rakaat: 0 })),
};

const DEFAULT_CHARITY: CharityData = {
  weeklyActs: [
    { acts: [] },
    { acts: [] },
    { acts: [] },
    { acts: [] },
  ],
  iftarGatherings: [],
  childrenActs: [],
};

const DEFAULT_CHILDREN: ChildrenData = {
  activities: Array.from({ length: 4 }, (_, i) => ({
    week: i + 1,
    iftarPrep: "",
    quranReading: "",
    tarawih: "",
    hadithSharing: "",
  })),
};

export function createDefaultPlannerData(
  year: number,
  ramadanStart: string,
  ramadanEnd: string
): PlannerData {
  return {
    version: PLANNER_VERSION,
    ramadanYear: year,
    ramadanStart,
    ramadanEnd,
    preRamadan: { ...DEFAULT_PRE_RAMADAN },
    quranReading: JSON.parse(JSON.stringify(DEFAULT_QURAN_READING)),
    quranMemorization: JSON.parse(JSON.stringify(DEFAULT_QURAN_MEMORIZATION)),
    duaList: { ...DEFAULT_DUA_LIST },
    adhkar: JSON.parse(JSON.stringify(DEFAULT_ADHKAR)),
    habits: JSON.parse(JSON.stringify(DEFAULT_HABITS)),
    nightPrayers: JSON.parse(JSON.stringify(DEFAULT_NIGHT_PRAYERS)),
    sunnahRawatib: JSON.parse(JSON.stringify(DEFAULT_SUNNAH_RAWATIB)),
    charity: JSON.parse(JSON.stringify(DEFAULT_CHARITY)),
    children: JSON.parse(JSON.stringify(DEFAULT_CHILDREN)),
  };
}
