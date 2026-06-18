import { AVATARS } from "./consts";

export function pickAvatar() {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}
