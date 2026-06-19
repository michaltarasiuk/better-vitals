import { tv, type VariantProps } from "tailwind-variants";

const cardVariants = tv({
  slots: {
    base: "card",
    header: "card__header",
    title: "card__title",
    description: "card__description",
    content: "card__content",
    footer: "card__footer",
  },
  variants: {
    variant: {
      default: {
        base: "card--default",
      },
      secondary: {
        base: "card--secondary",
      },
      tertiary: {
        base: "card--tertiary",
      },
      transparent: {
        base: "card--transparent",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export { cardVariants };
export type CardVariants = VariantProps<typeof cardVariants>;
