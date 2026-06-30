export function getAvatarFallback([first = ""]: string) {
  return first.toUpperCase();
}

export function pickAvatar() {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}

const AVATARS = [
  "/avatars/black.jpg",
  "/avatars/blue-light.jpg",
  "/avatars/emerald.jpg",
  "/avatars/green-dark.jpg",
  "/avatars/green.jpg",
  "/avatars/indigo.jpg",
  "/avatars/orange.jpg",
  "/avatars/purple.jpg",
  "/avatars/red.jpg",
  "/avatars/rose.jpg",
  "/avatars/sky.jpg",
  "/avatars/white.jpg",
];
