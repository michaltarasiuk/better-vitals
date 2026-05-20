import type { ComponentProps } from "react";

import { SurfaceRoot } from "./surface";

/*
 * Compound Component
 */
export const Surface = Object.assign(SurfaceRoot, {
  Root: SurfaceRoot,
});

export interface Surface {
  Props: ComponentProps<typeof SurfaceRoot>;
  RootProps: ComponentProps<typeof SurfaceRoot>;
}

/*
 * Named Component
 */
export { SurfaceRoot } from "./surface";

export type {
  SurfaceRootProps as SurfaceProps,
  SurfaceRootProps,
} from "./surface";

/*
 * Context
 */
export { SurfaceContext } from "./surface";

/*
 * Variants
 */
export { surfaceVariants } from "@lite-app-vitals/styles/components/surface";

export type { SurfaceVariants } from "@lite-app-vitals/styles/components/surface";
