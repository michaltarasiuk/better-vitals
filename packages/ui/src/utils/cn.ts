import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import type { StyleRenderProps } from "react-aria-components";
import { composeRenderProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function composeCn<T>(
  className: StyleRenderProps<T>["className"],
  ...defaults: ClassValue[]
) {
  return composeRenderProps(className, (value) => cn(...defaults, value));
}
