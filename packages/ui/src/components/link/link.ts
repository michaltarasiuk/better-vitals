import { tv, type VariantProps } from "tailwind-variants";

export const linkVariants = tv({
  slots: {
    base: "link",
  },
});

export type LinkVariants = VariantProps<typeof linkVariants>;
