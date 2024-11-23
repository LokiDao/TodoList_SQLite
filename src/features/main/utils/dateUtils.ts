// utils/dateUtils.ts
export const formatDueDate = (date: Date | null, locale: string = "en-US") => {
  if (!date) return "";

  return new Date(date).toLocaleString(locale, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
