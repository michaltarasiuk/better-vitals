import type { ComponentProps } from "react";

import { LinkIcon, LinkRoot } from "./link";

export const Link = Object.assign(LinkRoot, {
  Icon: LinkIcon,
  Root: LinkRoot,
});

export interface Link {
  Props: ComponentProps<typeof LinkRoot>;
  RootProps: ComponentProps<typeof LinkRoot>;
  IconProps: ComponentProps<typeof LinkIcon>;
}

export { LinkIcon, LinkRoot };

export type {
  LinkIconProps,
  LinkRootProps as LinkProps,
  LinkRootProps,
} from "./link";

export { linkVariants } from "./link.variants";

export type { LinkVariants } from "./link.variants";
