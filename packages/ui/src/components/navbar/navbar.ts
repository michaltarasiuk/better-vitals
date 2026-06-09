import { tv, type VariantProps } from "tailwind-variants";

export const navbarVariants = tv({
  slots: {
    base: "navbar",
    spacer: "navbar__spacer",
  },
});

export type NavbarVariants = VariantProps<typeof navbarVariants>;
