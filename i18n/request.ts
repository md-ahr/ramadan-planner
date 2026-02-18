import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, type Locale } from "./config";

const LOCALE_COOKIE = "locale";

export default getRequestConfig(async ({ requestLocale }) => {
  const store = await cookies();
  const cookieLocale = store.get(LOCALE_COOKIE)?.value;
  const locale: Locale =
    cookieLocale === "bn" || cookieLocale === "en" ? cookieLocale : defaultLocale;

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
