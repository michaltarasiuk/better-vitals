import { tv, type VariantProps } from "tailwind-variants";

export const menuVariants = tv({
  slots: {
    base: "menu",
    section: "menu-section",
    item: "menu-item",
    indicator: "menu-item__indicator",
    submenuIndicator: "menu-item__indicator menu-item__indicator--submenu",
  },
  variants: {
    variant: {
      default: {
        item: null,
      },
      danger: {
        item: "menu-item--danger",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type MenuVariants = VariantProps<typeof menuVariants>;
