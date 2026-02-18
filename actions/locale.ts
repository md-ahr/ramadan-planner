"use server";

import { cookies } from "next/headers";
import type { Locale } from "@/i18n/config";

const LOCALE_COOKIE = "locale";
const MAX_AGE = 60 * 60 * 24 * 365;

export async function setLocale(locale: Locale) {
  const store = await cookies();
  store.set(LOCALE_COOKIE, locale, {
    maxAge: MAX_AGE,
    path: "/",
    sameSite: "lax",
  });
}
