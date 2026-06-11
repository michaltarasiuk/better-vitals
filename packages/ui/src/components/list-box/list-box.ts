import { tv, type VariantProps } from "tailwind-variants";

export const listboxVariants = tv({
  defaultVariants: {
    variant: "default",
  },
  slots: {
    base: "list-box",
    indicator: "list-box-item__indicator",
    item: "list-box-item",
  },
  variants: {
    variant: {
      danger: {
        item: "list-box-item--danger",
      },
      default: null,
    },
  },
});

export type ListBoxVariants = VariantProps<typeof listboxVariants>;
