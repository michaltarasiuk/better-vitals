import { tv, type VariantProps } from "tailwind-variants";

export const navbarVariants = tv({
  slots: {
    base: "navbar",
    header: "navbar__header",
    spacer: "navbar__spacer",
  },
});

export type NavbarVariants = VariantProps<typeof navbarVariants>;
