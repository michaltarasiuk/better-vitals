import { isDefined } from "@lite-app/shared/is-defined";

const dayPeriodFormatter = new Intl.DateTimeFormat("en", {
  dayPeriod: "long",
});

export function getTimeOfDayGreeting(date = new Date()) {
  const dayPeriod = dayPeriodFormatter
    .formatToParts(date)
    .find((part) => part.type === "dayPeriod");
  if (!isDefined(dayPeriod)) {
    throw new Error("Missing day period in formatted date");
  }
  switch (dayPeriod.value) {
    case "midnight":
    case "in the morning": {
      return "Good morning";
    }
    case "noon":
    case "in the afternoon": {
      return "Good afternoon";
    }
    case "in the evening":
    case "at night": {
      return "Good evening";
    }
    default: {
      throw new Error(`Unknown day period: ${dayPeriod.value}`);
    }
  }
}

export function getAvatarFallback([first = ""]: string) {
  return first.toUpperCase();
}

export function formatUserRole([first = "", ...rest]: string) {
  return first.toUpperCase() + rest.join("").toLowerCase();
}
