export function getTodayKey(): string {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

export function isToday(key: string | null | undefined): boolean {
  if (!key) return false;
  return key === getTodayKey();
}

export function formatHijri(date: Date): string {
  try {
    const formatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formatter.format(date);
  } catch (error) {
    console.warn("Hijri date formatting not supported", error);
    return date.toLocaleDateString("ar", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
}

export function formatGregorian(date: Date): string {
  return date.toLocaleDateString("ar", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
