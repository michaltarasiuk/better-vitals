import { tv, type VariantProps } from "tailwind-variants";

export const linkVariants = tv({
  slots: {
    base: "link",
    icon: "link__icon",
  },
});

export type LinkVariants = VariantProps<typeof linkVariants>;
