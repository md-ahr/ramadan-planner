import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("home");
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <div className="absolute right-4 top-4 flex items-center gap-1">
        <LocaleSwitcher />
        <ThemeToggle />
      </div>
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground max-w-md">{t("description")}</p>
      </div>
      <Link href="/planner">
        <Button size="lg">{t("openPlanner")}</Button>
      </Link>
    </div>
  );
}
