import { composeRenderProps } from "react-aria-components/composeRenderProps";
import type { StyleRenderProps } from "react-aria-components/useRenderProps";
import { cn, type ClassValue } from "tailwind-variants";

export function cnRenderProps<T>(
  className: StyleRenderProps<T>["className"],
  ...base: ClassValue[]
) {
  return composeRenderProps(
    className,
    (userClassName) => cn(...base, userClassName) ?? ""
  );
}
