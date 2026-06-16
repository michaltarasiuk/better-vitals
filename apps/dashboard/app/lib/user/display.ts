export function getTimeOfDayGreeting(date = new Date()) {
  const hour = date.getHours();

  let greeting: string;
  if (hour >= 5 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }
  return greeting;
}

export function getAvatarFallback([first = ""]: string) {
  return first.toUpperCase();
}

export function formatUserRole([first = "", ...rest]: string) {
  return first.toUpperCase() + rest.join("").toLowerCase();
}
