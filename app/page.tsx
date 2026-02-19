import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { getTranslations } from "next-intl/server";
import {
  BookOpenIcon,
  MoonIcon,
  HeartIcon,
  GiftIcon,
  ArrowRightIcon,
} from "lucide-react";

const FEATURES = [
  { key: "featureQuran" as const, icon: BookOpenIcon },
  { key: "featurePrayers" as const, icon: MoonIcon },
  { key: "featureDua" as const, icon: HeartIcon },
  { key: "featureCharity" as const, icon: GiftIcon },
] as const;

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* Subtle gradient background */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-background to-background" />
        <div className="absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full bg-primary/2 blur-3xl" />
      </div>

      {/* Top bar */}
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-end gap-1 p-4 sm:p-6">
        <LocaleSwitcher />
        <ThemeToggle />
      </header>

      {/* Main content */}
      <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto w-full max-w-2xl space-y-10 text-center">
          {/* Hero */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {t("title")}
            </h1>
            <p className="text-lg font-medium text-primary sm:text-xl">
              {t("subtitle")}
            </p>
            <p className="mx-auto max-w-lg text-muted-foreground text-base sm:text-lg">
              {t("description")}
            </p>
          </div>

          {/* Feature pills */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {FEATURES.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="group flex items-center gap-3 rounded-xl border border-border/80 bg-card/50 px-4 py-3 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-card hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon className="size-4 sm:size-5" aria-hidden />
                </div>
                <span className="text-left text-sm font-medium text-foreground sm:text-base">
                  {t(key)}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-4">
            <Button
              asChild
              size="lg"
              className="group h-12 gap-2 px-8 text-base shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
            >
              <Link href="/planner">
                {t("openPlanner")}
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
