import type { ComponentProps } from "react";

import { SpinnerRoot } from "./spinner";

/*
 * Compound Component
 */
export const Spinner = Object.assign(SpinnerRoot, {
  Root: SpinnerRoot,
});

export interface Spinner {
  Props: ComponentProps<typeof SpinnerRoot>;
  RootProps: ComponentProps<typeof SpinnerRoot>;
}

/*
 * Named Component
 */
export { SpinnerRoot };

export type {
  SpinnerRootProps as SpinnerProps,
  SpinnerRootProps,
} from "./spinner";

/*
 * Variants
 */
export { spinnerVariants } from "@lite-app/styles/components/spinner";

export type { SpinnerVariants } from "@lite-app/styles/components/spinner";
