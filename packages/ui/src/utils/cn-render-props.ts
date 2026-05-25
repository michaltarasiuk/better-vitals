import {
  composeRenderProps,
  type StyleRenderProps,
} from "react-aria-components";
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
