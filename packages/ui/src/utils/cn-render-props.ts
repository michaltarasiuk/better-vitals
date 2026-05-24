import type { StyleRenderProps } from "react-aria-components";
import { composeRenderProps } from "react-aria-components";
import type { ClassValue } from "tailwind-variants";
import { cn } from "tailwind-variants";

export function cnRenderProps<T>(
  className: StyleRenderProps<T>["className"],
  ...base: ClassValue[]
) {
  return composeRenderProps(
    className,
    (userClassName) => cn(...base, userClassName) ?? ""
  );
}
