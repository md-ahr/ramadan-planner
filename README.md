# Ramadan Planner

A modern, responsive web app for planning and tracking your Ramadan activities. Based on the Ilm Institute planner format, it helps you organize Quran reading, prayers, du'a, charity, and more—with support for English and Bengali.

## Features

- **Pre-Ramadan** — Checklist for core preparations, tasks, books, missed fasts, and Sha'ban fasting
- **Quran** — Juz tracking (30 days), Surah Al-Kahf on Fridays, and memorization plan
- **Prayers** — Daily prayers (Fajr–Isha), night prayers (Tarawih, Tahajud, Witr), Duha, and Sunnah Rawatib
- **Dua & Adhkar** — Categorized dua list and morning/evening adhkar
- **Habits** — Build good habits and break bad ones
- **Charity** — Weekly acts, iftar gathering planner, and acts with children
- **Children** — Activities by week (iftar prep, Quran, Tarawih, hadith sharing)

## Tech Stack

| Category | Technologies |
|----------|--------------|
| Framework | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui |
| i18n | next-intl (EN, Bengali) |
| State | Zustand |
| Storage | IndexedDB (Dexie) |
| Dates | Aladhan API for Ramadan dates |

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm / yarn

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Data is stored locally in the browser (IndexedDB).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production (uses webpack) |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── page.tsx            # Home / landing
│   └── planner/            # Planner routes
├── components/
│   ├── layout/             # Sidebar, etc.
│   ├── planner/            # Planner-specific components
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── api/                # Aladhan API client
│   ├── storage/            # Dexie DB, defaults
│   ├── stores/              # Zustand store
│   └── utils/               # Helpers, progress, ramadan dates
├── messages/               # i18n JSON (en, bn)
├── i18n/                   # next-intl config
└── actions/                # Server actions (locale)
```

## Deployment

Build and deploy like any Next.js app. Example for Vercel:

```bash
pnpm build
```

Configure environment variables if needed. Ramadan dates fall back to cached values when the Aladhan API is unavailable.

## PWA

The app includes a web manifest for install as a Progressive Web App (PWA) on mobile and desktop.

## License

Private project.
