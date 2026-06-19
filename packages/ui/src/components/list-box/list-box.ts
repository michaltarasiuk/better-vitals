import { tv, type VariantProps } from "tailwind-variants";

export const listboxVariants = tv({
  slots: {
    base: "list-box",
    item: "list-box-item",
    indicator: "list-box-item__indicator",
  },
  variants: {
    variant: {
      default: null,
      danger: {
        item: "list-box-item--danger",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ListBoxVariants = VariantProps<typeof listboxVariants>;
