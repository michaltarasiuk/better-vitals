import { tv, type VariantProps } from "tailwind-variants";

export const accordionVariants = tv({
  slots: {
    base: "accordion",
    item: "accordion__item",
    heading: "accordion__heading",
    trigger: "accordion__trigger",
    indicator: "accordion__indicator",
    panel: "accordion__panel",
    body: "accordion__body",
    bodyInner: "accordion__body-inner",
  },
  variants: {
    variant: {
      default: null,
      surface: {
        base: "accordion--surface",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type AccordionVariants = VariantProps<typeof accordionVariants>;
