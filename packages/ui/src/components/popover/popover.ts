import { tv, type VariantProps } from "tailwind-variants";

export const popoverVariants = tv({
  slots: {
    trigger: "popover__trigger",
    base: "popover",
    dialog: "popover__dialog",
    heading: "popover__heading",
  },
});

export type PopoverVariants = VariantProps<typeof popoverVariants>;
