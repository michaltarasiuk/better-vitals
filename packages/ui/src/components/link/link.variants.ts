import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";

export const linkVariants = tv({
  slots: {
    base: "link",
    icon: "link__icon",
  },
});

export type LinkVariants = VariantProps<typeof linkVariants>;
