export const AVATARS = [
  "/avatars/blue-light.jpg",
  "/avatars/emerald.jpg",
  "/avatars/green-dark.jpg",
  "/avatars/indigo.jpg",
  "/avatars/orange.jpg",
  "/avatars/purple.jpg",
  "/avatars/red.jpg",
  "/avatars/rose.jpg",
  "/avatars/sky.jpg",
];

export function pickAvatar() {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}
