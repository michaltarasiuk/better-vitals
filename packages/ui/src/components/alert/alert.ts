import { tv, type VariantProps } from "tailwind-variants";

export const alertVariants = tv({
  slots: {
    base: "alert",
    indicator: "alert__indicator",
    content: "alert__content",
    title: "alert__title",
    description: "alert__description",
  },
  variants: {
    status: {
      default: {
        base: "alert--default",
      },
      accent: {
        base: "alert--accent",
      },
      danger: {
        base: "alert--danger",
      },
      success: {
        base: "alert--success",
      },
      warning: {
        base: "alert--warning",
      },
    },
  },
  defaultVariants: {
    status: "default",
  },
});

export type AlertVariants = VariantProps<typeof alertVariants>;
