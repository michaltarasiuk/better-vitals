export const AVATARS = [
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
];

export function getRandomAvatar() {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}
