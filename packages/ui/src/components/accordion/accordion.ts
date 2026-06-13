import { tv, type VariantProps } from "tailwind-variants";

export const accordionVariants = tv({
  defaultVariants: {
    variant: "default",
  },
  slots: {
    base: "accordion",
    body: "accordion__body",
    bodyInner: "accordion__body-inner",
    heading: "accordion__heading",
    indicator: "accordion__indicator",
    item: "accordion__item",
    panel: "accordion__panel",
    trigger: "accordion__trigger",
  },
  variants: {
    variant: {
      default: null,
      surface: {
        base: "accordion--surface",
      },
    },
  },
});

export type AccordionVariants = VariantProps<typeof accordionVariants>;
