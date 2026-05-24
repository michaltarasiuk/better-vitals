import type { ComponentProps } from "react";

import { SurfaceRoot } from "./surface";

export const Surface = Object.assign(SurfaceRoot, {
  Root: SurfaceRoot,
});

export interface Surface {
  Props: ComponentProps<typeof SurfaceRoot>;
  RootProps: ComponentProps<typeof SurfaceRoot>;
}

export { SurfaceRoot } from "./surface";

export type {
  SurfaceRootProps as SurfaceProps,
  SurfaceRootProps,
} from "./surface";

export { SurfaceContext } from "./surface";

export { surfaceVariants } from "./surface.variants";

export type { SurfaceVariants } from "./surface.variants";
